"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Plus, Video } from "lucide-react"

export default function MeetingsPage() {
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
        <h1 className="text-xl font-bold mb-0.5 gradient-text">Meetings</h1>
        <h2 className="text-sm mb-3 text-muted-foreground font-normal">Schedule and join your meetings</h2>
      </motion.div>

      <div className="flex justify-end mb-3">
        <Button variant="sidebar" size="sm">
          <Plus className="mr-2 h-3 w-3" />
          New Meeting
        </Button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <motion.div variants={item}>
          <Card className="border-primary/10 card-hover">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-sm">Upcoming Meetings</CardTitle>
              <CardDescription className="text-[10px]">Your scheduled meetings for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              <div className="p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800/70 text-accent">
                      <Video size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs">Project Review</h3>
                      <p className="text-[10px] text-muted-foreground">April 15, 2025 • 10:00 AM</p>
                    </div>
                  </div>
                  <Button size="sm" variant="sidebar" className="h-7 text-xs px-2.5">
                    Join
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800/70 text-accent">
                      <Video size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs">Team Standup</h3>
                      <p className="text-[10px] text-muted-foreground">April 16, 2025 • 9:00 AM</p>
                    </div>
                  </div>
                  <Button size="sm" variant="sidebar" className="h-7 text-xs px-2.5">
                    Join
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800/70 text-accent">
                      <Video size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs">Client Presentation</h3>
                      <p className="text-[10px] text-muted-foreground">April 18, 2025 • 2:00 PM</p>
                    </div>
                  </div>
                  <Button size="sm" variant="sidebar" className="h-7 text-xs px-2.5">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-primary/10 card-hover">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-sm">Calendar</CardTitle>
              <CardDescription className="text-[10px]">Your monthly schedule</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-56 bg-gradient-to-br from-slate-800/10 to-slate-700/10 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center text-slate-500">
                  <Calendar className="h-8 w-8 mb-1" />
                  <span className="text-xs">Calendar View</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
