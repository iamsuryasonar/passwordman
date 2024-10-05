import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props{
    children: JSX.Element;
}

export function PrivateRoute(props: Props) {
    const {children} = props;
    const logged_in = false;

    return logged_in ? <>{children}</> : <Navigate to="/login" />;
}

export const PublicRoute = (props: Props) => {
    const {children} = props;
    const logged_in = false;
    
    return logged_in ? <Navigate to="/home" /> : <>{children}</>;
};