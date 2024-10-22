'use client'

import { useState } from 'react'
import { LoginComponent } from '@/components/login/LoginComponent'
import { StudentPage } from '@/components/alumnos/studentpage'

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProfessor, setIsProfessor] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (username: string, isProfessor: boolean) => {
    setIsLoggedIn(true)
    setIsProfessor(isProfessor)
    setUsername(username)
  }

  if (isLoggedIn) {
    return isProfessor ? (
      <div className="flex h-screen items-center justify-center bg-gray-200">
        <h1 className="text-3xl font-bold text-black">Bienvenido Profesor</h1>
      </div>
    ) : (
      <StudentPage studentName={username} />
    )
  }

  return <LoginComponent onLogin={handleLogin} />
}
