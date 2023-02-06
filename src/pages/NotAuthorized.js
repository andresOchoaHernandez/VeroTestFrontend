import React from "react";
import NavigationBar from "../components/NavigationBar";
import classesHome from "../pages/layout/HomePage.module.css";

function NotAuthorized (){

    return(
        <div className={classesHome.home}> 
            <NavigationBar/>
            <h3>Non hai l'autorizzazione per visitare questa pagina!</h3>
        </div>
    );
}

export default NotAuthorized;