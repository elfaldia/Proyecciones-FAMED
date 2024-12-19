'use client'

import { error } from 'console';
import React, { useState } from 'react';
import styles from '@/app/styles/searchFilter.module.css'

const currentYear = new Date().getFullYear();

interface CategoryFilterProps {
    onYearChange: (year: string) => void;
    
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({onYearChange}) => {
    const [selectedYear, setSelectedYear] = useState<string>('');

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        onYearChange(year);
    };

    return (
        <div className={styles['form-row']}>
            <div className={styles['form-group']}>
                <label className={styles.label}>Filtrar por Año</label>
                <input className={styles.selectYearButton} 
                    type= 'number'
                    placeholder='Año de ingreso'
                    min={'1997'}
                    max={currentYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                
                />
            </div>
            
        </div>
    );
};

export default CategoryFilter;