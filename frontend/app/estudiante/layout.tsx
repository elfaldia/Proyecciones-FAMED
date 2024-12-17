'use client'
import { AlumSidebar } from "@/components/alum-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider >
      <AlumSidebar />
      <SidebarInset >
        <SidebarTrigger/>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}