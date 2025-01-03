import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import usePasswordsState from "../stores/usePasswordsState";
import useAuthState from "../stores/useAuthState";

function Layout() {
    const { loading } = usePasswordsState();
    const { isLoading } = useAuthState();

    return (
        <div className="bg-gray-900">
            {(loading || isLoading) && <div className="h-[3px] w-full line_container">
                <div className="moving_gradient">loading</div>
            </div>}
            <div className="max-w-[1240px] m-auto relative min-h-[100vh]">
                <Navbar />
                <div className='w-full flex h-[calc(100vh-60px)] overflow-hidden p-4'>
                    <Outlet />
                </div>
            </div >
        </div>
    )
}

export default Layout;