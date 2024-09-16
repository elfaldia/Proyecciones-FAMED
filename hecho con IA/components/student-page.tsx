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
  const [grades, setGrades] = useState<Record<string, number[][][]>>({
    A: Array(5).fill(null).map(() => Array(2).fill(null).map(() => Array(6).fill(0))),
    B: Array(2).fill(null).map(() => Array(2).fill(null).map(() => Array(6).fill(0))),
    C: [[Array(5).fill(0)]]
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

  useEffect(() => {
    const calculateFinalGrade = () => {
      const avgA = grades.A.flat(2).reduce((sum, grade) => sum + grade, 0) / (5 * 2 * 6) * 0.6
      const avgB = grades.B.flat(2).reduce((sum, grade) => sum + grade, 0) / (2 * 2 * 6) * 0.3
      const avgC = grades.C.flat(2).reduce((sum, grade) => sum + grade, 0) / 5 * 0.1
      return (avgA + avgB + avgC).toFixed(2)
    }
    setFinalGrade(parseFloat(calculateFinalGrade()))
  }, [grades])

  const renderGradeInputs = (category: string, year: number, semester: number) => (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {grades[category][year][semester].map((grade, index) => (
        <Input
          key={index}
          type="number"
          value={grade || ''}
          onChange={(e) => updateGrade(category, year, semester, index, e.target.value)}
          className="w-16"
          min={1}
          max={7}
          step={0.1}
        />
      ))}
    </div>
  )

  const renderCategory = (category: string) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={category}>
        <AccordionTrigger className="text-lg font-semibold">
          Notas {category} ({category === 'A' ? '60%' : category === 'B' ? '30%' : '10%'})
        </AccordionTrigger>
        <AccordionContent>
          {Array.from({ length: gradeCategories[category].years }).map((_, yearIndex) => (
            <Accordion key={yearIndex} type="single" collapsible className="mb-4">
              <AccordionItem value={`year-${yearIndex}`}>
                <AccordionTrigger className="text-md font-medium">
                  {category === 'C' ? 'Notas' : `${yearIndex + (category === 'B' ? 6 : 1)}º Año`}
                </AccordionTrigger>
                <AccordionContent>
                  {Array.from({ length: gradeCategories[category].semestersPerYear }).map((_, semesterIndex) => (
                    <div key={semesterIndex} className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
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
      </AccordionItem>
    </Accordion>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-500 p-4 flex flex-col">
        <h2 className="text-white text-xl font-bold mb-4">Nombre del Estudiante</h2>
        <Button 
          onClick={() => setShowStudentButton(!showStudentButton)} 
          className="mb-2"
        >
          Estudiante
        </Button>
        {showStudentButton && (
          <Button onClick={() => setShowGrades(!showGrades)}>
            Simular Notas
          </Button>
        )}
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {!showGrades ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
            <p className="text-gray-600">Este es un mensaje de bienvenida para el estudiante.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Simulación de Notas</h1>
            {renderCategory('A')}
            {renderCategory('B')}
            {renderCategory('C')}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="font-bold text-xl text-center">Nota Final: {finalGrade}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}