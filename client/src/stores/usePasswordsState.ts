import { create, StateCreator } from 'zustand'

import { persist, PersistOptions } from 'zustand/middleware'

const BASE_URL = 'http://localhost:3001/api/password/'

interface Password {
    _id: string;
    username: string;
    service: string;
    bookmarked: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface PasswordsState {
    passwords: Password[] | null;
    loading: boolean;
    errorMessage: string | null;
    getPasswords: () => Promise<void>;
}

type MyPersist = (
    config: StateCreator<PasswordsState>,
    options: PersistOptions<PasswordsState>
) => StateCreator<PasswordsState>

const usePasswordsState = create<PasswordsState>(
    (persist as MyPersist)(
        (set) => ({
            passwords: null,
            loading: false,
            errorMessage: null,

            getPasswords: async () => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token
                    const response = await fetch(BASE_URL + 'get-passwords', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch passwords');
                    }

                    const data = await response.json();
                    set({ passwords: data.data, loading: false });
                } catch (error: any) {
                    set({ errorMessage: error.message, loading: false });
                }
            },
        }),
        {
            name: 'passman-passwords-storage', // Unique name for localStorage key
        }
    )
);


export default usePasswordsState;