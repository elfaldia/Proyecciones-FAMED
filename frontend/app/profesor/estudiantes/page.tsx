'use client'
import React, {useEffect, useState} from 'react';
import SearchFilter from '../../../components/profesores/SearchFilter'
import { ApiUsusarioErrorResponse, ApiUsusarioResponse, UsuarioService } from '@/services/UsuarioService';
import { Estudiante } from '@/interfaces/estudiante';

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

    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);


    useEffect(() => {
        const fetchEstudiantes = async () => {
            const resp = await UsuarioService.GetEstudiantes()
            console.log(resp)
            if(resp.Code < 300 && resp.Code >= 200) {
                const data = (resp as ApiUsusarioResponse<Estudiante[]>).Data
                setEstudiantes(data)
            } else {
                console.log((resp as ApiUsusarioErrorResponse).Message)
                alert("Error con la conexión")
                setEstudiantes([])
            }
        }
        fetchEstudiantes()
    }, [])




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
            {estudiantes.map((value, index) => {
                return (
                    <div>
                        <p>{" id: " + value._id + " Nombre: " + value.nombre + " apellido: " + value.apellido  + " rut: " + value.rut + " año: " + value.anio_admision}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default page; 