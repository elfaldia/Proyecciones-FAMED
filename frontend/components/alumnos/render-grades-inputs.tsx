import { Input } from "../ui/input"





export default function renderGradeInputs({category, year, semester, grades, subjectNames, isDarkMode, updateGrade}: {
    category: string 
    year: number 
    semester: number
    grades: Record<string, number[][][]>
    subjectNames: Record<string, string[][][]>
    isDarkMode: boolean
    updateGrade: (category: string, year: number, semester: number, index: number, value: string) => void
}) {


    return (
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
}  