import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExamList from "../components/ExamList";
import {selectCurrentUsername } from "../redux/AuthenticationSlice";
import classes from "./layout/HomePage.module.css"

function HomeDocenti(){
    const username = useSelector(selectCurrentUsername);
    const navigate = useNavigate();

    const createEsame = () => {navigate("/crea-esame");}

    return(
        <div className={classes.home} aria-label="homepage-docente">
            <p>Benvenuto prof. {username}</p>
            <ExamList/>
            <button onClick={createEsame}>CREA ESAME</button>
        </div>
    );
}

export default HomeDocenti;