import React from "react";
import Table from './Table.js'
import { useAllCompilazioniByUserOfExamMutation, useGetAllAnswersOfQuestionMutation, useGetAllExamsQuery, useGetAllQuestionsOfTestMutation, useGetExamMutation } from "../redux/VeroTestApiExams";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamPresentation } from "../redux/ExamPresentationSlice.js";
import { selectCurrentUserId } from "../redux/AuthenticationSlice.js";
import { setExamExecution } from "../redux/ExamExecutionSlice.js";

function ExamList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getExam = useGetExamMutation()[0];                
    const getAllQuestionsOfExam = useGetAllQuestionsOfTestMutation()[0];  
    const getAllAnswersOfQuestion = useGetAllAnswersOfQuestionMutation()[0];

    const getPreviousCompilationsByUserOfExam = useAllCompilazioniByUserOfExamMutation()[0];
    const idUtente = useSelector(selectCurrentUserId);

    const beginExam = async (data,ora,nome) => {

        try{
            const {data:{testByDateHourAndName:exam}} = await getExam({data,ora,nome}).unwrap();    
            const {data:{allDomandaByTest:questions}} = await getAllQuestionsOfExam({data,ora,nome}).unwrap();

            let newExamPresentationState = structuredClone(exam);
            newExamPresentationState.domande = structuredClone(questions);

            for await (const [index,question] of questions.entries()){
                const {data:{allRispostaOfDomanda:answers}} = await getAllAnswersOfQuestion(question.nome).unwrap();
                newExamPresentationState.domande[index].risposte = [...answers];
            }

            dispatch(setExamPresentation(newExamPresentationState));


            const {data:{allCompilazioniByUserOfExam:previousCompilations}} = await getPreviousCompilationsByUserOfExam({idUtente:idUtente,dataTest:data,oraTest:ora,nomeTest:nome}).unwrap();
            
            let newExamExecutionState = {data:data,ora:ora,nome:nome,domandeCompilate:[]};
            previousCompilations.forEach((input) => {
                newExamExecutionState.domandeCompilate.push({nomeDomanda:input.nomeDomanda,risposta:input.idRisposta});
            })

            dispatch(setExamExecution(newExamExecutionState));

            navigate(`/esame/${data}/${ora}/${nome}/0`);
        }
        catch(error){
            console.log(error)
        }        
    }

    const columns = [{
        Header: "ESAMI DISPONIBILI",
        columns: [
            {Header: "nome" ,accessor: "nome"},
            {Header: "data" ,accessor: "data"},
            {Header: "ora"  ,accessor: "ora" },
            {
                Header: ""    ,id:'eseguiTest',
                Cell: cell => (
                    <button onClick={()=>beginExam(cell.row.values.data,cell.row.values.ora,cell.row.values.nome)}>
                        ESEGUI TEST
                    </button>
                )
            }]
    }];

    const {data:exams,isLoading:isLoadingExams,isSuccess:isSuccesExams,isError:isErrorExams,errorExams} = useGetAllExamsQuery();

    return isLoadingExams ? 
                <h2>CARICAMENTO...</h2>
                :
                isSuccesExams ?
                    (<div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10"><Table columns={columns} data={exams.data.allTest}/></div>)
                    :
                    isErrorExams ?
                        (<p>{JSON.stringify(errorExams)}</p>)
                        :
                        (<h3>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</h3>);
}

export default ExamList;