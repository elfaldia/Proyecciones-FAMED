import axios from 'axios';

export type LoginResponse = {
    success: boolean,
    nombre?: string,
    role?: string,
    accessToken?: string,
}
export const loginService = async (
    rut: string,
    password: string 
): Promise<LoginResponse> => {
    try {
        const response = await axios.post(
            `${process?.env?.NEXT_PUBLIC_BACKEND_URL as string}/usuario/auth/login`,
            {
                rut,
                password
            },
            {
                withCredentials: true
            }
        );
        return {
            success: (response.data?.success as boolean),
            nombre: response.data?.nombre,
            role: response.data?.rol,
            accessToken: response.data?.access_token,
        };
    }
    catch (error) {
        return {
            success: false
        };
    }
}