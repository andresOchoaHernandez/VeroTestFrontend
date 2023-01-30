import React from "react";
import { useSelector } from "react-redux";
import ExamList from "../components/ExamList";
import { selectCurrentUsername } from "../redux/AuthenticationSlice";
import classes from "./layout/HomePage.module.css"

function HomeStudenti(){
    const username = useSelector(selectCurrentUsername);
    return(
        <div className={classes.home} aria-label="home studente">
            <h3>Benvenuto studente {username}</h3>
            <ExamList/>
        </div>
    );
}

export default HomeStudenti;