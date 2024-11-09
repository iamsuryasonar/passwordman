import { Navigate } from 'react-router-dom';
import useAuthState from "../stores/useAuthState";

interface Props {
    children: JSX.Element;
}

export function PrivateRoute(props: Props) {
    const { isLoggedIn } = useAuthState();

    const { children } = props;

    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export const PublicRoute = (props: Props) => {
    const {  isLoggedIn} = useAuthState();

    const { children } = props;

    return !isLoggedIn ? <>{children}</> : <Navigate to="/home" />;
};