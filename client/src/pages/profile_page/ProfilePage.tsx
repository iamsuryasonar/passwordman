import { useState } from "react";
import UpdateMasterPasswordModal from './components/UpdateMasterPasswordModal'
import useAuthState from "../../stores/useAuthState";

function ProfilePage() {

    const { user } = useAuthState();

    const [showMasterPasswordModal, setShowMasterpasswordModal] = useState<boolean>(false);

    return <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="p-6 border border-gray-700 rounded-md flex flex-col gap-2">
            <p className="text-lg font-semibold place-self-center">Profile</p>
            <p>{user?.email}</p>
            <button className="border-2 border-gray-700 hover:border-white text-white px-2 py-1 rounded-md"
                onClick={() => setShowMasterpasswordModal(true)}>
                update master password
            </button>
        </div>

        {
            showMasterPasswordModal &&
            <UpdateMasterPasswordModal setShowMasterpasswordModal={setShowMasterpasswordModal} />
        }
    </div>
}

export default ProfilePage;

