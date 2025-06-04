"use client";
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/app/Provider"; // or your auth hook
import { Home, Users, ClipboardList, CreditCard, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { href: "/scheduled-interview", label: "Scheduled Interview", icon: <ClipboardList size={20} /> },
  { href: "/all-Interview", label: "All Interview", icon: <Users size={20} /> },
  { href: "/billing", label: "Billing", icon: <CreditCard size={20} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

export function AppSidebar() {
  const path = usePathname();
  const { user } = useUser(); // or however you get the user

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-2'>
        <Link href={user ? "/dashboard" : "/"}>
          <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[120px] cursor-pointer" />
        </Link>
        <Button asChild className='w-full mt-2'>
          <Link href="/dashboard/create-interview">
            <Plus /> Create New Interview
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.href} className='p-1'>
                          <SidebarMenuButton asChild className={`p-4 ${path == item.href&&'bg-blue-50'}`}> 
                             <Link href={item.href}>
                              {item.icon}
                              <span className={`text-[16px] ${path == item.href && 'text-primary'}`}>{item.label}</span>
                              </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
