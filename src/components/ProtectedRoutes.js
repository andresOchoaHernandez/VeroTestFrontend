import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginPage from "../pages/Login";
import NotAuthorized from "../pages/NotAuthorized";
import { isLoggedIn, selectCurrentScope} from "../redux/AuthenticationSlice";

function ProtectedRoutes({allowedScope}){

    const scope    = useSelector(selectCurrentScope)
    const loggedIn = useSelector(isLoggedIn)

    if(loggedIn){
        if(allowedScope.includes(scope)){
            return <Outlet/>
        }
        else{
            return <NotAuthorized/>
        }
    }
    else{
        return <LoginPage/>
    }
}

export default ProtectedRoutes;