'use client'
import React, {useState} from 'react';
import SearchFilter from '../../../components/SearchFilter'

interface Student {
    rut: string;
    name: string;
    year: string;
}

interface Filters {
    year: string;
    semester: string;
    sortOrder: string;
}

const page:React.FC = () => {
    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        year:'',
        semester:'',
        sortOrder:'',
    });

    const handleAppliedFilter = (filter : Filters) => {
        setAppliedFilters(filter);
    }
    return (
        <div>
            <SearchFilter onApplyFilters={handleAppliedFilter}/>


        </div>

    );
};

export default page; 