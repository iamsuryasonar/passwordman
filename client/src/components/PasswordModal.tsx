import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faClose } from "@fortawesome/free-solid-svg-icons";
import MasterKeyModal from "./MasterKeyModal";


interface Props {
    setShowPasswordModal: (arg0: boolean) => void;
    password: any;
}

function PasswordModal(props: Props) {
    const { id, service, username } = props.password;
    const { setShowPasswordModal } = props;

    const [password, setPassword] = useState<string | null>(null);
    const [showMasterKeyModal, setShowMasterKeyModal] = useState<boolean>(false);

    return <div className="absolute inset-0 w-full bg-slate-200">
        <div className="absolute right-0 group bg-red-300 w-10 h-10 place-content-center"
            onClick={() => {
                setShowPasswordModal(false);
            }}
        >
            <FontAwesomeIcon icon={faClose} className="group-hover:text-red-600 place-self-center" />
        </div>
        <div className="p-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>{service}</p>
            <p>{username}</p>
            {
                password ?
                    <p>{password}</p>
                    :
                    <div className="flex flex-row items-center gap-4">
                        <p className="font-semibold text-lg">***********</p>
                        <button className="bg-green-300 px-2 py-1 rounded-md"
                            onClick={() => {
                                setShowMasterKeyModal(true);
                            }
                            }>view</button>
                    </div>
            }
        </div>
        {
            showMasterKeyModal &&
            <MasterKeyModal password={props.password} setPassword={setPassword} setShowMasterKeyModal={setShowMasterKeyModal} />
        }
    </div >
}

export default PasswordModal;
