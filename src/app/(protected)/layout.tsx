"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppSidebar } from "./app-sidebar"
import { UserNav } from "@/components/shared/user-nav"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { NotificationButton } from "@/components/shared/notification-button"
import { SearchButton } from "@/components/shared/search-button"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical md breakpoint
    }
    
    // Check on initial load
    checkIfMobile()
    
    // Check on resize
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Close sidebar on mobile when component mounts
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen relative">
      {/* Background with gradient and shiny effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-[#ebedf5] to-slate-100 shiny-effect -z-10"></div>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={isMobile ? { x: -200 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -200 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-y-0 left-0 z-20 md:relative md:z-0 h-full`}
          >
            <AppSidebar onClose={isMobile ? () => setSidebarOpen(false) : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center border-b bg-white/50 backdrop-blur-sm px-4 gap-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <SearchButton />
            <NotificationButton />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 z-0">
          {children}
        </main>
      </div>
    </div>
  )
}
