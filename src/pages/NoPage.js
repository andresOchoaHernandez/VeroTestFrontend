import React from "react";
import classesHome from "../pages/layout/HomePage.module.css";

function NoPage (){
    return (
        <div className={classesHome.home}>
            <h3>Ops! Sembra che la pagina che stai cercando non esiste! </h3>
        </div>
    );
}

export default NoPage;