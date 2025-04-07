import {auth, clerkClient} from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { db } from "@/server/db"
import React from "react"

const SyncUser = async()=>{
    const {userId} = await auth()
    if(!userId){
        throw new Error("User Not Found!");
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if(!user.emailAddresses[0]?.emailAddress){
        return notFound()
    }
    //@ts-ignore
    await db.user.upsert({
        where:{
            emailId:user.emailAddresses[0].emailAddress
        },
        update: {
            // Add fields to update here
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl
        },
        create: {
            emailId: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl
        }
    })
}