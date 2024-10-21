'use client'

import { error } from 'console';
import React, { useState } from 'react';
import styles from '../styles/searchFilter.module.css'

const currentYear = new Date().getFullYear();

interface CategoryFilterProps {
    onSemesterChange: (semester: string) => void;
    onYearChange: (year: string) => void;
    
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({onSemesterChange, onYearChange}) => {
    const [selectedYear, setSelectedYear] = useState<string>('');
    
    const semesterOptions = [
        {value: '', label: 'Seleccionar'},
        {value: '1', label: '1° Semestre'},
        {value: '2', label: '2° Semestre'},
    ];
    
    const handleYearChange = (year: string) => setSelectedYear(year);
    

    const applyFilters = () => {

    }
    return (
        <div className={styles['form-row']}>
            <div className={styles['form-group']}>
                <label className={styles.label}>Año</label>
                <input className={styles.selectYearButton} 
                    type= 'number'
                    placeholder='Seleccionar'
                    min={'1997'}
                    max={currentYear}
                    onChange={(e) => onYearChange(e.target.value)}
                
                />
            </div>

            <div className={styles['form-group']}>
                <label className={styles.label}>Semestre</label>
                <select className = {styles.selectButton} onChange={(e) => onSemesterChange(e.target.value)}>
                    {semesterOptions.map(option => (<option key={option.value} value={option.label}>
                    {option.label}
                    </option>))}
                </select>
            </div>
            
        </div>
    );
};

export default CategoryFilter;