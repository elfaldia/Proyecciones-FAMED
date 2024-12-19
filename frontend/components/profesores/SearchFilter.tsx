import React, {useState} from 'react';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import styles from '@/app/styles/searchFilter.module.css'


interface Filters {
    year: string;
    sortOrder: string;
}

interface SearchFilterProps {
    onApplyFilters: (filters: Filters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({onApplyFilters}) => {
    const [filters, setFilters] = useState<Filters>({
        year:'',
        sortOrder:'',
    });


    const handleYearChange = (year:string) => setFilters({...filters, year});
    const handleSortChange = (sortOrder:string) => setFilters({...filters, sortOrder});

    const applyFilters = () => {
        onApplyFilters(filters);
    };

    return (
        <div className={styles['filter-form']}>
            <div className={styles['form-row']}>
                <CategoryFilter 
                    onYearChange={handleYearChange}
                />
                <SortFilter onSortChange={handleSortChange}/>
                <button className={styles.applyButton} onClick={applyFilters}>Aplicar Filtros</button>    
            </div>  
        </div> 
    );

};

export default SearchFilter;