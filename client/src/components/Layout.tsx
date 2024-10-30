import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

function Layout() {


    return (
        <div className="bg-gray-900">
            <div className="max-w-[1240px] m-auto relative min-h-svh">
                <Navbar />
                <div className='w-full overflow-hidden'>
                    <Outlet />
                </div>
            </div >
        </div>
    )
}

export default Layout;