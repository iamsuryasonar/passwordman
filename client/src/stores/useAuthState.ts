import { create, StateCreator } from 'zustand'

import { persist, PersistOptions } from 'zustand/middleware'

const BASE_URL = 'http://localhost:3001/api/auth/'

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

type MyPersist = (
    config: StateCreator<AuthState>,
    options: PersistOptions<AuthState>
) => StateCreator<AuthState>

const useAuthState = create<AuthState>(
    (persist as MyPersist)(
        (set) => ({
            user: null,
            isLoading: false,
            isLoggedIn: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch(BASE_URL + 'logIn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    console.log(data)
                    set({ user: data.user, isLoggedIn: true, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoggedIn: false, isLoading: false });
                }
            },
            register: async (name, email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch(BASE_URL + 'register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, password }),
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    console.log(data)
                    set({ user: data.user, isLoggedIn: true, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoggedIn: false, isLoading: false });
                }
            },
            logout: () => set({ user: null, isLoggedIn: false, error: null }),
        }),
        {
            name: 'auth-storage', // Unique name for localStorage (or sessionStorage) key
            getStorage: () => localStorage, // (Optional) Specify storage type (localStorage by default)
        }
    )
);


export default useAuthState;