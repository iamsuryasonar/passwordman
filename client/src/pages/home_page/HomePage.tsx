import useAuthState from "../../stores/useAuthState";

function HomePage() {
    const { user, login, logout, isLoggedIn, isLoading, error } = useAuthState();

    const handleLogout = async () => {
        await logout();
    };

    return <>
        <div className="flex flex-col">
            <p>
                HomePage
            </p>
            <button onClick={handleLogout} className="bg-green-400 px-2 py-1">LogOut</button>
        </div>
    </>
}

export default HomePage;