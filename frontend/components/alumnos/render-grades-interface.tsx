import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RenderCategory } from "./render-category";
import { GradeCategory } from "@/interfaces/grade.category";


const gradeCategories: Record<string, GradeCategory> = {
  A: { years: 5, semestersPerYear: 2, gradesPerSemester: 6 },
  B: { years: 2, semestersPerYear: 2, gradesPerSemester: 6 },
  C: { years: 1, semestersPerYear: 1, gradesPerSemester: 5 }
}




export function RenderGradesInterface({isDarkMode} : {
    isDarkMode : boolean
}) { 

  const [showGrades, setShowGrades] = useState(false)
  const [showStudentButton, setShowStudentButton] = useState(false)
  const [studentName, setStudentName] = useState('')

  const [grades, setGrades] = useState<Record<string, number[][][]>>({
    A: [
      [Array(6).fill(7), Array(6).fill(7)],
      [Array(5).fill(7), Array(5).fill(7)],
      [Array(4).fill(7), Array(4).fill(7)],
      [Array(4).fill(7), Array(4).fill(7)],
      [Array(4).fill(7), Array(4).fill(7)],
    ],
    B: [
      [Array(2).fill(7), Array(2).fill(7)],
      [Array(3).fill(7), Array(2).fill(7)]
   ],
    C: [[Array(4).fill(0)]]
  })

    const [finalGrade, setFinalGrade] = useState(0)
    
  
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
        [[9, 4, 5, 2, 2, 4], [9, 4, 6, 2, 2, 3]],
        [[11, 9, 4, 3, 3], [11, 6, 6, 3, 4]],
        [[18, 3, 3, 6], [17, 4, 3, 3]],
        [[17, 3, 5, 4], [18, 5, 5, 4]],
        [[16, 5, 5, 4], [16, 2, 5, 3]],
      ],
      B: [
        [[17, 32], [26, 32]],
        [[26, 6, 14], [27, 18]],
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

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ A: false, B: false, C: false })

  const [subjectNames, setSubjectNames] = useState<Record<string, string[][][]>>({
    A: [
      [["Anatomía y Embriología I", "Histología I", "Procesos Biológicos I", "Introducción a la Medicina I", "Bioestadística I", "Ciencias Sociales de la Salud"], ["Anatomía y Embriología II", "Histología II", "Procesos BiológicosII", "Introducción a la Medicina II", "Bioestadística II", "Seguridad Social y Sistemas de salud"]],
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
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className={`w-64 p-4 flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
        <h2 className="text-white text-xl font-bold mb-4">{studentName}</h2>
        <Button
          onClick={() => setShowStudentButton(!showStudentButton)}
          className={`mb-2 ${isDarkMode ? 'bg-gray-700 text-white text-lg p-4' : 'bg-black text-white text-lg p-4'}`}
        >
        Estudiante
        </Button>
        {showStudentButton && !showGrades && (
        <Button 
          onClick={() => setShowGrades(true)} 
          className={isDarkMode ? 'bg-gray-700 text-white text-lg p-4' : 'bg-black text-white text-lg p-4'}
        >
          Simular Notas
        </Button>
        )}
      </div>
    
      <div className="flex-1 flex flex-col w-full p-8">
        {!showGrades ? (
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Bienvenido</h1>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>Este es un mensaje de bienvenida para el estudiante.</p>
          </div>
        ) : (
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Simulación de Notas</h1>
            <RenderCategory 
                category={"A"}
                isDarkMode={isDarkMode}
                toggleCategory={toggleCategory}
                expandedCategories={expandedCategories}
                gradeCategories={gradeCategories}
                subjectNames={subjectNames} 
                grades={grades} 
                updateGrade={updateGrade}              
            />
            <RenderCategory 
                category={"B"}
                isDarkMode={isDarkMode}
                toggleCategory={toggleCategory}
                expandedCategories={expandedCategories}
                gradeCategories={gradeCategories}
                subjectNames={subjectNames} 
                grades={grades} 
                updateGrade={updateGrade}              
            />
            <RenderCategory 
                category={"C"}
                isDarkMode={isDarkMode}
                toggleCategory={toggleCategory}
                expandedCategories={expandedCategories}
                gradeCategories={gradeCategories}
                subjectNames={subjectNames} 
                grades={grades} 
                updateGrade={updateGrade}              
            />
            
            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <p className={`font-bold text-3xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}> Nota Final: {finalGrade} </p>
            </div>
          </div>
          )}
      </div>
    </div>
  )
} 