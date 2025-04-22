import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { TRPCReactProvider } from "@/trpc/react"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RepoMind",
  description: "-----",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <TRPCReactProvider>
            {children}
            <Toaster richColors/>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
