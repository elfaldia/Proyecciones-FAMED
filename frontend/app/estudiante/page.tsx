'use client'
import { StudentPage } from "@/components/alumnos/studentpage";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";



export default function page() {

    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode)
    }

    return (
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Bienvenido</h1>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>Este es un mensaje de bienvenida para el estudiante.</p>
        </div>
    )
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