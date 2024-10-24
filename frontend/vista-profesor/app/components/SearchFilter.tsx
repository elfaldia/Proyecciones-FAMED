import React, {useState} from 'react';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import styles from '../styles/searchFilter.module.css'


interface Filters {
    semester: string;
    year: string;
    sortOrder: string;
}

interface SearchFilterProps {
    onApplyFilters: (filters: Filters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({onApplyFilters}) => {
    const [filters, setFilters] = useState<Filters>({
        year:'',
        semester:'',
        sortOrder:'',
    });


    const handleYearChange = (year:string) => setFilters({...filters, year});
    const handleSemesterChange = (semester:string) => setFilters({...filters, semester});
    const handleSortChange = (sortOrder:string) => setFilters({...filters, sortOrder});

    const applyFilters = () => {
        onApplyFilters(filters);
    };

    return (
        <div className={styles['filter-form']}>
            <div className={styles['form-row']}>
                
                    <h2 className={styles.title}>Seleccionar Filtros</h2>
                        <CategoryFilter 
                            onYearChange={handleYearChange}
                            onSemesterChange={handleSemesterChange}
                        />
                    
                    <SortFilter onSortChange={handleSortChange}/>

                <button className={styles.applyButton} onClick={applyFilters}>Aplicar Filtros</button>    
            </div>
            
        </div> 

    );

};

export default SearchFilter;