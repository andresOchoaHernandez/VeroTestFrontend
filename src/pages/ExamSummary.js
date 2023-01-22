import React,{useMemo} from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "../components/Table";

function ExamSummary()
{
    return (<p> RIASSUNTO RISULTATI ESAME </p>)

    /*
    const location = useLocation();
    const riassunto = location.state.completeTest;

    const columns = useMemo(() => [
        {
            Header: "RIASSUNTO ESAME",
            columns: [
                {Header: "RISPOSTA DATA"  ,accessor: "rispostaData"},
                {Header: "PUNTI OTTENUTI" ,accessor: "puntiRispostaData"},
                {Header: "RISPOSTA ESATTA"  ,accessor: "rispostaEsatta" },
            ]
        }],[]);

    var punteggioTotale = 0;

    riassunto.forEach(element => {punteggioTotale += element.puntiRispostaData;});

    return(
        <div id="riassunto" aria-label="riassunto esame" tabIndex="10">
                <Table columns={columns} data={riassunto}/> 
                <p> Punteggio totale: {punteggioTotale}</p>
                <Link to={localStorage.getItem("scope").includes("DOCENTE") ? "/home-docenti":"/home-studenti"}>HOME</Link>
        </div>
    );*/
}

export default ExamSummary;