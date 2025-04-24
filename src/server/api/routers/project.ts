import { z } from "zod";
import { createTRPCRouter,protectedProcedure } from "../trpc";
import { pullCommits } from "@/lib/github";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl : z.string(),
            githubToken : z.string().optional(),
        })  
    ).mutation(async ({ ctx, input})=> {
        const project = await ctx.db.project.create({
            data: {
                name: input.name,
                githubUrl:input.githubUrl,
                userToProjects : {
                    create: { 
                        userId: (await ctx.user).userId!
                    }
                }
            }
        })
        await pullCommits(project.id)
        return project;
    }),
    getProjects : protectedProcedure.query(async ({ctx}) => {
        const projects = await ctx.db.project.findMany({
            where: {
                userToProjects:{
                    some : {
                        userId : (await ctx.user).userId!
                    }
                },
                deletedAt : null
            }
        })
        return projects
    }),
   getCommits : protectedProcedure.input(z.object({
        projectId : z.string()
    })).query(async ({ctx, input}) => {
        await pullCommits(input.projectId);
        const commits = await ctx.db.commits.findMany({
            where : {
                projectId : input.projectId
            },
            orderBy: {
                commitDate: 'desc'
            }
        })
        return commits
   })
})