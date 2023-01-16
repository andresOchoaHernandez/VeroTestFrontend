import React from "react";
import classes from '../pages/layout/HomePage.module.css';
import { gql, GraphQLClient } from "graphql-request";

function ExamList(){
    function getExamsList(){
        const client = new GraphQLClient("http://localhost:8080/graphql");
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization' : localStorage.getItem("token")
        };
        client.setHeaders(headers);
        const query = gql`
        query {
            allTest{
                data,
                ora,
                nome
            }
        }`;
        const response = client.request(query).catch(error => console.log(error));

        console.log(response);
    }


    return(
        <div id="availtest" className={classes.containerleft} aria-label="finestra con i test disponibili" tabIndex="10">
        <h2 className={classes.headerleft} >I TEST CHE PUOI ESEGUIRE:</h2>
        <button onClick={getExamsList}> tutti gli esami </button>
        </div>
    );
}

export default ExamList;