import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import type { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./genai";
import { db } from "@/server/db";

export const loadGithubRepo = async (githubUrl: string, githubToken? : string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        branch: "master",
        recursive: true,
        unknown: "warn",
        accessToken: githubToken ?? '',
        ignoreFiles: ['package-lock.json','yarn.lock','pnpm-lock.yaml','bun.lockb'],
        maxConcurrency: 5,
    });
    const docs = await loader.load();
    return docs;
}

export const indexGithubRepo = async (projectId :string,githubUrl: string, githubToken? : string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);
    const allEmbeddings = await generateEmbeddings(docs);
    await Promise.allSettled(allEmbeddings.map(async (embedding,index) => {
        console.log(`processing ${index} of ${allEmbeddings.length}`)
        if(!embedding) return;
        const sourceCodeEmbedding = await db.sourceCodeEmbeddings.create({
            data : {
                summary : embedding.summary,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sourceCode : embedding.sourceCode,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                fileName : embedding.fileName,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                projectId : projectId
            }
        })

        await db.$executeRaw`
            UPDATE "SourceCodeEmbeddings"
            SET "summaryEmbedding" = ${embedding.embeddings}::vector
            WHERE "id" = ${sourceCodeEmbedding.id}
         `
    }));
}
const generateEmbeddings = async(docs : Document[]) => {
    return await Promise.all(docs.map(async doc => {
        const summary = await summariseCode(doc);
        const embeddings =  await generateEmbedding(summary);
        return {
            summary,
            embeddings,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            sourceCode : JSON.parse(JSON.stringify(doc.pageContent)),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fileName : doc.metadata.source
        }
    }))
}