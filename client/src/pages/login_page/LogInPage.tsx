import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useAuthState from "../../stores/useAuthState";
import { useNavigate } from "react-router-dom";

function LogInPage() {
    const [show, setShow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, isLoggedIn, isLoading, authMessage } = useAuthState();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [])

    const handleLogin = async () => {
        await login(email, password);
    };

    const handleGuestLogIn = async () => {
        await login('test2@gmail.com', '11111111');
    }

    return <>
        <div className="absolute p-3 inset-0 flex flex-col items-center justify-center text-white">
            <div className="flex flex-col gap-2">
                <p className="text-2xl place-self-center">Log in</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700">
                        <input
                            type='text'
                            placeholder="email"
                            className="w-full border-none bg-transparent text-lg focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md bg-transparent px-2 py-1 border border-1 border-gray-700">
                        <input
                            type={show ? 'text' : "password"}
                            placeholder="password"
                            className="w-full border-none bg-transparent text-lg  focus:outline-none"
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
                    <button className="border-[1px] border-slate-500 rounded-md px-2 py-1"
                        onClick={handleGuestLogIn} disabled={isLoading}
                    >
                        Guest log in
                    </button>
                    {authMessage && <p style={{ color: 'red' }}>{authMessage}</p>}
                </div>
            </div>
        </div>
    </>
}

export default LogInPage;