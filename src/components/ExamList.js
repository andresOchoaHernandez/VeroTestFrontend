import React from "react";
import Table from './Table.js'
import { useGetAllExamsQuery } from "../redux/VeroTestApiExams";
import { useNavigate } from "react-router-dom";

function ExamList(){

    const navigate = useNavigate();

    const columns = [{
        Header: "ESAMI DISPONIBILI",
        columns: [
            {Header: "nome" ,accessor: "nome"},
            {Header: "data" ,accessor: "data"},
            {Header: "ora"  ,accessor: "ora" },
            {
                Header: ""    ,id:'eseguiTest',
                Cell: cell => (
                    <button onClick={()=>navigate(`/esame/${cell.row.values.data}/${cell.row.values.ora}/${cell.row.values.nome}/domanda/0`)}>
                        ESEGUI TEST
                    </button>
                )
            }]
    }];

    const {data:exams,isLoading,isSuccess,isError,error} = useGetAllExamsQuery();

    return isLoading ? 
                <p>CARICAMENTO...</p>
                :
                isSuccess ?
                    (<div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10"><Table columns={columns} data={exams.data.allTest}/></div>)
                    :
                    isError ?
                        (<p>{JSON.stringify(error)}</p>)
                        :
                        (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default ExamList;