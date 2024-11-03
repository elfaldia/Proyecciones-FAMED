import Link from 'next/link'
import './styles.css'

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
              <Link href="../profesor/estudiantes" passHref>      
                <button className="sidebar-button">Estudiantes</button>
              </Link>
            
              <Link href="/" passHref legacyBehavior>
                <a className="sidebar-bottom-button">Cerrar Sesión</a>
              </Link>
            
            </div>
            
            <div className="main-content">
            {children}
            </div>
        </div>
      </body>
    </html>
  )
}