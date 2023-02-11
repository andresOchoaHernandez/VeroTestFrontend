import React from "react";
import classesHome from "../pages/layout/HomePage.module.css";

function NoPage (){
    return (
        //qualsiasi path che non è instradato dal Browser Router porta a questa pagina
        <div className={classesHome.home}>
            <h3>Ops! Sembra che la pagina che stai cercando non esiste! </h3>
        </div>
    );
}

export default NoPage;