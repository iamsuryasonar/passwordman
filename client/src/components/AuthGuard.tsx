import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthState from "../stores/useAuthState";

interface Props {
    children: JSX.Element;
}

export function PrivateRoute(props: Props) {
    const { user, login, isLoggedIn, isLoading, error } = useAuthState();

    const { children } = props;
    const logged_in = isLoggedIn;

    return logged_in ? <>{children}</> : <Navigate to="/login" />;
}

export const PublicRoute = (props: Props) => {
    const { user, login, isLoggedIn, isLoading, error } = useAuthState();

    const { children } = props;
    const logged_in = isLoggedIn;

    return !logged_in ? <>{children}</> : <Navigate to="/home" />;
};