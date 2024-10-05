import { create } from 'zustand'

const BASE_URL = 'http://localhost:3001/api/password/'

interface Password {
    _id: string;
    username: string;
    service: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

interface PasswordsState {
    password: Password | null;
    loading: boolean;
    errorMessage: string | null;
    getPassword: (id: string) => Promise<void>;
}

const usePasswordState = create<PasswordsState>(

    (set) => ({
        password: null,
        loading: false,
        errorMessage: null,

        getPassword: async (id) => {
            set({ loading: true, errorMessage: null });

            try {
                const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
                const response = await fetch(BASE_URL + 'get-password/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Could not fetch passwords');
                }

                const data = await response.json();
                set({ password: data.data, loading: false });
            } catch (error: any) {
                set({ errorMessage: error.message, loading: false });
            }
        },
    })
);


export default usePasswordState;