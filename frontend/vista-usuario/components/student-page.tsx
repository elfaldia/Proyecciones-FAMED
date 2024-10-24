'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type GradeCategory = {
  years: number
  semestersPerYear: number
  gradesPerSemester: number
}

const gradeCategories: Record<string, GradeCategory> = {
  A: { years: 5, semestersPerYear: 2, gradesPerSemester: 6 },
  B: { years: 2, semestersPerYear: 2, gradesPerSemester: 6 },
  C: { years: 1, semestersPerYear: 1, gradesPerSemester: 5 }
}

export function StudentPage() {
  const [showGrades, setShowGrades] = useState(false)
  const [showStudentButton, setShowStudentButton] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProfessor, setIsProfessor] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [studentName, setStudentName] = useState('')
  const [grades, setGrades] = useState<Record<string, number[][][]>>({
    A: [
      [Array(6).fill(7), Array(6).fill(7)],  // 1º y 2º semestres (6 casillas)
      [Array(5).fill(7), Array(5).fill(7)],  // 3º y 4º semestres (5 casillas)
      [Array(4).fill(7), Array(4).fill(7)],  // 5º y 6º semestres (4 casillas y 4 casillas)
      [Array(4).fill(7), Array(4).fill(7)],  // 7º y 8º semestres (4 casillas)
      [Array(4).fill(7), Array(4).fill(7)],  // 9º y 10º semestres (4 casillas y 4 casillas)
    ],
    B: [
      [Array(2).fill(7), Array(2).fill(7)],  // 11º y 12º semestres (2 casillas)
      [Array(3).fill(7), Array(2).fill(7)]   // 13º y 14º semestres (3 y 2 casillas)
    ],
    C: [[Array(4).fill(0)]]
  }) 
  const [subjectNames, setSubjectNames] = useState<Record<string, string[][][]>>({
    A: [
      [["Anatomía y Embriología I", "Histología I", "Procesos BiológicosI", "Introducción a la Medicina I", "Bioestadística I", "Ciencias Sociales de la Salud"], ["Anatomía y Embriología II", "Histología II", "Procesos BiológicosII", "Introducción a la Medicina II", "Bioestadística II", "Seguridad Social y Sistemas de salud"]],
      [["Función Normal y Patológica I", "Neurociencias", "Entrevista Clínica", "Epidemiología", "Investigación Cualitativa"], ["Función Normal y Patológica II", "Microbiología y Parasitología", "Semiología", "Diagnóstico de Salud Participativo", "Investigación Cuantitativa"]],
      [["Clínica del Adulto I", "Educación para la Salud", "Epidemiología de Enfermedades transmitibles", "Salud Familiar"],["Clínica del Adulto II", "Ética Médica I", "Medicina Basada en Evidencias", "Salud Ambiental"]],
      [["Clínica del Adulto III", "Ética Médica II", "Psicopatología I", "Gestión en Salud"],["Clínica del Adulto IV", "Psicopatología II", "Integración Clínica", "Gestión de Proyectos"]],
      [["Pediatría", "Psiquiatría I", "Atención Avanzada de Urgencias", "SaludOcupacional"],["Derecho y Práctica Médica", "Obstetricia y Ginecología", "Psiquiatría II", "Emergencias y Desastres"]],
    ],
    B: [
      [["Internado de Cirugía","Internado de Medicina Interna"],["Internado de Ginecología y Obstetricia","Internado de Pediatría"]],
      [["Internado de Especialidad Básica Electiva","Internado de Especialidad Libre","Internado de Especialidades Obligatorias"],["Internado Atención Primaria de Salud","Internado Rural Interdisciplinario"]],
    ],
    C: [
      [["Internado de Cirugía","Internado de Medicina Interna","Internado de Ginecología y Obstetricia","Internado de Pediatría"]],
    ],
    
  })   
  const [finalGrade, setFinalGrade] = useState(0)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ A: false, B: false, C: false })

  const updateGrade = (category: string, year: number, semester: number, index: number, value: string) => {
    const newValue = value === '' ? 0 : Math.min(Math.max(parseFloat(value), 1), 7)
    setGrades(prevGrades => {
      const newGrades = { ...prevGrades }
      newGrades[category][year][semester][index] = newValue
      return newGrades
    })
  }

  const semesterCredits = [26, 27, 30, 30, 30, 27, 29, 32, 30, 26, 49, 58, 47, 45]

  const subjectCredits: Record<string, number[][][]> = {
    A: [
      [[9, 4, 5, 2, 2, 4], [9, 4, 6, 2, 2, 3]], // 1º y 2º semestres
      [[11, 9, 4, 3, 3], [11, 6, 6, 3, 4]], // 3º y 4º semestres
      [[18, 3, 3, 6], [17, 4, 3, 3]], // 5º y 6º semestres
      [[17, 3, 5, 4], [18, 5, 5, 4]], // 7º y 8º semestres
      [[16, 5, 5, 4], [16, 2, 5, 3]], // 9º y 10º semestres
    ],
    B: [
      [[17, 32], [26, 32]], // 11º y 12º semestres
      [[26, 6, 14], [27, 18]], // 13º y 14º semestres
    ],
    C: [
        [[17, 32, 26, 32]]
    ]
  }

  useEffect(() => {
    const calculateFinalGrade = () => {
      const calculateCategoryGrade = (category: string) => {
        let categoryWeightedGrade = 0;
        let categoryCreditSum = 0;

        grades[category].forEach((year, yearIndex) => {
          year.forEach((semester, semesterIndex) => {
            semester.forEach((grade, gradeIndex) => {
              const credits = subjectCredits[category][yearIndex][semesterIndex][gradeIndex];
              categoryWeightedGrade += grade * credits;
              categoryCreditSum += credits;
            });
          });
        });

        return categoryCreditSum > 0 ? categoryWeightedGrade / categoryCreditSum : 0;
      };

      const gradeA = calculateCategoryGrade('A');
      const gradeB = calculateCategoryGrade('B');
      const gradeC = calculateCategoryGrade('C');

      const finalGrade = gradeA * 0.6 + gradeB * 0.3 + gradeC * 0.1;

      return isNaN(finalGrade) ? 0 : parseFloat(finalGrade.toFixed(2));
    };

    setFinalGrade(calculateFinalGrade());
  }, [grades]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  // LOGICA DEL LOGGEO
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'Gabriel Vergara' && password === '1234') {
      setIsLoggedIn(true)
      setIsProfessor(false)
      setStudentName(username)
    } else if (username === 'profesor' && password === '4321') {
      setIsLoggedIn(true)
      setIsProfessor(true)
    } else {
      alert('Credenciales incorrectas')
    }
  }

  // Definir `renderGradeInputs` correctamente aquí
  const renderGradeInputs = (category: string, year: number, semester: number) => (
    <div className="grid grid-cols-6 gap-4 mb-4">
      {grades[category] && grades[category][year] && grades[category][year][semester] ? (
        grades[category][year][semester].map((grade, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs text-gray-600 mb-1"> {/* Ajustes de estilo aquí */}
              {subjectNames[category][year][semester][index] || `Asignatura ${index + 1}`}
            </span>
            <Input
              type="number"
              value={grade || ''}
              onChange={(e) => updateGrade(category, year, semester, index, e.target.value)}
              className="w-16 text-black border border-gray-500 rounded"
              min={1}
              max={7}
              step={0.1}
            />
          </div>
        ))
      ) : (
        <p>No hay datos disponibles para este semestre.</p>
      )}
    </div>
  )   

  // Función renderCategory correctamente definida y utilizando renderGradeInputs
  const renderCategory = (category: string) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={category}>
        <AccordionTrigger
          className="text-lg font-semibold text-black py-2"
          onClick={() => toggleCategory(category)}
        >
          Notas {category} ({category === 'A' ? '60%' : category === 'B' ? '30%' : '10%'})
        </AccordionTrigger>
        {expandedCategories[category] && (
          <AccordionContent>
            {Array.from({ length: gradeCategories[category].years }).map((_, yearIndex) => (
              <Accordion key={yearIndex} type="single" collapsible className="mb-4">
                <AccordionItem value={`year-${yearIndex}`}>
                  <AccordionTrigger className="text-md font-medium text-black">
                    {category === 'C' ? 'Notas' : `${yearIndex + (category === 'B' ? 6 : 1)}º Año`}
                  </AccordionTrigger>
                  <AccordionContent>
                    {Array.from({ length: gradeCategories[category].semestersPerYear }).map((_, semesterIndex) => (
                      <div key={semesterIndex} className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-black">
                          {category === 'C' ? '' : `Semestre ${semesterIndex + 1}`}
                        </h4>
                        {renderGradeInputs(category, yearIndex, semesterIndex)}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )

  // Renderiza el formulario de login
  // Renderiza el formulario de login
  const renderLogin = () => (
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


  // Renderiza la interfaz de notas si el usuario está logueado
  const renderGradesInterface = () => (
    <div className="flex h-screen bg-gray-200">
      <div className="w-64 bg-blue-600 p-4 flex flex-col">
        <h2 className="text-white text-xl font-bold mb-4">{studentName}</h2>
        <Button
          onClick={() => setShowStudentButton(!showStudentButton)}
          className="mb-2 bg-black text-white"
        >
          Estudiante
        </Button>
        {showStudentButton && (
          <Button onClick={() => setShowGrades(!showGrades)} className="bg-black text-white">
            Simular Notas
          </Button>
        )}
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {!showGrades ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-black">Bienvenido</h1>
            <p className="text-gray-800">Este es un mensaje de bienvenida para el estudiante.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-black">Simulación de Notas</h1>
            {renderCategory('A')}
            {renderCategory('B')}
            {renderCategory('C')}
            <div className="mt-6 p-4 bg-gray-200 rounded-lg">
              <p className="font-bold text-xl text-center text-black">Nota Final: {finalGrade}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Renderiza la interfaz para el profesor
  // ACA DEBE AVANZAR LA DANIELA
  const renderProfessorInterface = () => (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold text-black">Bienvenido Profesor</h1>
    </div>
  )

  return (
    <div>
      {isLoggedIn ? (isProfessor ? renderProfessorInterface() : renderGradesInterface()) : renderLogin()}
    </div>
  )
}
