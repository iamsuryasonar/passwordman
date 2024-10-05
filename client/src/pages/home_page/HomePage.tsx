import usePasswordsState from "../../stores/usePasswordsState";
import useAuthState from "../../stores/useAuthState";
import { useEffect, useState } from "react";
import usePasswordState from "../../stores/usePasswordState";

function HomePage() {
    const { passwords, errorMessage, getPasswords } = usePasswordsState();
    const { user, login, logout, isLoggedIn, isLoading, } = useAuthState();
    const [error, setError] = useState<string | null>(null);
    const { password, getPassword } = usePasswordState();

    async function handleLogout() {
        await logout();
    }

    useEffect(() => {
        getPasswords();
    }, [])

    return <>
        <div className="flex flex-col">
            <p>
                HomePage
            </p>
            <button onClick={handleLogout} className="bg-green-400 px-2 py-1">LogOut</button>
            {
                passwords && passwords.map((password) => {
                    return <p
                        className="cursor-pointer"
                        key={password._id}
                        onClick={() => { getPassword(password._id) }}>
                        {password.service}
                    </p>
                })
            }

            {
                password && <div>
                    <p>{password.service}</p>
                    <p>{password.username}</p>
                    <p>{password.password}</p>
                    <p>{password.createdAt}</p>
                    <p>{password.updatedAt}</p>
                </div>
            }
        </div>
    </>
}

export default HomePage;