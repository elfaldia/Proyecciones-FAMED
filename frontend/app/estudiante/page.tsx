'use client'
import { StudentPage } from "@/components/alumnos/studentpage";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import {ModeToggle} from "@/components/ModeToggle";



export default function page() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode)
    }

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <h1 className="text-3xl font-bold mb-6">¡Bienvenido a la página de Simulaciones-FAMED!</h1>
            <p className="mb-4">Con nuestra calculadora, podrás:</p>
            <ul className="list-disc pl-8 mb-6">
                <li><strong>Visualizar tu promedio en tiempo real:</strong> ¡Sin necesidad de hacer cálculos a mano!</li>
                <li><strong>Alta precisión:</strong> ¡Cálculos realizados con 4 decimales y mostrando solo 2 decimales, porque sabes que cada décima es importante!</li>
                <li><strong>Integración con Banner:</strong> Tus notas se cargarán automáticamente para que tú solo te enfoques en las notas que deseas simular.</li>
            </ul>
        </div>
    );
};

/*
        <div className="flex flex-1 w-full">   
            <button
                onClick={toggleDarkMode}
                className={`fixed top-4 right-4 p-4 rounded-full ${
                isDarkMode ? 'bg-yellow-400 text-gray-900 text-2xl' : 'bg-gray-800 text-yellow-400 text-2xl'
                }`}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <StudentPage isDarkMode={isDarkMode} />
        </div>

*/