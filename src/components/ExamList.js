import React from "react";
import classes from '../pages/layout/HomePage.module.css';
import { VeroTestGraphqlAPI } from "./VeroTestGraphqlAPI";

function ExamList(){

    function prova(){
        VeroTestGraphqlAPI.getAllTests();
    }

    return(
        <div id="availtest" className={classes.containerleft} aria-label="finestra con i test disponibili" tabIndex="10">
        <h2 className={classes.headerleft} >I TEST CHE PUOI ESEGUIRE:</h2>
        <button onClick={prova}> tutti gli esami </button>
        </div>
    );
}

export default ExamList;