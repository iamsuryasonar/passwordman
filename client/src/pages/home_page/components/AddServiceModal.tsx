import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClose, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import usePasswordsState from "../../../stores/usePasswordsState";
import { generatePassword, getPasswordStrength } from "../../../utils";
import PasswordStrengthProgress from "../../../components/PasswordStrengthProgress";


interface Props {
    setShowAddServiceModal: (arg0: boolean) => void;
    setActiveMenu: (arg0: string) => void;
}
interface Strength {
    value: number,
    type: string,
    color: string,
}

function AddServiceModal(props: Props) {

    const { setShowAddServiceModal, setActiveMenu } = props;

    const [show, setShow] = useState<boolean>(false);
    const [service, setService] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [masterPassword, setMasterKey] = useState<string>('');

    const [username, setUsername] = useState<string>('');
    const { loading, addService } = usePasswordsState();
    const [passwordStrength, setPasswordStrength] = useState<Strength | null>(null);

    const handleSubmit = async () => {
        addService(service, username, password, masterPassword)
            .then(() => {
                setShowAddServiceModal(false);
                setActiveMenu('All');
            })
    };

    useEffect(() => {
        let strength = getPasswordStrength(password);
        setPasswordStrength(strength);
    }, [password]);

    const handleGeneratePassword = () => {
        let generatedPassword = generatePassword();
        setPassword(generatedPassword);
    }

    return <>
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-900/90p-3 flex flex-col items-center justify-center text-white">
            <div className="p-3">
                <div className="relative p-6 border border-gray-700 rounded-md">
                    <div className="absolute z-50 right-0 top-0 group w-8 aspect-square rounded-tr-md rounded-bl-md bg-red-300 grid cursor-pointer place-content-center"
                        onClick={() => setShowAddServiceModal(false)}>
                        <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl">Add service</p>
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
                                className="w-full border-none bg-transparent text-lg  focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                                <input
                                    type={show ? 'text' : "password"}
                                    placeholder="password"
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
                            <PasswordStrengthProgress passwordStrength={passwordStrength} />
                            <button className="text-white place-self-end text-sm hover:text-green-300 hover:underline" onClick={handleGeneratePassword}>Generate password</button>
                        </div>

                        <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                            <input
                                type={show ? 'text' : "password"}
                                placeholder="master key"
                                className="w-full border-none bg-transparent text-lg focus:outline-none"
                                value={masterPassword}
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
                            onClick={handleSubmit} disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    </>
}
export default AddServiceModal;

