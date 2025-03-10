import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBookmark, faTrash, faCaretUp, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import usePasswordsState from "../../../stores/usePasswordsState";
import { useState } from "react";
import { SERVICE_BASE_URL } from "../../../constants/constants";
import MasterKeyModal from '../../../components/MasterPasswordModal'
import PasswordStrengthProgress from "../../../components/PasswordStrengthProgress";
import { type Service } from '../../../lib/index';

interface Props1 {
    activeMenu: string;
    passwords: Service[];
    selectedPassword: number | null;
    bookmarkHandler: (arg0: boolean, arg1: string) => void;
    setSelectedPassword: (arg0: number | null) => void;
    setShowEditModal: (arg0: boolean) => void;
}

function PasswordSections(props: Props1) {

    const {
        activeMenu,
        passwords,
        selectedPassword,
        bookmarkHandler,
        setSelectedPassword,
        setShowEditModal,
    } = props;

    const [decryptedPassword, setDecryptedPassword] = useState<any | null>(null);
    const [showMasterKeyModalToShowPassword, setShowMasterKeyModalToShowPassword] = useState<boolean>(false);
    const [showMasterKeyModalToDeletePassword, setShowMasterKeyModalToDeletePassword] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { deletePassword, permanentlyDeletePassword, undoDeletePassword } = usePasswordsState();

    function deleteHandler(id: string) {
        if (activeMenu === 'Trash' && selectedPassword !== null) {
            setShowMasterKeyModalToDeletePassword(true);
        } else {
            deletePassword(id);
        }
    }

    function undoDeletehandler(id: string) {
        undoDeletePassword(id);
    }

    async function copyToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.log(err);
        }
    }

    const getPassword = async (id: string, masterPassword: string) => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('PASSWORDvault-auth-storage')!).state.user.token;
            const response = await fetch(SERVICE_BASE_URL + 'get-service/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ masterPassword }),
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Could not fetch passwords');
            }

            const res = await response.json();
            return res.data;
        } catch (error: any) {
            return null;
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmitHandlerToShowPassword(masterPassword: string) {
        if (passwords && selectedPassword !== null) {
            let result = await getPassword(passwords[selectedPassword]._id, masterPassword);
            setDecryptedPassword(result)
        }
    }

    function onSubmitHandlerToDeletePassword(masterPassword: string) {
        if (passwords && selectedPassword !== null) {
            permanentlyDeletePassword({ id: passwords[selectedPassword]._id, masterPassword });
        }
    }

    return <>
        {
            passwords && passwords !== null && passwords.map((service: any, index: any) => {
                return <div
                    className="bg-gray-900 border border-gray-700 hover:border-white text-white p-2 m-2 rounded-md pointer-cursor"
                    key={service._id}
                >
                    <div className="flex justify-between items-center gap-2 py-1">
                        <div className="w-full flex justify-between items-center cursor-pointer"
                            onClick={() => {
                                selectedPassword === index ?
                                    setSelectedPassword(null)
                                    :
                                    setSelectedPassword(index);
                            }}>
                            <p className="">
                                {service.service}
                            </p>
                            <div className="w-8 h-8 rounded-full flex place-content-center">
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
                                <div className="flex gap-2 items-center">
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
                                    <p className="text-gray-700">•</p>
                                    <FontAwesomeIcon icon={faTrash} className="place-self-center cursor-pointer text-red-500"
                                        onClick={() => {
                                            deleteHandler(passwords[selectedPassword]._id);
                                        }} />
                                </div>
                                <button className="border border-gray-700 hover:border-white rounded-md px-5 py-1 text-center"
                                    onClick={() => {
                                        setShowEditModal(true);
                                    }}>Edit</button>
                            </div>
                            <div className="p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <p>username: </p><p>{passwords[selectedPassword].username}</p>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p>password:</p>
                                    {
                                        (decryptedPassword !== null && service._id === decryptedPassword._id) ?
                                            <button className=""
                                                onClick={() => {
                                                    copyToClipboard(decryptedPassword.password);
                                                }}>{decryptedPassword.password}</button>
                                            :
                                            <button className="font-semibold text-xl text-slate-600"
                                                onClick={() => {
                                                    setShowMasterKeyModalToShowPassword(true);
                                                }}>••••••••</button>
                                    }
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p>strength:</p>
                                    <PasswordStrengthProgress strength={passwords[selectedPassword].strength} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            })
        }
        {
            showMasterKeyModalToShowPassword &&
            <MasterKeyModal onSubmit={onSubmitHandlerToShowPassword} setShowMasterKeyModal={setShowMasterKeyModalToShowPassword} />
        }
        {
            showMasterKeyModalToDeletePassword &&
            <MasterKeyModal onSubmit={onSubmitHandlerToDeletePassword} setShowMasterKeyModal={setShowMasterKeyModalToDeletePassword} />
        }
    </>
}

export default PasswordSections;