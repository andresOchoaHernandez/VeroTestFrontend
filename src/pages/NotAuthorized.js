import React from "react";
import NavigationBar from "../components/NavigationBar";
import classesHome from "../pages/layout/HomePage.module.css";

function NotAuthorized (){

    return(
        //pagina visualizzata se un utente loggato non ha i permessi per accedere alla pagina cercata 
        <div className={classesHome.home}> 
            <NavigationBar/>
            <h3>Non hai l'autorizzazione per visitare questa pagina!</h3>
        </div>
    );
}

export default NotAuthorized;