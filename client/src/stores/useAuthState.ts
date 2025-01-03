import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { AUTH_BASE_URL } from "../constants/constants";

interface User {
    id: number;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    authMessage: string | null;
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
            authMessage: null,

            login: async (email, password) => {
                set({ isLoading: true, authMessage: null });

                try {
                    const response = await fetch(AUTH_BASE_URL + 'logIn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    set({ user: data.data, isLoggedIn: true, isLoading: false });
                } catch (error: any) {
                    set({ authMessage: error.message, isLoggedIn: false, isLoading: false });
                }
            },
            register: async (email, password, masterPassword) => {
                set({ isLoading: true, authMessage: null });

                try {
                    const response = await fetch(AUTH_BASE_URL + 'register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password, masterPassword }),
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    set({ user: data.user, isLoggedIn: true, isLoading: false });
                } catch (error: any) {
                    set({ authMessage: error.message, isLoggedIn: false, isLoading: false });
                }
            },
            logout: () => set({ user: null, isLoggedIn: false, authMessage: null }),
        }),
        {
            name: 'PASSWORDvault-auth-storage', // Unique name for localStorage key
        }
    )
);


export default useAuthState;