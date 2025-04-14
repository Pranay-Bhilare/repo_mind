"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Bot, Send, User } from "lucide-react"

export default function QAPage() {
  return (
    <div style={{ fontSize: '0.875rem' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold mb-0.5 gradient-text">Q&A Assistant</h1>
        <h2 className="text-sm mb-3 text-muted-foreground font-normal">Get answers to your questions instantly</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <Card className="border-slate-200/20">
          <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm">Chat History</CardTitle>
            <CardDescription className="text-[10px]">Your recent conversations</CardDescription>
          </CardHeader>
          <CardContent className="p-2 space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800/20 flex items-center justify-center">
                <User size={16} className="text-slate-700" />
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-100/60">
                <p className="text-xs">How do I create a new project?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Bot size={16} className="text-accent" />
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-800/5">
                <p className="text-xs">
                  You can create a new project by clicking on the "Create Project" button in the sidebar or by
                  navigating to the Create page. From there, you can choose a template or start from scratch.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800/20 flex items-center justify-center">
                <User size={16} className="text-slate-700" />
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-100/60">
                <p className="text-xs">What templates are available?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Bot size={16} className="text-accent" />
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-800/5">
                <p className="text-xs">
                  We offer several templates including blank projects, frontend and backend code templates, and design
                  kits. Each template is designed to help you get started quickly with your specific project needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/20">
          <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm">Ask a Question</CardTitle>
            <CardDescription className="text-[10px]">Our AI assistant will help you find answers</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <Textarea
              placeholder="Type your question here..."
              className="min-h-32 transition-all duration-300 focus:border-slate-800 focus:ring-slate-800 text-xs"
            />
          </CardContent>
          <CardFooter className="flex justify-end p-2">
            <Button variant="sidebar" size="sm">
              Send Question
              <Send className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
