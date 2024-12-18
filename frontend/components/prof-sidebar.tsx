import { UsersRound, LogOut } from 'lucide-react'
import ItemSidebar from "./item-sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useSessionStore from "@/stores/useSessionStore"

export function ProfSidebar() {
  const { setAccessToken } = useSessionStore()
  const onHandleCerrarSesion = () => {
    setAccessToken("")
  }

  const items = [
    <ItemSidebar key="estudiantes" title="Estudiantes" url="../profesor/estudiantes" icon={UsersRound} />,
    <ItemSidebar key="cerrar-sesion" title="Cerrar Sesión" url="/" icon={LogOut} onClick={onHandleCerrarSesion} />,
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nombre del Profesor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    {item}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

