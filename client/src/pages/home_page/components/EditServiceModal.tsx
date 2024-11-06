import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import usePasswordsState from '../../../stores/usePasswordsState';

interface Props {
    password: any;
    setShowEditModal: (arg0: boolean) => void;
    onUpdate: () => void;
}

function EditServiceModal(props: Props) {

    const { loading, updateService } = usePasswordsState();

    const [show, setShow] = useState<boolean>(false);
    const [service, setService] = useState<string>(props.password.service);
    const [password, setPassword] = useState<string>(props.password.password);
    const [username, setUsername] = useState<string>(props.password.username);
    const [masterKey, setMasterKey] = useState<string>('');

    const handleSubmit = async () => {
        updateService(service, username, password, masterKey, props.password._id)
            .then(() => {
                props.setShowEditModal(false);
            })
    };

    return <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-900/90 text-white flex justify-center items-center ">
        <div className="p-3">

            <div className="relative z-50 bg-gray-900 w-full p-6 flex flex-col justify-center gap-4 border border-gray-700 rounded-md ">
                <div className="absolute z-50 right-0 top-0 group w-8 aspect-square rounded-tr-md rounded-bl-md bg-red-300 grid cursor-pointer place-content-center"
                    onClick={() => props.setShowEditModal(false)}>
                    <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600" />
                </div>
                <p className="text-2xl">Edit Password</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type='text'
                            placeholder="Website"
                            className="w-full border-none bg-transparent text-lg focus:outline-none"
                            value={service}
                            onChange={(e) => setService(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type='text'
                            placeholder="username"
                            className="w-full border-none bg-transparent text-lg focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="Enter new password"
                            className="w-full border-none bg-transparent text-lg focus:outline-none"
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
                    <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="Enter Master Password"
                            className="w-full border-none bg-transparent text-lg focus:outline-none"
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
                    <button className=" bg-green-500 rounded-md px-2 py-1 cursor-pointer"
                        onClick={handleSubmit} disabled={loading}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>

}

export default EditServiceModal;