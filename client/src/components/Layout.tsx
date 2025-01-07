import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import usePasswordsState from "../stores/usePasswordsState";
import useAuthState from "../stores/useAuthState";

function Layout() {
    const { loading } = usePasswordsState();
    const { isLoading } = useAuthState();

    return (
        <div className="bg-gray-900 min-h-screen">
            {
                (loading || isLoading) && <div className="h-[3px] w-full line_container">
                    <div className="moving_gradient">loading</div>
                </div>
            }
            <div className="max-w-[1240px] w-full m-auto relative">
                <Navbar />
                <div className='w-full h-full min-h-[calc(100svh-60px)] overflow-hidden p-2 sm:p-4  flex'>
                    <Outlet />
                </div>
            </div >
        </div>
    )
}

export default Layout;