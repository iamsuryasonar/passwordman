import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = 'http://localhost:3001/api/password/'

interface Props {
    setShowMasterKeyModal: (arg0: boolean) => void;
    password: any;
    setPassword: (arg0: string) => void;
}

function MasterKeyModal(props: Props) {
    const { setShowMasterKeyModal, setPassword } = props;
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
        const result = await getPassword(props.password._id, masterKey)
        setPassword(result.password);
        setShowMasterKeyModal(false);
    };

    return <div className="absolute inset-0 bg-slate-300">
        <div className="absolute z-50 right-0 group bg-red-300 w-10 h-10 place-content-center"
            onClick={() => {
                setShowMasterKeyModal(false);
            }}
        >
            <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600 place-self-center" />
        </div>
        <div className="absolute inset-0 bg-slate-300 place-content-center">
            <div className="w-4/5 m-auto flex gap-2">
                <div className="w-full flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type={show ? 'text' : "password"}
                        placeholder="Master key"
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

                <button className="bg-green-500 text-white rounded-md px-2 py-1"
                    onClick={
                        handleSubmit
                    }>Submit</button>
            </div>
        </div>
    </div>
}

export default MasterKeyModal;