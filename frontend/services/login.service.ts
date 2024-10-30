import axios from 'axios';

export type LoginResponse = {
    isValid: boolean,
    username?: string,
    role?: string,
    accessToken?: string,
}
export const checkSessionService = async (
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
            isValid: (response.data?.is_valid as boolean),
            username: response.data?.username,
            role: response.data?.rol,
            accessToken: response.data?.accessToken,
        };
    }
    catch (error) {
        return {
            isValid: false
        };
    }
}