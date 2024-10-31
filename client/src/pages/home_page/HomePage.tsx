import usePasswordsState from "../../stores/usePasswordsState";
import useAuthState from "../../stores/useAuthState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPasswordModal from "./components/EditPasswordModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBookmark, faAdd, faMagnifyingGlass, faVault, faTrash, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import MasterKeyModal from "../../components/MasterKeyModal";

function HomePage() {
    const { passwords, errorMessage, getPasswords } = usePasswordsState();
    const { user, login, logout, isLoggedIn, isLoading } = useAuthState();
    const [selectedPassword, setSelectedPassword] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showMasterKeyModal, setShowMasterKeyModal] = useState<boolean>(false);
    const [decryptedPassword, setDecryptedPassword] = useState<any | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
    }

    useEffect(() => {
        getPasswords();
    }, [])

    return <div className="w-full flex relative gap-2 text-white">
        <aside className="fixed top-[60px] bottom-0 w-[60px] sm:w-[200px] min-h-screen px-3 flex flex-col items-center sm:items-stretch gap-2">
            <div className="flex gap-2 cursor-pointer p-2 border border-1 border-gray-700 hover:border-white rounded-md">
                <FontAwesomeIcon icon={faVault} className="w-6 place-self-center cursor-pointer text-purple-500" />
                <p className="hidden sm:block">All</p>
            </div>
            <div className="flex gap-2 cursor-pointer p-2 border border-1 border-gray-700 hover:border-white rounded-md">
                <FontAwesomeIcon icon={faBookmark} className="w-6 place-self-center cursor-pointer text-green-400" />
                <p className="hidden sm:block">Bookmarked</p>
            </div>
            <div className="flex gap-2 cursor-pointer p-2 border border-1 border-gray-700 hover:border-white rounded-md">
                <FontAwesomeIcon icon={faTrash} className="w-6 place-self-center cursor-pointer text-red-500" />
                <p className="hidden sm:block">Trash</p>
            </div>
        </aside>

        <div className="relative sm:ml-[210px] ml-[60px] mr-3 mb-3 w-full p-2 rounded-md flex flex-col border border-1 border-gray-700">
            <div className="p-2 mb-4 flex gap-2 justify-between">
                <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type='text'
                        placeholder="Search"
                        className="w-full border-none bg-transparent text-lg focus:outline-none"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {/*todo : debounce search , no need of a button to search */}
                </div>
                <div className="bg-purple-600 hover:bg-purple-700 rounded-md px-3 py-1 flex items-center gap-2 text-nowrap cursor-pointer"
                    onClick={() => {
                        navigate('/add-password')
                    }}>
                    <FontAwesomeIcon icon={faAdd} />
                    <p>Add New</p>
                </div>
            </div>
            {
                passwords && passwords.map((service, index) => {
                    return <div
                        className="bg-gray-900 border border-gray-700 hover:border-white text-white p-2 m-2 rounded-md pointer-cursor"
                        key={service._id}
                    >
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-full flex justify-between">
                                <p className="cursor-pointer py-2"
                                    onClick={() => {
                                        setSelectedPassword(index);
                                    }}>
                                    {service.service}
                                </p>
                                <div className="w-8 h-8 rounded-full flex place-content-center cursor-pointer"
                                    onClick={() => {
                                        selectedPassword === index ?
                                            setSelectedPassword(null)
                                            :
                                            setSelectedPassword(index);
                                    }}>
                                    {
                                        selectedPassword !== null && selectedPassword === index ?
                                            <FontAwesomeIcon icon={faCaretUp} className="place-self-center cursor-pointer" />
                                            :
                                            <FontAwesomeIcon icon={faCaretDown} className="place-self-center cursor-pointer" />
                                    }

                                </div>
                            </div>
                        </div>

                        {
                            selectedPassword === index &&
                            <div className="border border-gray-700 rounded-md">
                                <div className="border-b-2 border-gray-700 flex justify-between p-2">
                                    <FontAwesomeIcon icon={faBookmark} className="place-self-center cursor-pointer" />
                                    <button className="border border-gray-700 hover:border-white rounded-md px-4 py-1"
                                        onClick={() => {
                                            setShowEditModal(true);
                                        }}>Edit</button>
                                </div>
                                <div className="p-2">
                                    <div className="flex gap-2 justify-between">
                                        <p>{passwords[selectedPassword].service}</p>
                                    </div>
                                    <div className="flex gap-2 justify-between">
                                        <p>{passwords[selectedPassword].username}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-4">

                                        {
                                            (decryptedPassword !== null && service._id === decryptedPassword._id) ?
                                                <p className="font-semibold text-lg">{decryptedPassword.password}</p>
                                                :
                                                <p className="font-semibold text-lg">***********</p>
                                        }
                                        <button className="border-2 border-gray-700 hover:border-white px-2 py-1 rounded-md"
                                            onClick={() => {
                                                setShowMasterKeyModal(true);
                                            }}
                                        >
                                            Decrypt
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                })
            }

            {
                showMasterKeyModal && passwords && selectedPassword !== null &&
                <MasterKeyModal passwordId={passwords[selectedPassword]._id} setDecryptedPassword={setDecryptedPassword} setShowMasterKeyModal={setShowMasterKeyModal} />
            }

            {
                showEditModal && passwords && selectedPassword !== null &&
                <EditPasswordModal password={passwords[selectedPassword]} setShowEditModal={setShowEditModal} onUpdate={() => { }} />
            }

        </div >
    </div >
}

export default HomePage;
