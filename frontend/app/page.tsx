'use client'
import { useRouter } from 'next/navigation' 
import { LoginComponent } from '@/components/login/LoginComponent'
import { StudentPage } from '@/components/alumnos/studentpage'
import useSessionStore from '@/stores/useSessionStore'
import { checkSessionService } from '@/services/check.access.service'
import { useEffect } from 'react'
import validateSesion from '@/services/validate.session.service'


export default function Page() {
  const { accessToken, setAccessToken } = useSessionStore()
  const router = useRouter() // Instanciamos useRouter para usar la redirección

  useEffect(() => {
    if(accessToken) {
      checkSessionService(accessToken)
      .then((data) => {
          if(!data.isValid) return
          
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

  //setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAyNDc2MjEsImlhdCI6MTczMDI0NDAyMSwiaXNzIjoiZmFtZWQtYXBwIiwicm9sZSI6InByb2Zlc29yIiwic3ViIjoiMTIzNCJ9.gJyPdgi1TWWuD0kMVMW3NGCNb3XaN6dLYZiyjbK4-SM')
  const handleLogin = (username: string, isProfessor: boolean) => {


    // Redirigir a /profesores si es profesor
    if (isProfessor) {
      router.push('/profesores') // Redirigir a la ruta de profesores
    }
  }

  if (1 == 1) {
    // Si es estudiante y está logueado, mostramos la página de estudiantes
    return <StudentPage />
  }

  return <LoginComponent onLogin={handleLogin} />
}
