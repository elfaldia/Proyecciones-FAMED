import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SessionState {
    accessToken?: string
    username?: string
    role?: string
    setUsername: (username: string) => void
    setAccessToken: (accessToken: string) => void
    setRole: (role: string) => void;
}

const useSessionStore = create<SessionState>() (
    devtools(
        persist(
            (set, get) => ({
                accessToken: undefined,
                username: undefined,
                role: undefined,
                setAccessToken: (accessToken: string) => set(()=>({accessToken})),
                setUsername: (username: string) => set(() => ({username})),
                setRole: (role: string) => set(() => ({role}))
            }),
            {
                name: 'sessionStore',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)

export default useSessionStore