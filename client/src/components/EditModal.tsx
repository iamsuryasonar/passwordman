import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const BASE_URL = 'http://localhost:3001/api/password/'

interface Props {
    id: string;
    service: string;
    username: string;
    password: string;
    setShowEditModal: (arg0: boolean) => void;
    onUpdate: () => void;
}

function EditModal(props: Props) {

    const [show, setShow] = useState<boolean>(false);
    const [service, setService] = useState<string>(props.service);
    const [password, setPassword] = useState<string>(props.password);
    const [username, setUsername] = useState<string>(props.username);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token
            const response = await fetch(BASE_URL + `update-password/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({ service, username, password }),
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Failed to edit password');
            }

            const data = await response.json();
            props.onUpdate();
            console.log(data);
            setIsLoading(true)

        } catch (error: any) {
            setIsLoading(true)
            console.log(error)
        }
    };

    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4 flex flex-col items-center justify-center bg-green-100 rounded-md ">
        <div className="w-full flex flex-row justify-between">
            <p className="text-2xl">Edit Password</p>
            <div className="group w-8 aspect-square bg-green-400 rounded-full grid cursor-pointer"
                onClick={() => props.setShowEditModal(false)}>
                <FontAwesomeIcon icon={faClose} className="group-hover:text-red-500 place-self-center" />
            </div>
        </div>
        <div className="flex flex-col gap-2">
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
            <button className=" bg-green-500 rounded-md px-2 py-1"
                onClick={handleSubmit} disabled={isLoading}
            >
                Submit
            </button>
        </div>
    </div>

}

export default EditModal;