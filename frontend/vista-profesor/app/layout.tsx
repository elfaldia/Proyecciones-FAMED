import Link from 'next/link'
import type { Metadata } from 'next'
import './globals.css'; 
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'Simulador de Notas',
  description: 'Aplicación para simular notas de estudiantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
      <div className="app-container">
        <Sidebar />  
        <main className="main-content">
          {children}  
        </main>
      </div>
    </body>
  </html>
  )
}