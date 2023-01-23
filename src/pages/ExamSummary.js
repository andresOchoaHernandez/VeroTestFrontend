import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentDataTestResult, selectCurrentNomeTestResult, selectCurrentOraTestResult, selectCurrentResults } from '../redux/ExamCompletionSlice';
import Table from '../components/Table';
import { selectCurrentScope } from '../redux/AuthenticationSlice';

function ExamSummary()
{
    const dataEsame = useSelector(selectCurrentDataTestResult);
    const oraEsame = useSelector(selectCurrentOraTestResult);
    const nomeEsame = useSelector(selectCurrentNomeTestResult);
    const risultati = useSelector(selectCurrentResults);

    const scope = useSelector(selectCurrentScope);

    const navigate = useNavigate();

    const columns = [
        {
            Header: `RIASSUNTO ESAME ${nomeEsame} SOTENUTO DEL ${dataEsame} ALLE ${oraEsame} `,
            columns: [                
                {Header: "RISPOSTA DATA"  ,accessor: "rispostaData"},
                {Header: "PUNTI OTTENUTI" ,accessor: "puntiRispostaData"},
                {Header: "RISPOSTA ESATTA"  ,accessor: "rispostaEsatta" },
            ]
        }];

    var punteggioTotale = 0;
    risultati.forEach(element => {punteggioTotale += element.puntiRispostaData;});

    const goBackHome = () => {
        navigate(scope.includes("DOCENTE") ? "/home-docenti":"/home-studenti");
    }

    return(
        <div id="riassunto" aria-label="riassunto esame" tabIndex="10">
                <Table columns={columns} data={risultati}/> 
                <p> Punteggio totale: {punteggioTotale}</p>
                <button onClick={goBackHome}> HOME </button>
        </div>
    );
}

export default ExamSummary;