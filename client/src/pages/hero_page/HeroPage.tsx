import { useNavigate } from "react-router-dom";
import encryptionImage from '../../../public/encryption.png';
import Footer from '../../components/Footer';

function HeroPage() {
    const navigate = useNavigate();

    return <>
        <div className="flex flex-col text-white p-3">

            <section className="flex gap-4 items-center">
                <div className="w-full flex flex-col gap-2">
                    <p className="text-4xl font-bold">
                        Securely Manage Your Passwords in One Place.
                    </p>

                    <p className="text-gray-400">
                        Store, Generate, and Access Passwords Anytime, Anywhere.
                    </p>

                    <div className="flex gap-2">
                        <button onClick={() => {
                            navigate('/login')
                        }} className="border border-gray-700 rounded-md px-2 py-1 hover:border-white">
                            Log In
                        </button>
                        <button onClick={() => {
                            navigate('/register')
                        }} className="border border-gray-700 rounded-md px-2 py-1 hover:border-white">
                            Get Started
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <img className="w-full aspect-square object-cover " src={encryptionImage} />
                </div>
            </section>

            <section className="my-20">
                <p className="text-2xl font-bold py-2">How It Works</p>
                <div className="text-gray-400">
                    <p><span className="text-xl font-bold px-2">•</span>Sign up and create a master password.</p>
                    <p><span className="text-xl font-bold px-2">•</span>Add and categorize your passwords.</p>
                    <p><span className="text-xl font-bold px-2">•</span>Use the password generator to create strong, unique passwords.</p>
                    <p><span className="text-xl font-bold px-2">•</span>Access passwords from any device securely.</p>
                </div>
            </section>

            <section className="my-20">
                <p className="text-2xl font-bold py-3">Why Choose Us?</p>
                <div className="grid sm:grid-flow-col sm:row-span-1 sm:col-span-3 gap-4">
                    <Card title="Strong Encryption:" description="Your data is encrypted with AES-256 to ensure maximum security." />
                    <Card title="User-Friendly Interface:" description="Simple, clean, and easy-to-use design." />
                    <Card title="Cross-Platform Access:" description="Access passwords from mobile, desktop, and web." />
                </div>
            </section>
            <Footer />
        </div>
    </>
}

export default HeroPage;
interface Props {
    title: string;
    description: string;
}

function Card(props: Props) {
    const { title, description } = props;

    return <div className="flex-col gap-2 border border-gray-700 p-4 rounded-md">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
}

