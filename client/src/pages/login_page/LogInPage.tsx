import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useAuthState from "../../stores/useAuthState";
import { useNavigate } from "react-router-dom";

function LogInPage() {
    const [show, setShow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { user, login, isLoggedIn, isLoading, error } = useAuthState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(email, password);
    };

    useEffect(() => {
        console.log('here')
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [])

    return <>
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl">log in</p>
            <div className="bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type='text'
                        placeholder="email"
                        className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-slate-800">
                    <input
                        type={show ? 'text' : "password"}
                        placeholder="password"
                        className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="block" onClick={() => setShow(!show)}>
                        <div>
                            {show ? <FontAwesomeIcon icon={faEye} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </div>
                    </button>
                </div>
                <button className=" bg-green-500 rounded-md px-2 py-1"
                    onClick={handleLogin} disabled={isLoading}
                >
                    Log in
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    </>
}

export default LogInPage;