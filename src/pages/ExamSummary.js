import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endExamResults, selectCurrentDataTestResult, selectCurrentNomeTestResult, selectCurrentOraTestResult, selectCurrentResults } from '../redux/ExamCompletionSlice';
import Table from '../components/Table';
import { selectCurrentScope } from '../redux/AuthenticationSlice';
import classesTest from "../pages/layout/TestPage.module.css";
import classesHome from "../pages/layout/HomePage.module.css";

function ExamSummary()
{
    const dataEsame = useSelector(selectCurrentDataTestResult);
    const oraEsame = useSelector(selectCurrentOraTestResult);
    const nomeEsame = useSelector(selectCurrentNomeTestResult);
    const risultati = useSelector(selectCurrentResults);

    const scope = useSelector(selectCurrentScope);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        dispatch(endExamResults());
        navigate(scope.includes("DOCENTE") ? "/home-docenti":"/home-studenti");
    }

    return(
        <div className={classesHome.home} id="riassunto" aria-label="riassunto esame" tabIndex="10">
                <Table columns={columns} data={risultati}/> 
                <h4> Punteggio totale: {punteggioTotale}</h4>
                <button className={classesTest.buttonmanagequestion} onClick={goBackHome}> HOME </button>
        </div>
    );
}

export default ExamSummary;