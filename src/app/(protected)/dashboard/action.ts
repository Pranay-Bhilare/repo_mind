'use server'
import { createStreamableValue } from 'ai/rsc'
import {streamText} from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google' 
import { generateEmbedding } from '@/lib/genai'
import { db } from '@/server/db'

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API
})

export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue();
    const queryVector = await generateEmbedding(question);
    const vectorQuery = `[${queryVector.join(',')}]`

    const result: {fileName: string, sourceCode: string, summary: string}[] = await db.$queryRaw`
        SELECT "fileName", "sourceCode", "summary",
        1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
        FROM "SourceCodeEmbeddings"
        WHERE "projectId" = ${projectId}
        ORDER BY similarity DESC
        LIMIT 10`;

    let context = ''
    console.log('askQuestion: result from DB:', result);
    for (const item of result) {
        context += `Source: ${item.fileName}\nSummary: ${item.summary}\nSource Code: ${item.sourceCode}\n\n`
        console.log('askQuestion: context after item', item.fileName, context);
    }
    console.log('askQuestion: final context:', context);
    
    await (async () => {
        const { textStream } = streamText({
            model: google('gemini-1.5-flash'),
            prompt: `You are a ai code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in the codebase.
            If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions, including code.
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            
            START QUESTION
            ${question}
            END OF QUESTION
            
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that."
            AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, make sure there is no ambiguity.`
        });
        for await (const chunk of textStream) {
            stream.update(chunk);
        }
        stream.done();
    })();

    return {
        output : stream.value,
        fileReferred : result
    }
}