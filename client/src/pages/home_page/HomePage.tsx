import usePasswordsState from "../../stores/usePasswordsState";
import useAuthState from "../../stores/useAuthState";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PasswordModal from "../../components/PasswordModal";
import EditModal from "../../components/EditModal";

function HomePage() {
    const { passwords, errorMessage, getPasswords } = usePasswordsState();
    const { user, login, logout, isLoggedIn, isLoading, } = useAuthState();
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [selectedPassword, setSelectedPassword] = useState<number>(0);
    const [showEditModal, setShowEditModal] = useState<boolean>(false)

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
            <button onClick={() => {
                navigate('/profile')
            }} className="bg-green-400 px-2 py-1 m-2">Profile</button>
            <p>List of passwords</p>
            {
                passwords && passwords.map((password, index) => {
                    return <div
                        className="bg-slate-200 p-2 m-2 rounded-md pointer-cursor"
                        key={password._id}
                    >
                        <div className="flex justify-between items-center">
                            <p className="cursor-pointer"
                                onClick={() => {
                                    setShowPasswordModal(true);
                                    setSelectedPassword(index);
                                }}>
                                {password.service}
                            </p>
                            <button className="bg-green-400 px-2 py-1 rounded-md"
                                onClick={() => {
                                    setSelectedPassword(index);
                                    setShowEditModal(true);
                                }}>
                                edit
                            </button>
                        </div>
                    </div>
                })
            }
            {
                showPasswordModal && passwords &&
                <PasswordModal password={passwords[selectedPassword]} setShowPasswordModal={setShowPasswordModal} />
            }

            {
                showEditModal && passwords &&
                <EditModal password={passwords[selectedPassword]} setShowEditModal={setShowEditModal} onUpdate={() => { }} />
            }

        </div>
    </>
}

export default HomePage;
