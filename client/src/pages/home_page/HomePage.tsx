import usePasswordsState from "../../stores/usePasswordsState";
import useAuthState from "../../stores/useAuthState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../../components/PasswordModal";

function HomePage() {
    const { passwords, errorMessage, getPasswords } = usePasswordsState();
    const { user, login, logout, isLoggedIn, isLoading, } = useAuthState();
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [selectedPassword, setSelectedPassword] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
    }

    useEffect(() => {
        getPasswords();
    }, [])

    return <>
        <div className="w-full flex flex-col relative">
            <p>
                HomePage
            </p>
            <button onClick={handleLogout} className="bg-green-400 px-2 py-1 m-2">LogOut</button>
            <button onClick={() => {
                navigate('/add-password')
            }} className="bg-green-400 px-2 py-1 m-2">Add password</button>
            <p>List of passwords</p>
            {
                passwords && passwords.map((password, index) => {
                    return <div
                        className="bg-slate-200 p-2 m-2 rounded-md pointer-cursor"
                        key={password._id}
                        onClick={() => {
                            setShowPasswordModal(true);
                            setSelectedPassword(index);
                        }}
                    >
                        <p className="cursor-pointer">
                            {password.service}
                        </p>
                    </div>
                })
            }
            {
                showPasswordModal && passwords &&
                <PasswordModal password={passwords[selectedPassword]} setShowPasswordModal={setShowPasswordModal} />
            }

        </div>
    </>
}

export default HomePage;
