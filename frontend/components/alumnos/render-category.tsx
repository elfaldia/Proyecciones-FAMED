import { GradeCategory } from "@/interfaces/grade.category";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import RenderGradesInputs from "./render-grades-inputs";






export function RenderCategory({category, isDarkMode, toggleCategory, expandedCategories, gradeCategories, grades, subjectNames, updateGrade} : {
    category: string
    isDarkMode: boolean
    toggleCategory: (category: string) => void
    expandedCategories: Record<string, boolean>
    gradeCategories: Record<string, GradeCategory>
    grades: Record<string, number[][][]>
    subjectNames: Record<string, string[][][]>
    updateGrade: (category: string, year: number, semester: number, index: number, value: string) => void
    }) {

    const descripcionCategoria : Record<string, string> = {
        'A' : 'Notas de primera a quinto año (60%)',
        'B' : 'Notas de Internado (30%)',
        'C' : 'Notas de exámenes de pregrado de especialización (10%)'
    } 
    
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={category}>
                <AccordionTrigger
                className={`text-xl font-semibold py-3 ${isDarkMode ? 'text-white' : 'text-black'}`}
                onClick={() => toggleCategory(category)}
                >
                {descripcionCategoria[category]}
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
}