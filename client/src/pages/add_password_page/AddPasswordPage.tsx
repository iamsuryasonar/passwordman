import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:3001/api/password/'

function AddPasswordPage() {
    const [show, setShow] = useState<boolean>(false);
    const [service, setService] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [masterKey, setMasterKey] = useState<string>('');

    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token
            const response = await fetch(BASE_URL + 'store-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({ service, username, password, masterKey }),
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Failed to save password');
            }

            const data = await response.json();
            console.log(data);
            navigate('/home')
            setIsLoading(true)

        } catch (error: any) {
            setIsLoading(true)
            console.log(error)
        }
    };

    return <>
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl">Add Password</p>
            <div className="bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type='text'
                        placeholder="Website"
                        className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                        value={service}
                        onChange={(e) => setService(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type='text'
                        placeholder="username"
                        className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type={show ? 'text' : "password"}
                        placeholder="password"
                        className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        placeholder="master key"
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
            </div>
        </div>
    </>
}
export default AddPasswordPage;