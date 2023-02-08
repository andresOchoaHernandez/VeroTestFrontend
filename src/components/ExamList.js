import React from "react";
import Table from './Table.js'
import { useAllCompilazioniByUserOfExamMutation, useExamListWithPreviousCompilationFlagQuery, useGetAllAnswersOfQuestionMutation, useGetAllExamsQuery, useGetAllQuestionsOfTestMutation, useGetExamMutation } from "../redux/VeroTestApiExams";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamPresentation } from "../redux/ExamPresentationSlice.js";
import { selectCurrentUserId } from "../redux/AuthenticationSlice.js";
import { setExamExecution } from "../redux/ExamExecutionSlice.js";

function checkIfExistPreviousCompilation(examsWithPrvComps,data,ora,nome){
    for(const exam of examsWithPrvComps){
        if(exam.data === data && exam.ora === ora && exam.nome === nome){
            return exam.existPrevCompilation;
        }
    }
}

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
            const {data:{testByDateHourAndName:exam}} = await getExam({data,ora,nome}).unwrap(); //passandogli data, ora e nome del test    
            const {data:{allDomandaByTest:questions}} = await getAllQuestionsOfExam({data,ora,nome}).unwrap();

            let newExamPresentationState = structuredClone(exam);
            newExamPresentationState.domande = structuredClone(questions);

            for await (const [index,question] of questions.entries()){
                const {data:{allRispostaOfDomanda:answers}} = await getAllAnswersOfQuestion(question.nome).unwrap();
                newExamPresentationState.domande[index].risposte = [...answers];
            }

            dispatch(setExamPresentation(newExamPresentationState)); //setto l'oggetto newExamPresentationState come nuovo stato dell'ExamPresentationSlice


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

    const {data:exams,isLoading:isLoadingExams,isSuccess:isSuccesExams,isError:isErrorExams,errorExams} = useGetAllExamsQuery();
    const {data:examsWithFlag,isLoading:isLoadingExamsWithFlag,isSuccess:isSuccesExamsWithFlag} = useExamListWithPreviousCompilationFlagQuery(idUtente); //mi torna una lista di esami compilati da un utente con idUtente con le informazioni di data, ora, nome e una flag per dirmi se quell'esame ha compilazioni precedenti (per questo idUtente mi dice se ci sono già delle compilazioni)

    let content;

    if(isLoadingExams && isLoadingExamsWithFlag){
        content = <h2>CARICAMENTO...</h2>;
    }
    else if(isSuccesExams && isSuccesExamsWithFlag){

        const examsWithPrevCompilations = examsWithFlag.data.examListWithPreviousCompilationFlag;

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
                            {
                                checkIfExistPreviousCompilation(examsWithPrevCompilations,cell.row.values.data,cell.row.values.ora,cell.row.values.nome)?
                                "RIPRENDI TEST"
                                :
                                "ESEGUI TEST"
                            }
                        </button>
                    )
                }]
        }];

        content = (
        <div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10">
            <Table columns={columns} data={exams.data.allTest}/>
        </div>);
    }
    else if(isErrorExams){
        content = (<p>{JSON.stringify(errorExams)}</p>); //stringify per convertire valore javascript errorExams in stringa json
    }
    else{
        content = <h3>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</h3>;
    }

    return content;
}

export default ExamList;