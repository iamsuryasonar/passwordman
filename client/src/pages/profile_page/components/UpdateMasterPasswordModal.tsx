import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";
import { PROFILE_BASE_URL } from "../../../constants/constants";

interface Props {
    setShowMasterpasswordModal: (arg0: boolean) => void;
}

function UpdateMasterPasswordModal(props: Props) {

    const { setShowMasterpasswordModal } = props;
    const [show, setShow] = useState<boolean>(false);
    const [masterKey, setMasterKey] = useState<string>('');
    const [newMasterKey, setNewMasterKey] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateMasterPassword = async (masterKey: string, newMasterKey: string) => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
            const response = await fetch(PROFILE_BASE_URL + 'update-master-key', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ masterKey, newMasterKey }),
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Could not fetch passwords');
            }

            const res = await response.json();
            console.log(res)
            return res.data;
        } catch (error: any) {
            setIsLoading(false)
            return null;
        }
    }

    async function handleUpdateMasterPassword() {
        await updateMasterPassword(masterKey, newMasterKey);
    }

    return <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-900/90p-3 flex flex-col items-center justify-center text-white">
        <div className="p-3">
            <div className="relative p-6 border border-gray-700 rounded-md">
                <div className="absolute z-50 right-0 top-0 group w-8 aspect-square rounded-tr-md rounded-bl-md bg-red-300 grid cursor-pointer place-content-center"
                    onClick={() => {
                        setShowMasterpasswordModal(false);
                    }}
                >
                    <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600 place-self-center" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">Update master password</p>
                    <div className="flex items-center gap-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="old master password"
                            className="w-full border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                            value={masterKey}
                            onChange={(e) => setMasterKey(e.target.value)}
                        />

                        <button className="block" onClick={() => setShow(!show)}>
                            <div>
                                {show ? <FontAwesomeIcon icon={faEye} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                }
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="new master password"
                            className="w-full border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                            value={newMasterKey}
                            onChange={(e) => setNewMasterKey(e.target.value)}
                        />

                        <button className="block" onClick={() => setShow(!show)}>
                            <div>
                                {show ? <FontAwesomeIcon icon={faEye} />
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                }
                            </div>
                        </button>
                    </div>
                    <button className="bg-green-400 text-white px-2 py-1 rounded-md"
                        onClick={() => { handleUpdateMasterPassword() }}>
                        update
                    </button>
                </div>

            </div>
        </div>
    </div>
}

export default UpdateMasterPasswordModal;
