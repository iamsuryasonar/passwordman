import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { PASSWORD_BASE_URL } from "../constants/constants";

function filterPasswordsToArray(passwords: any) {
    const allPasswords = passwords.filter((el: any) => el.deleted !== true);
    const deletedPasswords = passwords.filter((el: any) => el.deleted === true);
    const bookmarkedPasswords = passwords.filter((el: any) => el.deleted !== true && el.bookmarked === true);
    return { allPasswords, deletedPasswords, bookmarkedPasswords }
}

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
    allPasswords: Password[] | null;
    bookmarkedPasswords: Password[] | null;
    deletedPasswords: Password[] | null;
    loading: boolean;
    errorMessage: string | null;
    getPasswords: () => Promise<void>;
    updateBookmarkStatus: (arg0: string, arg1: string) => Promise<void>;
    updateService: (arg0: string, arg1: string, arg3: string, arg4: string, arg5: string) => Promise<void>;
    deletePassword: (arg0: string) => Promise<void>;
    undoDeletePassword: (arg0: string) => Promise<void>;
    permanentlyDeletePassword: (arg0: string) => Promise<void>;
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
            errorMessage: null,

            getPasswords: async () => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token
                    const response = await fetch(PASSWORD_BASE_URL + 'get-passwords', {
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
                        loading: false
                    });
                } catch (error: any) {
                    set({ errorMessage: error.message, loading: false });
                }
            },

            updateBookmarkStatus: async (path: string, id: string) => {
                set({ loading: true, errorMessage: null });


                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
                    const response = await fetch(PASSWORD_BASE_URL + path + id, {
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
                    set({ errorMessage: error.message, loading: false });
                }
            },

            updateService: async (service: string, username: string, password: string, masterKey: string, id: string) => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token
                    const response = await fetch(PASSWORD_BASE_URL + `update-password/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },

                        body: JSON.stringify({ service, username, password, masterKey }),
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
                    });

                } catch (error: any) {
                    set({ errorMessage: error.message, loading: false });
                }
            },


            deletePassword: async (id: string) => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
                    const response = await fetch(PASSWORD_BASE_URL + 'delete-password/' + id, {
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
                    set({ errorMessage: error.message, loading: false });
                }
            },

            permanentlyDeletePassword: async (id: string) => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
                    const response = await fetch(PASSWORD_BASE_URL + 'permanently-delete-password/' + id, {
                        method: 'DELETE',
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
                    set({ errorMessage: error.message, loading: false });
                }
            },

            undoDeletePassword: async (id: string) => {
                set({ loading: true, errorMessage: null });

                try {
                    const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
                    const response = await fetch(PASSWORD_BASE_URL + 'undo-deleted-password/' + id, {
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