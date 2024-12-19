'use client'
import React, {useEffect, useState} from 'react';
import SearchFilter from '../../../components/profesores/SearchFilter'
import { ApiUsusarioErrorResponse, ApiUsusarioResponse, UsuarioService } from '@/services/UsuarioService';
import { Estudiante } from '@/interfaces/estudiante';


interface Filters {
    year: string;
    sortOrder: string;
}

const page:React.FC = () => {

    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState<Estudiante[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        year:'',
        sortOrder:'',
    });

    useEffect(() => {
        const fetchEstudiantes = async () => {
            const resp = await UsuarioService.GetEstudiantes();
            console.log(resp);
            if(resp.Code < 300 && resp.Code >= 200) {
                const data = (resp as ApiUsusarioResponse<Estudiante[]>).Data;
                setEstudiantes(data);
            } else {
                console.log((resp as ApiUsusarioErrorResponse).Message);
                alert("Error con la conexión");
                setEstudiantes([]);
            }
        }
        fetchEstudiantes();
    }, []);

    const handleAppliedFilter = (filters: Filters) => {
        setAppliedFilters(filters);

        // Aplica los filtros directamente y actualiza `filteredEstudiantes`
        const filtered = estudiantes
            
        /*.filter(estudiante => {
                const yearMatch = filters.year ? estudiante.year === filters.year : true;
                return yearMatch;
            })
        */
            .sort((a, b) => {
                if (filters.sortOrder === 'name-asc') {
                    return a.nombre.localeCompare(b.nombre);
                } else if (filters.sortOrder === 'name-desc') {
                    return b.nombre.localeCompare(a.nombre);
                }
                return 0;
            });

        setFilteredEstudiantes(filtered);
    };

    return (
        <div>
            <div>
                <SearchFilter onApplyFilters={handleAppliedFilter} />
                {appliedFilters.year || appliedFilters.sortOrder ? (
                    <div>
                        {filteredEstudiantes.length > 0 ? (
                            <ul>
                                {filteredEstudiantes.map(estudiante => (
                                    <li key={estudiante.rut}>
                                        {estudiante.nombre} - 
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay estudiantes que coincidan con los filtros.</p>
                        )}
                    </div>
                ):(
                    <p>Seleccione al menos un filtro para ver los estudiantes</p>
                )
                }

            </div>
            
        </div>
    );
    
};  

export default page; 

/* {estudiantes.map((value, index) => {
                return (
                    <div>
                        <p>{" id: " + value._id + " Nombre: " + value.nombre + " apellido: " + value.apellido  + " rut: " + value.rut}</p>
                    </div>
                )
            })}*/