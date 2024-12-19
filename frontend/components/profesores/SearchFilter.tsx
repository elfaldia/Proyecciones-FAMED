import React, {useState} from 'react';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import styles from '@/app/styles/searchFilter.module.css'
import StudentNameFilter from './StudentNameFilter';

interface Filters {
    studentName: string;
    year: string;
    sortOrder: string;
    
}

interface SearchFilterProps {
    onApplyFilters: (filters: Filters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({onApplyFilters}) => {
    const [filters, setFilters] = useState<Filters>({
        studentName: '',
        year:'',
        sortOrder:'',
    });

    const handleStudentNameChange = (studentName: string) => setFilters({...filters, studentName});
    const handleYearChange = (year:string) => setFilters({...filters, year});
    const handleSortChange = (sortOrder:string) => setFilters({...filters, sortOrder});

    const applyFilters = () => {
        onApplyFilters(filters);
    };

    return (
        <div className={styles['filter-form']}>
            <div className={styles['form-row']}>
                <StudentNameFilter onStudentNameChange={handleStudentNameChange}/>
                <CategoryFilter onYearChange={handleYearChange}/>
                <SortFilter onSortChange={handleSortChange}/>
                <button className={styles.applyButton} onClick={applyFilters}>Aplicar Filtros</button>    
            </div>  
        </div> 
    );

};

export default SearchFilter;