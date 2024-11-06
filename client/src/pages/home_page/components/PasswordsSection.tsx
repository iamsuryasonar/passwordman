import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBookmark, faTrash, faCaretUp, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import usePasswordsState from "../../../stores/usePasswordsState";

interface Props1 {
    activeMenu: string;
    passwords: any;
    selectedPassword: number | null;
    decryptedPassword: any;
    bookmarkHandler: (arg0: boolean, arg1: 'string') => void;
    setSelectedPassword: (arg0: number | null) => void;
    setShowEditModal: (arg0: boolean) => void;
    setShowMasterKeyModal: (arg0: boolean) => void;
}

function PasswordsSection(props: Props1) {

    const {
        activeMenu,
        passwords,
        selectedPassword,
        decryptedPassword,
        bookmarkHandler,
        setSelectedPassword,
        setShowEditModal,
        setShowMasterKeyModal,
    } = props;
    const { deletePassword, permanentlyDeletePassword, undoDeletePassword } = usePasswordsState();

    function deleteHandler(id: string) {
        if (activeMenu === 'Trash' && selectedPassword !== null) {
            permanentlyDeletePassword(passwords[selectedPassword]._id);
        } else {
            deletePassword(id);
        }
    }

    function undoDeletehandler(id: string) {
        undoDeletePassword(id);
    }

    return <>
        {
            passwords !== null && passwords.map((service: any, index: any) => {
                return <div
                    className="bg-gray-900 border border-gray-700 hover:border-white text-white p-2 m-2 rounded-md pointer-cursor"
                    key={service._id}
                >
                    <div className="flex justify-between items-center gap-2 py-1">
                        <div className="w-full flex justify-between items-center"
                            onClick={() => {
                                selectedPassword === index ?
                                    setSelectedPassword(null)
                                    :
                                    setSelectedPassword(index);
                            }}>
                            <p className="cursor-pointer">
                                {service.service}
                            </p>
                            <div className="w-8 h-8 rounded-full flex place-content-center cursor-pointer">
                                {
                                    (selectedPassword !== null) && (selectedPassword === index) ?
                                        <FontAwesomeIcon icon={faCaretUp} className="place-self-center cursor-pointer" />
                                        :
                                        <FontAwesomeIcon icon={faCaretDown} className="place-self-center cursor-pointer" />
                                }

                            </div>
                        </div>
                    </div>

                    {
                        (selectedPassword === index) && (selectedPassword !== null) &&
                        <div className="border border-gray-700 rounded-md">
                            <div className="border-b-2 border-gray-700 flex justify-between p-2">
                                <div className="flex gap-2">
                                    {
                                        (activeMenu !== 'Trash') && <>
                                            {
                                                (passwords[selectedPassword].bookmarked === true) ?
                                                    <FontAwesomeIcon icon={faBookmark} className="place-self-center cursor-pointer text-yellow-400"
                                                        onClick={() => {
                                                            bookmarkHandler(passwords[selectedPassword].bookmarked, passwords[selectedPassword]._id);
                                                        }} />
                                                    :
                                                    <FontAwesomeIcon icon={faBookmark} className="place-self-center cursor-pointer text-white"
                                                        onClick={() => {
                                                            bookmarkHandler(passwords[selectedPassword].bookmarked, passwords[selectedPassword]._id);
                                                        }} />
                                            }
                                        </>
                                    }
                                    {
                                        (activeMenu === 'Trash') && <FontAwesomeIcon icon={faTrashRestore} className="place-self-center cursor-pointer text-green-500"
                                            onClick={() => {
                                                undoDeletehandler(passwords[selectedPassword]._id);
                                            }} />
                                    }
                                    <FontAwesomeIcon icon={faTrash} className="place-self-center cursor-pointer text-red-500"
                                        onClick={() => {
                                            deleteHandler(passwords[selectedPassword]._id);
                                        }} />
                                </div>
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
    </>
}

export default PasswordsSection;