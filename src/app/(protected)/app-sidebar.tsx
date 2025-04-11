'use client'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Bot, CreditCard, LayoutDashboard, Link, Presentation } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
    {
        title : "Dashboard",
        url : "/dashboard",
        icon : LayoutDashboard
    },
    {
        title : "Q&A",
        url : "/qa",
        icon : Bot
    },
    {
        title : "Meetings",
        url : "/meetings",
        icon : Presentation
    },
    {
        title : "Billing",
        url : "/billing",
        icon : CreditCard
    }
]
export function AppSidebar() { 
    const pathname = usePathname()
    return(
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                logo
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarGroupLabel>
                            Application
                            <SidebarGroupContent>
                                {items.map(item => { 
                                    return(
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className={cn({
                                                    '!bg-primary !text-white': pathname === item.url},'list-none')}>
                                                    <item.icon/>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarGroupContent>
                        </SidebarGroupLabel>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}