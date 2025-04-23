"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Github, LineChart, PieChart, Sidebar } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useProject from "@/hooks/use-project"
import CommitLog from "./commit-log"

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const {project} = useProject();

  return (
    <div style={{ fontSize: '0.875rem' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold mb-0.5 gradient-text">{}</h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="col-span-1">
          <Button variant="sidebar" className="flex items-center gap-2">
            <Github size={16} />
            This project is linked to:&nbsp;
            {project?.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {project.githubUrl}
              </a>
            ) : (
              <span className="text-slate-400">No project selected</span>
            )}
          </Button>
        </motion.div>
        {/* Right side: Invitation Link and Archive */}
        <motion.div
          variants={item}
          className="col-span-1 flex justify-end items-center gap-2 sm:col-span-1 lg:col-span-2"
        >
          <Button variant="sidebar">Invite a team member! </Button>
          <Button variant="sidebar">Archive</Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* <Card className="card-hover border-slate-200/20 shadow-sm">
          <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm">Recent Updates</CardTitle>
            <CardDescription className="text-[10px]">The latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent className="p-2"> */}
          <div className="mt-8"></div>
            <CommitLog/>
            {/* <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-2 rounded-md border border-slate-200/20 hover:border-slate-300/30 transition-all duration-300 hover:shadow-sm hover:bg-slate-800/5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-xs">Project Update #{i}</h3>
                      <p className="text-[10px] text-muted-foreground">New features have been added to Project {i}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">2h ago</span>
                  </div>
                </div>
              ))}
            </div> */}
          {/* </CardContent>
        </Card> */}
      </motion.div>
    </div>
  )
}
