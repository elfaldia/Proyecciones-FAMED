'use client'

import React from 'react'
import styles from '../styles/searchFilter.module.css'

interface SortFilterProps {
    onSortChange: (sortOrder:string ) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({onSortChange}) => {
    const sortOptions = [
        {value: 'name-asc', label: 'Nombre: A-Z'},
        {value: 'name-desc', label: 'Nombre: Z-A'},
        {value: 'year-desc', label: 'Año: Mayor a Menor'},
        {value: 'year-asc', label: 'Año: Menor a Mayor'},
    ];

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(event.target.value);
    };

    return (
        <div className={styles['form-group']}>
            <label className={styles.label}>Ordenar por:</label>
                <select className={styles.selectButton} onChange={handleSortChange}>
                    <option value="">Seleccionar</option>
                    {sortOptions.map((option) => (
                        <option key={option.value} value = {option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
        </div>
    );
};

export default SortFilter;