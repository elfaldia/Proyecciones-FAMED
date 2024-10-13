import Link from 'next/link'
import './styles.css'
import type { Metadata } from 'next'

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
            <div className="sidebar">
            <h1 className="sidebar-title">Nombre del Profesor</h1>
            <Link href="../profesores/estudiantes" passHref>
                <button className="sidebar-button">Estudiantes</button>
            </Link>
            
            <button className='sidebar-bottom-button'>Cerrar Sesión</button>
            </div>
            <div className="main-content">
            {children}
            </div>
        </div>
      </body>
    </html>
  )
}