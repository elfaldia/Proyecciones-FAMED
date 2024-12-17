'use client'
import Link from 'next/link'
import './styles.css'
import useSessionStore from '@/stores/useSessionStore'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ProfSidebar } from  '@/components/prof-sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { setAccessToken } = useSessionStore()
  const onHandleCerrarSesion = () => {
      setAccessToken("")
  }

  return (
    <SidebarProvider>
      <ProfSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}