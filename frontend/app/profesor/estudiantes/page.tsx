'use client'
import React, {useEffect, useState} from 'react';
import SearchFilter from '../../../components/profesores/SearchFilter'
import { ApiUsusarioErrorResponse, ApiUsusarioResponse, UsuarioService } from '@/services/UsuarioService';
import { Estudiante } from '@/interfaces/estudiante';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Download } from 'lucide-react';

interface Filters {
    year: string;
    sortOrder: string;
    studentName: string;
}

const page:React.FC = () => {

    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState<Estudiante[]>([]);


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
        sortOrder:'',
        studentName:'',
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
            
        .filter(estudiante => {
            const nameMatch = filters.studentName ? estudiante.nombre.toLowerCase() === filters.studentName.toLowerCase() ||
            estudiante.apellido.toLowerCase() === filters.studentName.toLowerCase() || 
            estudiante.nombre.toLowerCase().concat(' '+estudiante.apellido.toLowerCase()) === filters.studentName.toLowerCase(): true;
            return nameMatch;
            })

        .filter(estudiante => {
                const yearMatch = filters.year ? estudiante.anio_admision === filters.year : true;
                return yearMatch;
            })
        
        .sort((a, b) => {
            if (filters.sortOrder === 'name-asc') {
                return a.nombre.localeCompare(b.nombre);
            } else if (filters.sortOrder === 'name-desc') {
                return b.nombre.localeCompare(a.nombre);
            } else if (filters.sortOrder === 'year-desc') {
                return b.anio_admision.localeCompare(a.anio_admision);
            } else if (filters.sortOrder === 'year-asc') {
                return a.anio_admision.localeCompare(b.anio_admision);
            }
            return 0;
        });

        setFilteredEstudiantes(filtered);
    };

    return (
        <div>
            <div>
    <SearchFilter onApplyFilters={handleAppliedFilter} />
    {appliedFilters.year || appliedFilters.sortOrder || appliedFilters.studentName ? (
        <div>
            {filteredEstudiantes.length > 0 ? (
                <Table>
                    <TableCaption>{filteredEstudiantes.length} estudiantes encontrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nombre</TableHead>
                            <TableHead>RUT</TableHead>
                            <TableHead className="text-right">Descargar Informe</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEstudiantes.map(estudiante => (
                            <TableRow key={estudiante.rut}>
                                <TableCell>{estudiante.nombre} {estudiante.apellido}</TableCell>
                                <TableCell>{estudiante.rut}</TableCell>
                                <TableCell className="text-right">
                                    <button>
                                        <Download size="20px"/>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No hay estudiantes que coincidan con los filtros.</p>
            )}
        </div>
    ) : (
        <p>Seleccione al menos un filtro para ver los estudiantes.</p>
    )}
</div>

            
        </div>
    );
    
};  

export default page; 
