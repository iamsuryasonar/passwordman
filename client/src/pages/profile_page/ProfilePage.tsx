import { useState } from "react";
import UpdateMasterPasswordModal from './components/UpdateMasterPasswordModal'

function ProfilePage() {

    const [showMasterPasswordModal, setShowMasterpasswordModal] = useState<boolean>(false);

    return <div className="relative w-full">
        <button className="bg-green-500 text-white px-2 py-1 rounded-md"
            onClick={() => setShowMasterpasswordModal(true)}>
            update master password
        </button>

        {
            showMasterPasswordModal &&
            <UpdateMasterPasswordModal setShowMasterpasswordModal={setShowMasterpasswordModal} />
        }
    </div>
}

export default ProfilePage;

