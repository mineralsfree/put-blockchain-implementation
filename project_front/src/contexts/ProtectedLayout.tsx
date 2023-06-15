import {Navigate, Outlet} from "react-router-dom";

export const ProtectedLayout = () => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
        return <Navigate to="/login"/>;
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
};