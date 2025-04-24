import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const loadGithubRepo = async (githubUrl: string, githubToken? : string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        branch: "main",
        recursive: true,
        unknown: "warn",
        accessToken: githubToken || '',
        ignoreFiles: ['package-lock.json','yarn.lock','pnpm-lock.yaml','bun.lockb'],
        maxConcurrency: 5,
    });
    const docs = await loader.load();
    return docs;
}