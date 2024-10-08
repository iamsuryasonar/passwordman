import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModal from "../../components/EditModal";

const BASE_URL = 'http://localhost:3001/api/password/'


function ViewAndEditPasswordPage() {

    const { state } = useLocation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const navigate = useNavigate();
    console.log(state.password)

    const reload = () => window.location.reload();

    const deletePassword = async () => {
        if (!state._id) return;
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('passman-auth-storage')!).state.user.token;
            const response = await fetch(BASE_URL + `delete-password/${state.password._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Failed to save password');
            }

            const data = await response.json();
            console.log(data);
            navigate('/home')
            setIsLoading(true)

        } catch (error: any) {
            setIsLoading(true)
            console.log(error)
        }
    }


    return <div className="relative w-full h-full">
        {
            state && <div className="bg-slate-100 p-2 m-2 rounded-md cursor-pointer flex flex-col gap-2 items-start">
                <div className="w-full flex flex-row justify-between  p-2">
                    <button className="block hover:text-green-500" onClick={() => { setShowEditModal(true) }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="block hover:text-red-500" onClick={deletePassword}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <p>{state.service}</p>
                <p>{state.username}</p>
                <p>{state.password}</p>
                <p>{state.createdAt}</p>
                <p>{state.updatedAt}</p>
            </div>
        }
        {
            showEditModal && state && <EditModal
                id={state._id}
                service={state.service}
                username={state.username}
                password={state.password}
                setShowEditModal={setShowEditModal}
                onUpdate={reload}
            />
        }


    </div>

}
export default ViewAndEditPasswordPage;