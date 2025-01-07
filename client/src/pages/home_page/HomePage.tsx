import usePasswordsState from "../../stores/usePasswordsState";
import { useEffect, useState } from "react";
import EditServiceModal from "./components/EditServiceModal";
import { faBookmark, faVault, faTrash } from "@fortawesome/free-solid-svg-icons";
import SideBarMenuItem from "./components/SideBarMenuItem";
import SearchSection from "./components/SearchSection";
import PasswordSections from "./components/PasswordSections";
import AddServiceModal from "./components/AddServiceModal";

function HomePage() {
    const { allPasswords, bookmarkedPasswords, deletedPasswords, getServices, updateBookmarkStatus } = usePasswordsState();
    const [selectedPassword, setSelectedPassword] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false)

    const [searchText, setSearchText] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string>('All');
    const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);

    let allActivePasswords: any;
    let searchedActivePasswords: any;

    if (activeMenu === 'All') {
        allActivePasswords = allPasswords;
    } else if (activeMenu === 'Bookmarked') {
        allActivePasswords = bookmarkedPasswords;
    } else if (activeMenu === 'Trash') {
        allActivePasswords = deletedPasswords;
    }

    function regexMatchSearchkeyword(searchText: string) {
        const pattern = new RegExp(searchText, 'i');
        return allActivePasswords.filter((el: any) => pattern.test(el.service));
    }

    if (searchText.length > 0) {
        searchedActivePasswords = regexMatchSearchkeyword(searchText);
    }

    useEffect(() => {
        getServices();
    }, []);

    async function bookmarkHandler(bookmarkStatus: boolean, id: string) {
        let path;
        if (bookmarkStatus === false) {
            // bookmark
            path = 'bookmark-service/';
        } else {
            // unmark
            path = 'undo-bookmark-service/';
        }

        updateBookmarkStatus(path, id);
    }

    function activeMenuHandler(menu: string) {
        setActiveMenu(menu);
        setSearchText('');
    }

    return <div className="w-full flex relative gap-2 text-white">
        <aside className="py-2 sm:py-4 fixed top-[60px] bottom-0 w-[40px] sm:w-[200px] min-h-screen pr-2 sm:pr-3 flex flex-col items-center sm:items-stretch gap-2">
            <SideBarMenuItem title={'All'} icon={faVault} color={'lightgreen'} activeMenu={activeMenu} setActiveMenu={activeMenuHandler} />
            <SideBarMenuItem title={'Bookmarked'} icon={faBookmark} color={'yellow'} activeMenu={activeMenu} setActiveMenu={activeMenuHandler} />
            <SideBarMenuItem title={'Trash'} icon={faTrash} color={'red'} activeMenu={activeMenu} setActiveMenu={activeMenuHandler} />
        </aside>

        <div className="relative sm:ml-[200px] ml-[40px] w-full p-2 rounded-md flex flex-col items-center border border-1 border-gray-700">
            <div className="lg:max-w-2xl w-full">
                <div className="p-2 mb-2 flex gap-2 justify-between">
                    <SearchSection searchText={searchText} setSearchText={setSearchText} setShowAddServiceModal={setShowAddServiceModal} />
                </div>

                <PasswordSections
                    activeMenu={activeMenu}
                    passwords={searchText ? searchedActivePasswords : allActivePasswords}
                    selectedPassword={selectedPassword}
                    setSelectedPassword={setSelectedPassword}
                    bookmarkHandler={bookmarkHandler}
                    setShowEditModal={setShowEditModal}
                />

                {
                    showAddServiceModal &&
                    <AddServiceModal setShowAddServiceModal={setShowAddServiceModal} setActiveMenu={setActiveMenu} />
                }

                {
                    showEditModal && allPasswords && selectedPassword !== null &&
                    <EditServiceModal password={allPasswords[selectedPassword]} setShowEditModal={setShowEditModal} onUpdate={() => { }} />
                }
            </div>

        </div >
    </div >
}

export default HomePage;

