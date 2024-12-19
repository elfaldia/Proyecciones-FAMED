'use client'

import React, { useState } from 'react'
import styles from '@/app/styles/searchFilter.module.css'
import { Input } from '@/components/ui/input'

interface StudentNameFilterProps {
    onStudentNameChange: (studentName:string ) => void;
}

const StudentNameFilter: React.FC<StudentNameFilterProps> = ({onStudentNameChange}) => { 
    const [selectedname, setSelectedName] = useState<string>('');
    const handleStudentNameChange = (name: string) => {
        setSelectedName(name);
        onStudentNameChange(name);
    }

        return (
            <div>
                <h2 className={styles.title}>Buscador de Estudiante</h2>
                <input className={styles.selectYearButton} type="estudiante" placeholder="Nombre Estudiante"
                onChange={(e) => handleStudentNameChange(e.target.value)}/>
            
            </div>
        );
}

export default StudentNameFilter;
