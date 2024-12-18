'use client'
import { useRouter } from 'next/navigation' 
import { LoginComponent } from '@/components/login/LoginComponent'
import { StudentPage } from '@/components/alumnos/studentpage'
import useSessionStore from '@/stores/useSessionStore'
import { checkSessionService } from '@/services/check.access.service'
import { useEffect } from 'react'
import {ModeToggle} from "@/components/ModeToggle";

export default function Page() {
  const { accessToken, username, setUsername, role, setRole } = useSessionStore()
  const router = useRouter() // Instanciamos useRouter para usar la redirección

  useEffect(() => {
    if(accessToken) {
      checkSessionService(accessToken)
      .then((data) => {
          if(!data.isValid) return
          setRole(data.role)
          if(data.role === 'profesor') {
              router.push('/profesor')
          } else if (data.role === 'estudiante') {
              router.push('/estudiante')
          }
      })
      .catch((err) => {
          console.error(err)
      })
    }
    
  }, [accessToken])

  const handleLogin = (username: string, isProfessor: boolean) => {

    setUsername(username)
    setRole((isProfessor ? 'profesor' : 'estudiante'))

    if(isProfessor) {
      router.push('/profesor')
    } else {
      router.push('/estudiante')
    }
  }

  return <LoginComponent onLogin={handleLogin} />
}
