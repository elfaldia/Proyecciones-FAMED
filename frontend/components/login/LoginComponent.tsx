'use client'

import { useState } from 'react'

interface LoginProps {
  onLogin: (username: string, isProfessor: boolean) => void
}

export function LoginComponent({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'Sebastian Vega' && password === '1234') {
      onLogin(username, false) // Estudiante
    } else if (username === 'profesor' && password === '4321') {
      onLogin(username, true) // Profesor
    } else {
      alert('Credenciales incorrectas')
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
