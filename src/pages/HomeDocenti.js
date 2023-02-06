import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExamList from "../components/ExamList";
import NavigationBar from "../components/NavigationBar";
import {selectCurrentUsername } from "../redux/AuthenticationSlice";
import classes from "./layout/HomePage.module.css"

function HomeDocenti(){
    const username = useSelector(selectCurrentUsername);
    const navigate = useNavigate();

    const createEsame = () => {navigate("/crea-esame");}

    return(
        <div className={classes.home} aria-label="homepage-docente">
            <NavigationBar/>
            <h3>Benvenuto prof. {username}</h3>
            <ExamList/>
            <button className ={classes.btn} onClick={createEsame}>CREA NUOVO ESAME</button>
        </div>
    );
}

export default HomeDocenti;