"use client"

import React from "react"
import { LayoutDashboard, Bot, Presentation, CreditCard, Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import useProject from "@/hooks/use-project"

// Application menu items
const applicationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  // {
  //   title: "Meetings",
  //   url: "/meetings",
  //   icon: Presentation,
  // },
  // {
  //   title: "Billing",
  //   url: "/billing",
  //   icon: CreditCard,
  // },
]

type AppSidebarProps = {
  onClose?: () => void
}

export function AppSidebar({ onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const {projects, projectId, setProjectId} = useProject()

  const handleCreateProject = () => {
    router.push("/create")
    if (onClose) onClose()
  }

  const handleNavigation = () => {
    if (onClose) onClose()
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl flex flex-col w-[200px] border-r border-slate-700/50 text-white relative overflow-hidden">
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Light reflection effect */}
      <div className="absolute -inset-1/2 top-0 left-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rotate-12 transform-gpu blur-xl opacity-30 pointer-events-none"></div>
      
      {/* Sidebar Header */}
      <div className="p-3 border-b border-slate-700/50 relative z-10">
        <div className="flex items-center gap-2">
          <div className="text-accent animate-pulse-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" fill="currentColor" />
              <path d="M2 12L12 17L22 12" fill="currentColor" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent text-sm font-semibold">RepoMind</span>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto pb-4 relative z-10">
        {/* Application Section */}
        <div className="pt-3 px-1">
          <div className="text-[10px] font-medium text-slate-400 px-3 mb-1">
            Application
          </div>
          <ul className="space-y-0.5">
            {applicationItems.map((item) => (
              <li key={item.title}>
                <Link 
                  href={item.url} 
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center text-xs gap-2 px-3 py-1.5 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors relative",
                    pathname === item.url && "bg-white/15 text-white font-medium"
                  )}
                >
                  <item.icon size={14} className="shrink-0" />
                  <span>{item.title}</span>
                  {pathname === item.url && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-accent rounded-r-md" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects Section */}
        <div className="pt-4 px-1">
          <div className="text-[10px] font-medium text-slate-400 px-3 mb-1">
            Your Projects
          </div>
          <ul className="space-y-0.5">
            {projects?.map((item) => (
              <li key={item.name}>
                <Link 
                  href={"/dashboard"} 
                  onClick={()=>{
                    setProjectId(item.id)
                    handleNavigation()
                  }}
                  className={cn(
                    "flex items-center text-xs gap-2 px-3 py-1.5 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors relative",
                    pathname === "/dashboard" && "bg-white/15 text-white font-medium"
                  )}
                >
                  <div className="flex items-center justify-center w-3.5 h-3.5 rounded bg-gradient-to-br from-accent to-accent/70 text-white text-[8px] font-medium shrink-0">
                    P
                  </div>
                  <span>{item.name}</span>
                  {pathname === item.name && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-accent rounded-r-md" />
                  )}
                </Link>
              </li>
            ))}
            
            <li>
              <button 
                onClick={handleCreateProject}
                className="w-full flex items-center text-xs gap-2 px-3 py-1.5 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-left"
              >
                <div className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent/30 text-accent-foreground shrink-0">
                  <Plus size={10} />
                </div>
                <span>Create Project</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
