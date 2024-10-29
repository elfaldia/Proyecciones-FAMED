import axios from 'axios';

export type CheckResponse = {
    isValid : boolean,
    role : string,
}
export const checkSessionService = async (
    accessToken: string 
): Promise<CheckResponse> => {
    try {
        console.log("en check: ", accessToken)
        const response = await axios.get(
            `${process?.env?.NEXT_PUBLIC_BACKEND_URL as string}/usuario/auth/check-token`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    
                },
                withCredentials: true
            }
        );
        return {
            isValid: response.data?.is_valid,
            role: response.data?.rol
        };
    }
    catch (error) {
        return {
            isValid: false,
            role: ""
        };
    }
}