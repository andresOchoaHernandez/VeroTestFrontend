import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classesHome from "../pages/layout/HomePage.module.css";
import classesTest from "../pages/layout/TestPage.module.css";
import { selectCurrentScope } from "../redux/AuthenticationSlice";

function NotAuthorized (){

    const navigate = useNavigate();
    const scope    = useSelector(selectCurrentScope);

    const goBackHome = () => {
        navigate(scope.includes("DOCENTE") ? "/home-docenti":"/home-studenti");
    }

    return(
        <div className={classesHome.home}> 
            <h3>Non hai l'autorizzazione per visitare questa pagina!</h3>
            <button onClick={goBackHome} className={classesTest.buttonmanagequestion}> RITORNA ALLA HOME </button>
        </div>
    );
}

export default NotAuthorized;