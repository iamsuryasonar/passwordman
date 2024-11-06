import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props1 {
    searchText: string;
    setSearchText: (arg0: string) => void;
    setShowAddServiceModal: (arg0: boolean) => void;
}

function SearchSection(props: Props1) {

    const { searchText, setSearchText, setShowAddServiceModal } = props;

    return <>
        <div className="relative flex items-center justify-between gap-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700 hover:border-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                type='text'
                placeholder="Search"
                className="w-full border-none bg-transparent text-lg focus:outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="cursor-pointer hover:text-red-400" onClick={() => setSearchText('')}>
                <FontAwesomeIcon icon={faClose} />
            </div>
        </div>
        <div className="bg-purple-600 hover:bg-purple-700 rounded-md px-3 py-1 flex items-center gap-2 text-nowrap cursor-pointer"
            onClick={() => {
                setShowAddServiceModal(true);
            }}>
            <FontAwesomeIcon icon={faAdd} />
            <p className="hidden sm:flex">Add New</p>
        </div>
    </>
}

export default SearchSection;