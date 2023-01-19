import React,{useEffect, useMemo, useState} from "react";
import { VeroTestGraphqlAPI } from "./VeroTestGraphqlAPI";
import Table from './Table.js'

function ExamList(){

    function executeTest(data,ora,nome){

        //TODO: check if compilazione è già presente
        window.location.href=`/esame/${data}/${ora}/${nome}/domanda/0`;
    }

    const columns = useMemo(() => [
        {
            Header: "ESAMI DISPONIBILI",
            columns: [
                {Header: "nome" ,accessor: "nome"},
                {Header: "data" ,accessor: "data"},
                {Header: "ora"  ,accessor: "ora" },
                {
                    Header: ""    ,id:'eseguiTest',
                    Cell: cell => (
                        <button onClick={()=>executeTest(cell.row.values.data,cell.row.values.ora,cell.row.values.nome)}>
                            ESEGUI TEST
                        </button>
                    )
                }]
        }],[]);
    const [data, setData] = useState([]);
    useEffect(() => {VeroTestGraphqlAPI.getAllTests().then(res=>{setData(res.allTest)}).catch(err => {console.log(err)});},[]);

    return(
        <div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10">
              <Table columns={columns} data={data}/>  
        </div>
    );
}

export default ExamList;