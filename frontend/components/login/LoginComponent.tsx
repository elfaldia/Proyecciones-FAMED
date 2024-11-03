'use client'

import { loginService } from '@/services/login.service'
import useSessionStore from '@/stores/useSessionStore'
import { useState } from 'react'

interface LoginProps {
  onLogin: (username: string, isProfessor: boolean) => void
}

export function LoginComponent({ onLogin }: LoginProps) {
  const [username_, setUsername_] = useState('') 
  const [password, setPassword] = useState('')
  const {accessToken, username, role, setAccessToken, setUsername, setRole} = useSessionStore()


  //sdsd
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const {success, accessToken, nombre, role} = await loginService(username_, password)
    if(!success) {
      alert("Credenciales incorrectas")
    } else if(accessToken && nombre && role){
      setAccessToken(accessToken)
      setUsername(nombre)
      setRole(role)
    } else {
      alert("Hubo un problema inesperado")
    }
  }
  
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://postgrado.ucn.cl/wp-content/uploads/2023/06/Escudo-UCN-EIMG_7894-scaled.jpg)' }}
    >
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username_}
            onChange={(e) => setUsername_(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  )
}
