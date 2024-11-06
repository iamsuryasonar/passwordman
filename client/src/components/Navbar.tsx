import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import useAuthState from "../stores/useAuthState";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
    const { user, login, logout, isLoggedIn, isLoading, error } = useAuthState();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
    }

    return <>
        {
            isLoggedIn ?
                <nav className="z-50 sticky top-0 right-0 left-0 px-3 m-auto h-[60px] bg-gray-900 flex justify-between items-center">
                    <div className="max-w-[1240px] m-auto w-full flex justify-between items-center text-white">
                        <Link to="/home" className="text-lg font-bold">PassMan</Link>
                        <div className="flex gap-2" onClick={() => {
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
                            <div className="absolute p-10 flex flex-col items-center gap-4 bg-gray-800 right-0 top-[50px] z-50">
                                <button onClick={() => {
                                    handleLogout();
                                    setShowMenu(false);
                                }} className="border border-gray-700 rounded-md px-2 py-1">LogOut</button>
                                <button className="border border-gray-700 rounded-md px-2 py-1"
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowMenu(false)
                                    }}>
                                    Profile
                                </button>
                            </div>
                        }
                    </div>
                </nav>
                :
                <nav className="flex justify-between">
                    <p>PassMan</p>
                </nav>
        }
    </>
}

export default Navbar;