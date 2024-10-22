import React, {useState} from 'react';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import '@/app/styles/searchfilter.css'


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
        <div>
            <label>Seleccionar Filtros</label>
            <CategoryFilter 
                onYearChange={handleYearChange}
                onSemesterChange={handleSemesterChange}
            
            />

            <label>Ordenar</label>
            <SortFilter onSortChange={handleSortChange}/>

            <button onClick={applyFilters}>Aplicar Filtros</button>
        </div> 

    );

};

export default SearchFilter;