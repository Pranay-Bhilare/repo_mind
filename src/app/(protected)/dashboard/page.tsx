"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { motion } from "framer-motion"

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

  return (
    <div style={{ fontSize: '0.875rem' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold mb-0.5 gradient-text">Elliott</h1>
        <h2 className="text-sm mb-3 text-muted-foreground font-normal">Chong</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="card-hover border-slate-200/20 shadow-sm">
            <CardHeader className="pb-1 p-2">
              <CardTitle className="text-sm flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-slate-800/70 text-accent">
                  <BarChart size={12} />
                </div>
                Activity
              </CardTitle>
              <CardDescription className="text-[10px]">Your recent activity</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="h-24 flex items-center justify-center bg-gradient-to-br from-slate-800/5 to-slate-700/5 rounded-md">
                <div className="animate-pulse text-slate-500 text-[10px]">Activity Chart</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="card-hover border-slate-200/20 shadow-sm">
            <CardHeader className="pb-1 p-2">
              <CardTitle className="text-sm flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-slate-800/70 text-accent">
                  <LineChart size={12} />
                </div>
                Projects
              </CardTitle>
              <CardDescription className="text-[10px]">Your project overview</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="h-24 flex items-center justify-center bg-gradient-to-br from-slate-800/5 to-slate-700/5 rounded-md">
                <div className="animate-pulse text-slate-500 text-[10px]">Projects Overview</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="sm:col-span-2 lg:col-span-1">
          <Card className="card-hover border-slate-200/20 shadow-sm">
            <CardHeader className="pb-1 p-2">
              <CardTitle className="text-sm flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-slate-800/70 text-accent">
                  <PieChart size={12} />
                </div>
                Tasks
              </CardTitle>
              <CardDescription className="text-[10px]">Your task completion</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="h-24 flex items-center justify-center bg-gradient-to-br from-slate-800/5 to-slate-700/5 rounded-md">
                <div className="animate-pulse text-slate-500 text-[10px]">Tasks Overview</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="card-hover border-slate-200/20 shadow-sm">
          <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm">Recent Updates</CardTitle>
            <CardDescription className="text-[10px]">The latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
