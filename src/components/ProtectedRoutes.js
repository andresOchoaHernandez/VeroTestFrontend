import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginPage from "../pages/Login";
import { isLoggedIn, selectCurrentScope} from "../redux/AuthenticationSlice";

function ProtectedRoutes({allowedScope}){

    const scope    = useSelector(selectCurrentScope)
    const loggedIn = useSelector(isLoggedIn)

    if(loggedIn){
        if(scope.includes(allowedScope)){
            return <Outlet/>
        }
    }
    else{
        return <LoginPage/>
    }
}

export default ProtectedRoutes;