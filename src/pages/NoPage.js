import React from "react";
import classesHome from "../pages/layout/HomePage.module.css";

function NoPage (){
    return(
        <div className={classesHome.home}> 
            <h3>This page doesn't exist</h3>
        </div>
    );
}

export default NoPage;