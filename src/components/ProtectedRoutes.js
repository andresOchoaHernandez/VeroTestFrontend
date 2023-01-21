import React from "react";
import { useSelector } from "react-redux";
import {Outlet} from "react-router";
import LoginPage from "../pages/Login";
import Anauthorized from "../pages/Unauthorized";
import { isLoggedIn, selectCurrentScope} from "../redux/AuthenticationSlice";

function ProtectedRoutes(allowedScope){

    const scope    = useSelector(selectCurrentScope)
    const loggedIn = useSelector(isLoggedIn)

    return(
        loggedIn ? (scope.includes(allowedScope.allowedScope) ? <Outlet/> : <Anauthorized/>) : <LoginPage/>
    );
}

export default ProtectedRoutes;