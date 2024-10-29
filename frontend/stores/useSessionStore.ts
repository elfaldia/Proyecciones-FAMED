import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SessionState {
    accessToken?: string
    setAccessToken: (accessToken: string) => void;
}

const useSessionStore = create<SessionState>() (
    devtools(
        persist(
            (set, get) => ({
                accessToken: undefined,
                setAccessToken: (accessToken: string) => set(()=>({accessToken}))
            }),
            {
                name: 'sessionStore',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)

export default useSessionStore