import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = 'http://localhost:3001/api/password/'

interface Props {
    setShowMasterKeyModal: (arg0: boolean) => void;
    passwordId: string;
    setDecryptedPassword: (arg0: any) => void;
}

function MasterKeyModal(props: Props) {
    const { setShowMasterKeyModal, setDecryptedPassword, passwordId } = props;
    const [show, setShow] = useState<boolean>(false);
    const [masterKey, setMasterKey] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPassword = async (id: string, masterKey: string) => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
            const response = await fetch(BASE_URL + 'get-password/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ masterKey }),
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Could not fetch passwords');
            }

            const res = await response.json();
            return res.data;
        } catch (error: any) {
            setIsLoading(false)
            return null;
        }
    }

    const handleSubmit = async () => {
        const result = await getPassword(passwordId, masterKey)
        setDecryptedPassword(result);
        setShowMasterKeyModal(false);
    };

    return <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-900/90 text-white flex justify-center items-center ">
        <div>
            <div className="absolute z-50 right-0 top-0 group w-10 aspect-square bg-red-300 grid cursor-pointer place-content-center"
                onClick={() => {
                    setShowMasterKeyModal(false);
                }}
            >
                <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600" />
            </div>
            <div className="z-50 bg-gray-900 w-full m-6 p-6 flex flex-col justify-center gap-4 border border-gray-700 rounded-md">
                <div className="flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="Master key"
                            className="w-full bg-transparent text-lg text-white focus:outline-none"
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

                    <button className="bg-green-500 text-white rounded-md px-2 py-1"
                        onClick={
                            handleSubmit
                        }>Submit</button>
                </div>
            </div>
        </div>
    </div >
}

export default MasterKeyModal;