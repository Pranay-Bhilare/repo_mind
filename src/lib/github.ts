import { db } from "@/server/db";
import axios from "axios";
import { aiSummariseCommit } from "./genai";
import { Octokit } from "octokit";

export const octokit = new Octokit({
    auth : process.env.GITHUB_TOKEN
})

type Response = { 
    commitMessage : string;
    commitHash : string;
    commitAuthorName: string;
    commitAuthorAvatar : string;
    commitDate : string;
}

const githubUrl = "https://github.com/Pranay-Bhilare/repo_mind"
export const getCommitHashes = async(githubUrl :  string) => {
    const [owner,repo] = githubUrl.split('/').slice(-2)
    if(!owner || !repo){
        throw new Error("Invalid Github URL")
    }
    const {data} = await octokit.rest.repos.listCommits({
        owner,
        repo
    })
    // Define the type for the commit object
    type CommitData = {
        sha: string;
        commit: {
            message: string;
            author?: {
                name?: string;
                date?: string;
            };
        };
        author?: {
            avatar_url?: string;
        };
    };
    const sortedCommits = (data as CommitData[]).sort((a, b) => {
        const dateA = a.commit.author?.date ? new Date(a.commit.author.date).getTime() : 0;
        const dateB = b.commit.author?.date ? new Date(b.commit.author.date).getTime() : 0;
        return dateB - dateA;
    });

    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    // eslint-disable @typescript-eslint/no-explicit-any
    return sortedCommits.slice(0,10).map((commit: CommitData) => ({
        commitMessage : commit.commit.message,
        commitHash : commit.sha,
        commitAuthorName : commit.commit.author?.name ?? "Unknown",
        commitAuthorAvatar : commit.author?.avatar_url ?? "",
        commitDate : commit.commit.author?.date ?? "",
    }))
}

export const pullCommits = async (projectId: string) => { 
    const {project, githubUrl} = await fetchGithubUrl(projectId)
    const hashes = await getCommitHashes(githubUrl)
    const unprocessedCommits = await filterUnprocessedCommits(projectId, hashes)
    const summaryResponse = await Promise.allSettled(unprocessedCommits.map(commit => {
        return summariseCommit(githubUrl, commit.commitHash)
    }))
    const summaries = summaryResponse.map((response) => {
        if(response.status === "fulfilled"){
            return response.value as string
        }
        return ""
    })
    const commit = await db.commits.createMany({
        data : summaries.map((summary,index) => { 
            console.log(`processing commits ${index}`)
            return {
                projectId: projectId,
                commitHash : unprocessedCommits[index]!.commitHash,
                commitAuthorAvatar : unprocessedCommits[index]!.commitAuthorAvatar,
                commitAuthorName : unprocessedCommits[index]!.commitAuthorName,
                commitDate : unprocessedCommits[index]!.commitDate,
                commitMessage : unprocessedCommits[index]!.commitMessage,
                summary: summary,
            }
        })
    })
    return commit   
}
async function fetchGithubUrl(projectId: string) { 
    const project = await db.project.findUnique({
        where : {
            id : projectId
        },
        select : {
            githubUrl : true
        }
    })

    if(!project?.githubUrl){
        throw new Error("Project has no github url linked")
    }
    return {project, githubUrl: project?.githubUrl}
}

async function filterUnprocessedCommits(projectId: string, commits: Response[]){
    const processCommits = await db.commits.findMany({
        where : { projectId : projectId }
    })
    const unprocessedCommits = commits.filter(
        (commit) => !processCommits.some(
            (processedCommit) => processedCommit.commitHash === commit.commitHash
        )
    );
    return unprocessedCommits;
}

async function summariseCommit(githubUrl: string, commitHash: string){
    try {
        const {data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
            headers :{
                Accept : "application/vnd.github.v3.diff"
            }
        })

        return await aiSummariseCommit(data) || ""
    } catch (error) {
        console.error(`Error summarizing commit ${commitHash}:`, error)
        return ""
    }
}