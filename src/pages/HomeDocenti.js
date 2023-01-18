import React from "react";
import ExamList from "../components/ExamList";
import classes from "./layout/HomePage.module.css"

function HomeDocenti(){
    return(
        <div className={classes.home} aria-label="homepage-docente">
            <p>THIS IS THE  DOCENTI HOME PAGE</p>
            <ExamList/>
        </div>
    );
}

export default HomeDocenti;