import usePasswordsState from "../../stores/usePasswordsState";
import { useEffect, useState } from "react";
import EditServiceModal from "./components/EditServiceModal";
import { faBookmark, faVault, faTrash } from "@fortawesome/free-solid-svg-icons";
import MasterKeyModal from "../../components/MasterKeyModal";
import SideBarMenuItem from "./components/SideBarMenuItem";
import SearchSection from "./components/SearchSection";
import PasswordsSection from "./components/PasswordsSection";

function HomePage() {
    const { allPasswords, bookmarkedPasswords, deletedPasswords, errorMessage, getPasswords, updateBookmarkStatus } = usePasswordsState();
    const [selectedPassword, setSelectedPassword] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showMasterKeyModal, setShowMasterKeyModal] = useState<boolean>(false);
    const [decryptedPassword, setDecryptedPassword] = useState<any | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string>('All');

    let activePasswords: any;

    if (activeMenu === 'All') {
        activePasswords = allPasswords;
    } else if (activeMenu === 'Bookmarked') {
        activePasswords = bookmarkedPasswords;
    } else if (activeMenu === 'Trash') {
        activePasswords = deletedPasswords;
    }

    async function bookmarkHandler(bookmarkStatus: boolean, id: string) {
        let path;
        if (bookmarkStatus === false) {
            // bookmark
            path = 'bookmark-password/';
        } else {
            // unmark
            path = 'undo-bookmark-password/';
        }

        updateBookmarkStatus(path, id);
    }

    useEffect(() => {
        getPasswords();
    }, [])

    return <div className="w-full flex relative gap-2 text-white">
        <aside className="fixed top-[60px] bottom-0 w-[60px] sm:w-[200px] min-h-screen px-3 flex flex-col items-center sm:items-stretch gap-2">
            <SideBarMenuItem title={'All'} icon={faVault} color={'lightgreen'} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <SideBarMenuItem title={'Bookmarked'} icon={faBookmark} color={'yellow'} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <SideBarMenuItem title={'Trash'} icon={faTrash} color={'red'} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </aside>

        <div className="relative sm:ml-[210px] ml-[60px] mr-3 mb-3 w-full p-2 rounded-md flex flex-col border border-1 border-gray-700">
            <div className="p-2 mb-4 flex gap-2 justify-between">
                <SearchSection searchText={searchText} setSearchText={setSearchText} />
            </div>
            <PasswordsSection
                activeMenu={activeMenu}
                passwords={activePasswords}
                selectedPassword={selectedPassword}
                decryptedPassword={decryptedPassword}
                setSelectedPassword={setSelectedPassword}
                bookmarkHandler={bookmarkHandler}
                setShowEditModal={setShowEditModal}
                setShowMasterKeyModal={setShowMasterKeyModal}
            />

            {
                showMasterKeyModal && allPasswords && selectedPassword !== null &&
                <MasterKeyModal passwordId={allPasswords[selectedPassword]._id} setDecryptedPassword={setDecryptedPassword} setShowMasterKeyModal={setShowMasterKeyModal} />
            }

            {
                showEditModal && allPasswords && selectedPassword !== null &&
                <EditServiceModal password={allPasswords[selectedPassword]} setShowEditModal={setShowEditModal} onUpdate={() => { }} />
            }

        </div >
    </div >
}

export default HomePage;

