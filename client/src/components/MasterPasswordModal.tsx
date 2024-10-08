import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:3001/api/password/'

interface Props {
    id: string;
    setShowMasterPasswordModal: (arg0: boolean) => void;
}

function MasterPasswordModal(props: Props) {

    const [show, setShow] = useState<boolean>(false);
    const [masterKey, setMasterKey] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

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
        const password = await getPassword(props.id, masterKey)
        if (password) {
            navigate('/view-password', { state: password })
        } else {
            alert('Incorrect master password, try again!!!');
        }
    };

    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4 flex flex-col items-center justify-center gap-4 bg-green-100 rounded-md ">
        <div className="w-full flex flex-row justify-between">
            <p className="text-2xl">Enter Master Password</p>
            <div className="group w-8 aspect-square bg-green-400 rounded-full grid cursor-pointer"
                onClick={() => props.setShowMasterPasswordModal(false)}>
                <FontAwesomeIcon icon={faClose} className="group-hover:text-red-500 place-self-center" />
            </div>
        </div>

        <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
            <input
                type={show ? 'text' : "password"}
                placeholder="password"
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
        <button className=" bg-green-500 rounded-md px-2 py-1"
            onClick={handleSubmit} disabled={isLoading}
        >
            Submit
        </button>
    </div >

}

export default MasterPasswordModal;