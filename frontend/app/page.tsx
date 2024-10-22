'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Importamos el hook useRouter
import { LoginComponent } from '@/components/login/LoginComponent'
import { StudentPage } from '@/components/alumnos/studentpage'

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProfessor, setIsProfessor] = useState(false)
  const [username, setUsername] = useState('')
  const router = useRouter() // Instanciamos useRouter para usar la redirección

  const handleLogin = (username: string, isProfessor: boolean) => {
    setIsLoggedIn(true)
    setIsProfessor(isProfessor)
    setUsername(username)

    // Redirigir a /profesores si es profesor
    if (isProfessor) {
      router.push('/profesores') // Redirigir a la ruta de profesores
    }
  }

  if (isLoggedIn && !isProfessor) {
    // Si es estudiante y está logueado, mostramos la página de estudiantes
    return <StudentPage studentName={username} />
  }

  return <LoginComponent onLogin={handleLogin} />
}
