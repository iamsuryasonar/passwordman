import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { SERVICE_BASE_URL } from "../constants/constants";
import { type Service } from '../lib/index';

function filterPasswordsToArray(passwords: any) {
    const allPasswords = passwords.filter((el: any) => el.deleted !== true);
    const deletedPasswords = passwords.filter((el: any) => el.deleted === true);
    const bookmarkedPasswords = passwords.filter((el: any) => el.deleted !== true && el.bookmarked === true);
    return { allPasswords, deletedPasswords, bookmarkedPasswords }
}


interface PasswordsState {
    allPasswords: Service[] | null;
    bookmarkedPasswords: Service[] | null;
    deletedPasswords: Service[] | null;
    loading: boolean;
    passMessage: string | null;
    addService: (arg0: string, arg1: string, arg3: string, arg4: number, arg5: string) => Promise<void>;
    getServices: () => Promise<void>;
    updateBookmarkStatus: (arg0: string, arg1: string) => Promise<void>;
    updateService: (arg0: string, arg1: string, arg3: string, arg4: number, arg5: string, arg6: string) => Promise<void>;
    deletePassword: (arg0: string) => Promise<void>;
    undoDeletePassword: (arg0: string) => Promise<void>;
    permanentlyDeletePassword: (arg0: any) => Promise<void>;
}

type MyPersist = (
    config: StateCreator<PasswordsState>,
    options: PersistOptions<PasswordsState>
) => StateCreator<PasswordsState>

const usePasswordsState = create<PasswordsState>(
    (persist as MyPersist)(
        (set) => ({
            allPasswords: null,
            bookmarkedPasswords: null,
            deletedPasswords: null,
            loading: false,
            passMessage: null,

            addService: async (service: string, username: string, password: string, strength: number, masterPassword: string) => {
                try {
                    set({ loading: true, passMessage: null });
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token
                    const response = await fetch(SERVICE_BASE_URL + 'store-service', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },

                        body: JSON.stringify({ service, username, password, strength, masterPassword }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to save password');
                    }

                    const data = await response.json();
                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                        passMessage: 'Password added successfully!'
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },

            getServices: async () => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token
                    const response = await fetch(SERVICE_BASE_URL + 'get-services', {
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

                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },

            updateBookmarkStatus: async (path: string, id: string) => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token;
                    const response = await fetch(SERVICE_BASE_URL + path + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch passwords');
                    }

                    const data = await response.json();

                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                        passMessage: 'Bookmarked'
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },

            updateService: async (service: string, username: string, password: string, strength: number, masterPassword: string, id: string) => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token
                    const response = await fetch(SERVICE_BASE_URL + `update-service/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },

                        body: JSON.stringify({ service, username, password, strength, masterPassword }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to edit password');
                    }

                    const data = await response.json();
                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                        passMessage: 'Service updated'
                    });

                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },


            deletePassword: async (id: string) => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token;
                    const response = await fetch(SERVICE_BASE_URL + 'delete-service/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch passwords');
                    }

                    const data = await response.json();

                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },

            permanentlyDeletePassword: async (body: any) => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token;
                    const response = await fetch(SERVICE_BASE_URL + 'permanently-delete-service/' + body.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ masterPassword: body.masterPassword }),
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch passwords');
                    }

                    const data = await response.json();

                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                        passMessage: 'Password permanently deleted'
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },

            undoDeletePassword: async (id: string) => {
                set({ loading: true, passMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token;
                    const response = await fetch(SERVICE_BASE_URL + 'undo-deleted-service/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch passwords');
                    }

                    const data = await response.json();

                    const { allPasswords, deletedPasswords, bookmarkedPasswords } = filterPasswordsToArray(data.data);

                    set({
                        allPasswords: allPasswords,
                        deletedPasswords: deletedPasswords,
                        bookmarkedPasswords: bookmarkedPasswords,
                        loading: false,
                    });
                } catch (error: any) {
                    set({ passMessage: error.message, loading: false });
                }
            },
        }),

        {
            name: 'PASSWORDvault-passwords-storage', // Unique name for localStorage key
        }
    )
);


export default usePasswordsState;