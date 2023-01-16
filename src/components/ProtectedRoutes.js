import React from "react";
import {Outlet} from "react-router";
import LoginPage from "../pages/Login";
import Anauthorized from "../pages/Unauthorized";

function ProtectedRoutes(allowedScope){

    function isLoggedIn(){
        return localStorage.getItem("token")? true : false;
    }

    function getScope(){
        return localStorage.getItem("scope");
    }

    return(
        isLoggedIn() ? (getScope() === allowedScope.allowedScope ? <Outlet/> : <Anauthorized/>) : <LoginPage/>
    );
}

export default ProtectedRoutes;