import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentDataTestResult, selectCurrentNomeTestResult, selectCurrentOraTestResult, selectCurrentResults } from '../redux/ExamCompletionSlice';
import Table from '../components/Table';
import classesHome from "../pages/layout/HomePage.module.css";
import NavigationBar from '../components/NavigationBar';

function ExamSummary()
{
    const dataEsame = useSelector(selectCurrentDataTestResult);
    const oraEsame = useSelector(selectCurrentOraTestResult);
    const nomeEsame = useSelector(selectCurrentNomeTestResult);
    const risultati = useSelector(selectCurrentResults);

    const columns = [
        {
            Header: `RIASSUNTO ESAME ${nomeEsame} SOTENUTO IL ${dataEsame} ALLE ${oraEsame} `,
            columns: [                
                {Header: "RISPOSTA DATA"  ,accessor: "rispostaData"},
                {Header: "PUNTI OTTENUTI" ,accessor: "puntiRispostaData"},
                {Header: "RISPOSTA ESATTA"  ,accessor: "rispostaEsatta" },
            ]
        }];

    var punteggioTotale = 0;
    risultati.forEach(element => {punteggioTotale += element.puntiRispostaData;});

    return(
        <div className={classesHome.home} id="riassunto" aria-label="riassunto esame" tabIndex="10">
                <NavigationBar/>
                <Table columns={columns} data={risultati}/> 
                <h4> Punteggio totale: {punteggioTotale}</h4>
        </div>
    );
}

export default ExamSummary;