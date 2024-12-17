

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Moon, Sun } from 'lucide-react'
import { RenderGradesInterface } from './render-grades-interface'
import { GradeCategory } from '@/interfaces/grade.category'
import RenderGradesInputs from './render-grades-inputs'


/*
const gradeCategories: Record<string, GradeCategory> = {
  A: { years: 5, semestersPerYear: 2, gradesPerSemester: 6 },
  B: { years: 2, semestersPerYear: 2, gradesPerSemester: 6 },
  C: { years: 1, semestersPerYear: 1, gradesPerSemester: 5 }
}
*/


export function StudentPage({isDarkMode} : {isDarkMode: boolean}) {

  return (
    <div className={`w-full ${isDarkMode ? 'dark' : ''}`}>
      <RenderGradesInterface 
        isDarkMode={isDarkMode}
      />
    </div>
  )
}







/*

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
/*

/*
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


*/



/*
const renderCategory = (category: string) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={category}>
        <AccordionTrigger
          className={`text-xl font-semibold py-3 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={() => toggleCategory(category)}
        >
          {category === 'A' ? 'Notas de primero a quinto año (60%)' :
           category === 'B' ? 'Notas de Internado (30%)' :
           'Notas de exámenes de pregrado de especialización (10%)'}
        </AccordionTrigger>
        {expandedCategories[category] && (
          <AccordionContent>
            {Array.from({ length: gradeCategories[category].years }).map((_, yearIndex) => (
              <Accordion key={yearIndex} type="single" collapsible className="mb-4">
                <AccordionItem value={`year-${yearIndex}`}>
                  <AccordionTrigger className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category === 'C' ? 'Notas' : `${yearIndex + (category === 'B' ? 6 : 1)}º Año`}
                  </AccordionTrigger>
                  <AccordionContent>
                    {Array.from({ length: gradeCategories[category].semestersPerYear }).map((_, semesterIndex) => (
                      <div key={semesterIndex} className="mb-4">
                        <h4 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {category === 'C' ? '' : `Semestre ${semesterIndex + 1}`}
                        </h4>
                        <RenderGradesInputs 
                          category={category} 
                          year={yearIndex} 
                          semester={semesterIndex} 
                          grades={grades} 
                          subjectNames={subjectNames} 
                          isDarkMode={isDarkMode} 
                          updateGrade={updateGrade} 
                        />
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
*/


/*
  const renderGradeInputs = (category: string, year: number, semester: number) => (
    <div className="grid grid-cols-6 gap-4 mb-4">
      {grades[category] && grades[category][year] && grades[category][year][semester] ? (
        grades[category][year][semester].map((grade, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              {subjectNames[category][year][semester][index] || `Asignatura ${index + 1}`}
            </span>
            <Input
              type="number"
              value={grade || ''}
              onChange={(e) => updateGrade(category, year, semester, index, e.target.value)}
              className={`w-17 h-11 text-lg border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              min={1}
              max={7}
              step={0.1}
            />
          </div>
        ))
      ) : (
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No hay datos disponibles para este semestre.</p>
      )}
    </div>
  )   
*/