import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBookmark, faAdd, faMagnifyingGlass, faVault, faTrash, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Props1 {
    searchText: string;
    setSearchText: (arg0: string) => void;
}

function SearchSection(props: Props1) {
    const navigate = useNavigate();
    const { searchText, setSearchText } = props;
    return <>
        <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                type='text'
                placeholder="Search"
                className="w-full border-none bg-transparent text-lg focus:outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {/*todo : debounce search , no need of a button to search */}
        </div>
        <div className="bg-purple-600 hover:bg-purple-700 rounded-md px-3 py-1 flex items-center gap-2 text-nowrap cursor-pointer"
            onClick={() => {
                navigate('/add-password')
            }}>
            <FontAwesomeIcon icon={faAdd} />
            <p>Add New</p>
        </div></>
}

export default SearchSection;