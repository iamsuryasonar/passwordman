import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBookmark, faAdd, faMagnifyingGlass, faVault, faTrash, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props1 {
    title: string;
    icon: IconProp;
    color: string;
    activeMenu: string;
    setActiveMenu: (arg0: string) => void;
}

function SideBarMenuItem(props: Props1) {
    const { color, icon, title, activeMenu, setActiveMenu } = props;

    return <div className={`flex gap-2 cursor-pointer p-2 border border-1  ${activeMenu === title ? 'border-yellow-200' : 'border-gray-700'} hover:border-white rounded-md`}
        onClick={() => {
            setActiveMenu(title)
        }} >
        <FontAwesomeIcon icon={icon} className="w-6 place-self-center cursor-pointer"
            style={{ color: color }} />
        <p className="hidden sm:block">{title}</p>
    </ div >
}

export default SideBarMenuItem;