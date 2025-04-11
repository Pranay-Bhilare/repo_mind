import {auth, clerkClient} from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { db } from "@/server/db"
import React from "react"

const SyncUser = async()=>{
    try {
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
        const result = await db.user.upsert({
            where:{
                emailId: user.emailAddresses[0].emailAddress
            },
            update: {
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl
            },
            create: {
                id : userId,
                emailId: user.emailAddresses[0].emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl
            }
        })
        console.log("Results are  : ", result)
        return redirect('/dashboard')
    }catch (error) { 
        console.log(error)
        throw error
    }
}
export default SyncUser