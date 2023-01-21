import React from "react";
import { useSelector } from "react-redux";
import ExamList from "../components/ExamList";
import {selectCurrentUsername } from "../redux/AuthenticationSlice";
import classes from "./layout/HomePage.module.css"

function HomeDocenti(){
    const username = useSelector(selectCurrentUsername);
    return(
        <div className={classes.home} aria-label="homepage-docente">
            <p>Benvenuto prof. {username}</p>
            <ExamList/>
        </div>
    );
}

export default HomeDocenti;