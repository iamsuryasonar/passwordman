import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import useAuthState from "../stores/useAuthState";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function Navbar() {
    const { user, logout, isLoggedIn } = useAuthState();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
    }

    return <>
        <nav className="z-50 border-b-[1px] border-slate-700 sticky top-0 right-0 left-0 px-3 m-auto h-[60px] bg-gray-900 flex flex-col justify-between items-center">
            {
                isLoggedIn ?
                    <div className="max-w-[1240px] m-auto w-full flex justify-between items-center text-white">
                        <Link to="/" className="text-lg font-bold">PASSWORDvault</Link>
                        <div className="flex gap-2 cursor-pointer" onClick={() => {
                            setShowMenu(!showMenu)
                        }}>
                            <p className="text-gray-400 text-sm">{user!.email}</p>
                            {
                                showMenu === false ?
                                    <FontAwesomeIcon icon={faCaretDown} className="place-self-center cursor-pointer" />
                                    :
                                    <FontAwesomeIcon icon={faCaretUp} className="place-self-center cursor-pointer" />
                            }
                        </div>
                        {
                            showMenu &&
                            <div className="absolute p-10 flex flex-col items-center gap-4 bg-gray-800 right-0 top-[58px] z-50">
                                <button className="border border-gray-700 rounded-md px-2 py-1 hover:border-white"
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowMenu(false);
                                    }}>
                                    Profile
                                </button>

                                <button onClick={() => {
                                    handleLogout();
                                    setShowMenu(false);
                                }} className="border border-gray-700 rounded-md px-2 py-1 hover:border-white">
                                    LogOut
                                </button>
                            </div>
                        }
                    </div>
                    :
                    <div className="max-w-[1240px] m-auto w-full flex justify-between items-center text-white">
                        <Link to="/" className="text-lg font-bold">PASSWORDvault</Link>
                        <div className="flex gap-2">
                            <button onClick={() => {
                                navigate('/login')
                            }} className="border border-gray-700 rounded-md px-2 py-1 hover:border-white">
                                Log In
                            </button>
                            <button onClick={() => {
                                navigate('/register')
                            }} className="border border-gray-700 rounded-md px-2 py-1 hover:border-white">
                                Register
                            </button>
                        </div>
                    </div>
            }
        </nav >
    </>
}

export default Navbar;