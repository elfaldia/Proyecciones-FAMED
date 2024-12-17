import {UsersRound, LogOut, BookOpenCheck} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import useSessionStore from "@/stores/useSessionStore"
import ItemSidebar from "./item-sidebar"


export function AlumSidebar() {

  const { setAccessToken } = useSessionStore()
  const onHandleCerrarSesion = () => {
      setAccessToken("")
  }

  const items = [
    <ItemSidebar title="Estudiante" url="../estudiante" icon={UsersRound} />,
    <ItemSidebar title="Proyección" url="/estudiante/proyeccion" icon={BookOpenCheck} />,
    <ItemSidebar title="Cerrar Sesión" url="/" icon={LogOut} onClick={onHandleCerrarSesion} />,
    
  ]
  

  return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Nombre del Alumno</SidebarGroupLabel>
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