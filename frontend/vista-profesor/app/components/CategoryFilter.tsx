'use client'

import { error } from 'console';
import React, { useState } from 'react';

interface CategoryFilterProps {
    onSemesterChange: (semester: string) => void;
    onYearChange: (year: string) => void;
    
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({onSemesterChange, onYearChange}) => {
    const [selectedYear, setSelectedYear] = useState<string>('');
    
    const semesterOptions = [
        {value: '', label: 'Seleccionar Semestre'},
        {value: '1', label: '1° Semestre'},
        {value: '2', label: '2° Semestre'},
    ];
    
    const handleYearChange = (year: string) => setSelectedYear(year);
    

    const applyFilters = () => {

    }
    return (
        <div>
            <label>Año</label>
            <input 
                type= 'number'
                placeholder='Seleccionar Año'
                min={'1997'}
                max={'2024'}
                onChange={(e) => onYearChange(e.target.value)}
                
            />

            <label>Semestre</label>
            <select onChange={(e) => onSemesterChange(e.target.value)}>
                {semesterOptions.map(option => (<option key={option.value} value={option.label}>
                    {option.label}
                </option>))}
            </select>
        </div>
    );
};

export default CategoryFilter;