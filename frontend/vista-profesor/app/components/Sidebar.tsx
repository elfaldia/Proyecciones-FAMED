'use client'
import Link from 'next/link'
import type { Metadata } from 'next'
import styles from '../styles/sidebar.module.css'

export const metadata: Metadata = {
  title: 'Simulador de Notas',
  description: 'Aplicación para simular notas de estudiantes',
}

export default function Sidebar(){

  return (
    <div className={styles.sidebar}>
            <h1 className={styles.title}>Nombre del Profesor</h1>
            <Link href="../pages/estudiantes" passHref>
                <button className={styles.studentsButton}>Estudiantes</button>
            </Link>
            <div className={styles.bottom}>
              <Link href="../pages/HomePage" passHref>
                <button className={styles.logoutButton}>Cerrar Sesión</button>
              </Link>
            </div>
            
        </div>

  )
}