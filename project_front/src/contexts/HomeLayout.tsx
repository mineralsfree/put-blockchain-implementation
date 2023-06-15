import {Navigate, Outlet} from "react-router-dom";
import React from "react";

export const HomeLayout = () => {
    // const jwt = localStorage.getItem('jwt');
    // if (jwt) {
    //     return <Navigate to="/dashboard/blockchain"/>;
    // }
    return (
        <div>
            <Outlet/>
        </div>
    )
};