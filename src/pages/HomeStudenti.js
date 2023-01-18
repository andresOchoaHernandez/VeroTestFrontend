import React from "react";
import ExamList from "../components/ExamList";
import classes from "./layout/HomePage.module.css"

function HomeStudenti(){
    return(
        <div className={classes.home} aria-label="home studente">
            <p>THIS IS THE  STUDENTI HOME PAGE</p>
            <ExamList/>
        </div>
    );
}

export default HomeStudenti;