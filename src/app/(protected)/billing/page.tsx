"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CreditCard, Download } from "lucide-react"

export default function BillingPage() {
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
        <h1 className="text-xl font-bold mb-0.5 gradient-text">Billing</h1>
        <h2 className="text-sm mb-3 text-muted-foreground font-normal">Manage your subscription and payment methods</h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <motion.div variants={item}>
          <Card className="border-slate-200/20 card-hover">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-sm">Current Plan</CardTitle>
              <CardDescription className="text-[10px]">Your subscription details</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="p-3 border border-slate-200/20 rounded-lg bg-gradient-to-r from-slate-800/5 to-slate-700/5">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-sm font-semibold gradient-text">Pro Plan</h3>
                    <p className="text-[10px] text-muted-foreground">$29/month</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-accent"></div>
                    <span className="text-xs">Unlimited projects</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-accent"></div>
                    <span className="text-xs">Priority support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-accent"></div>
                    <span className="text-xs">Advanced analytics</span>
                  </div>
                </div>
                <Button
                  variant="sidebar"
                  size="sm"
                  className="w-full"
                >
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-slate-200/20 card-hover">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-sm">Payment Methods</CardTitle>
              <CardDescription className="text-[10px]">Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              <div className="p-3 border border-slate-200/20 rounded-lg hover:border-slate-300/30 transition-all duration-300 hover:shadow-md hover:bg-slate-800/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800/70 text-accent">
                      <CreditCard size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs">Visa ending in 4242</h3>
                      <p className="text-[10px] text-muted-foreground">Expires 04/2026</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-800/20 text-slate-100 text-[9px] rounded-full">Default</span>
                </div>
              </div>

              <Button variant="sidebar" size="sm" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-slate-200/20 card-hover">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-sm">Payment History</CardTitle>
              <CardDescription className="text-[10px]">Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              <div className="p-3 border border-slate-200/20 rounded-lg hover:border-slate-300/30 transition-all duration-300 hover:shadow-md hover:bg-slate-800/5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-xs">Pro Plan - Monthly</h3>
                    <p className="text-[10px] text-muted-foreground">April 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">$29.00</span>
                    <Button
                      variant="sidebar"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                    >
                      <Download size={12} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-slate-200/20 rounded-lg hover:border-slate-300/30 transition-all duration-300 hover:shadow-md hover:bg-slate-800/5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-xs">Pro Plan - Monthly</h3>
                    <p className="text-[10px] text-muted-foreground">March 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">$29.00</span>
                    <Button
                      variant="sidebar"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                    >
                      <Download size={12} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-slate-200/20 rounded-lg hover:border-slate-300/30 transition-all duration-300 hover:shadow-md hover:bg-slate-800/5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-xs">Pro Plan - Monthly</h3>
                    <p className="text-[10px] text-muted-foreground">February 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">$29.00</span>
                    <Button
                      variant="sidebar"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                    >
                      <Download size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
