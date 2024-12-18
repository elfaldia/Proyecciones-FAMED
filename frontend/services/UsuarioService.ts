import { Estudiante } from "@/interfaces/estudiante"
import axios from "axios"


export interface ApiUsusarioErrorResponse {
    Code: number
    Message?: string
}

export interface ApiUsusarioResponse<T = any | undefined> {
    Code: number 
    Status: string,
    Data: T
} 


export class UsuarioService {

    public static async GetEstudiantes(): Promise<ApiUsusarioResponse<Estudiante[]> | ApiUsusarioErrorResponse> {
        try {
            const { data } = await axios.get(
                `${process?.env?.NEXT_PUBLIC_BACKEND_URL as string}/usuario/estudiante`
            )
            return {
                Code: data.code,
                Status: data.Status,
                Data: data.data
            }
        } catch (error : any) {
            return {
                Code: error?.response?.data?.code,
                Message: error?.response?.data?.message,
            }
        }
    }
}