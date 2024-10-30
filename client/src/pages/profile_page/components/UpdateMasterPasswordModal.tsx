import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";


const BASE_URL = 'http://localhost:3001/api/profile/'


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
            const response = await fetch(BASE_URL + 'update-master-key', {
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

    return <div className="absolute inset-0 bg-slate-200">
        <div className="absolute z-50 right-0 group bg-red-300 w-10 h-10 place-content-center"
            onClick={() => {
                setShowMasterpasswordModal(false);
            }}
        >
            <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600 place-self-center" />
        </div>

        <div className="absolute w-4/5 m-auto inset-0 place-content-center flex flex-col gap-4">
            <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                <input
                    type={show ? 'text' : "password"}
                    placeholder="master password"
                    className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
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
            <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                <input
                    type={show ? 'text' : "password"}
                    placeholder="new master password"
                    className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
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
}

export default UpdateMasterPasswordModal;
