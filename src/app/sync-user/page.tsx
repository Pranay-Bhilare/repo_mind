import { auth, clerkClient } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { db } from "@/server/db"

export default async function SyncUserPage() {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error("User Not Found!")

        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        if (!user.emailAddresses[0]?.emailAddress) return notFound()

        await db.user.upsert({
            where: { emailId: user.emailAddresses[0].emailAddress },
            update: {
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            },
            create: {
                id: userId,
                emailId: user.emailAddresses[0].emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            },
        })

        redirect("/dashboard")
    } catch (error) {
        redirect("/dashboard")
    }
}