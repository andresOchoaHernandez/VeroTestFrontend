import React from "react";
import {Outlet} from "react-router";
import LoginPage from "../pages/Login";
import Anauthorized from "../pages/Unauthorized";

function ProtectedRoutes(allowedScope){

    //TODO: use state manager, this is not safe, one can change the value of the store in the local storage
    function isLoggedIn(){
        return localStorage.getItem("token")? true : false;
    }

    function getScope(){
        return localStorage.getItem("scope");
    }

    return(
        isLoggedIn() ? (getScope().includes(allowedScope.allowedScope) ? <Outlet/> : <Anauthorized/>) : <LoginPage/>
    );
}

export default ProtectedRoutes;