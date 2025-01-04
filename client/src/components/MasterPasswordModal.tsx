import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setShowMasterKeyModal: (arg0: boolean) => void;
    onSubmit: (arg0: string) => void;
}

function MasterPasswordModal(props: Props) {
    const { setShowMasterKeyModal, onSubmit } = props;

    const [show, setShow] = useState<boolean>(false);
    const [masterPassword, setMasterKey] = useState<string>('');
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        onSubmit(masterPassword);
        setShowMasterKeyModal(false);
    };

    return <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-900/90 text-white flex justify-center items-center ">
        <div className="p-3">

            <div className="relative z-50 bg-gray-900 w-full p-6 flex flex-col justify-center gap-4 border border-gray-700 rounded-md">
                <div className="absolute z-50 right-0 top-0 group w-8 aspect-square rounded-tr-md rounded-bl-md bg-red-300 grid cursor-pointer place-content-center"
                    onClick={() => {
                        setShowMasterKeyModal(false);
                    }}
                >
                    <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">Decrypt password</p>
                    <div className="w-full flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="Master key"
                            className="w-full bg-transparent text-lg text-white focus:outline-none"
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

                    <button className="bg-green-500 text-white rounded-md px-2 py-1"
                        onClick={
                            handleSubmit
                        }>Submit</button>
                </div>
            </div>
        </div>
    </div >
}

export default MasterPasswordModal;