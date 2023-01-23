import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { setExamExecution } from "../redux/ExamExecutionSlice";
import { useAllCompilazioniByUserOfExamMutation, useGetAllQuestionsOfTestQuery } from "../redux/VeroTestApiExams";

function ExecuteExam(){

    const dispatch = useDispatch();

    const idUtente = useSelector(selectCurrentUserId);

    const {data,ora,nome,nquestion} = useParams();
    const {data:questions,isLoading:isLoadingQuestions,isSuccess:isSuccessQuestions,isError:isErrorQuestions,error:errorQuestions} = useGetAllQuestionsOfTestQuery({data,ora,nome});
    const getAllCompilazioniByUserOfExam = useAllCompilazioniByUserOfExamMutation()[0];
    
    useEffect(() => {
        const fetchCompilazioniFromUser = async () => {
            try{
                const response = await getAllCompilazioniByUserOfExam({idUtente:idUtente,dataTest:data,oraTest:ora,nomeTest:nome}).unwrap();
    
                if(response.data.allCompilazioniByUserOfExam.length !== 0){
                    
                    let qstAnsw = [];
                    response.data.allCompilazioniByUserOfExam.forEach((elem) => {
                        qstAnsw.push({question:elem.nomeDomanda,answer:elem.idRisposta})
                    });
                    dispatch(setExamExecution({dataTest:data,oraTest:ora,nomeTest:nome,qstAnsw:qstAnsw}));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchCompilazioniFromUser();
    },[data,ora,nome,idUtente,getAllCompilazioniByUserOfExam,dispatch]);

    return isLoadingQuestions? 
            <p>CARICAMENTO...</p>
            :
            isSuccessQuestions ?
                nquestion < questions.data.allDomandaByTest.length ?
                    (<div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10">
                        <Question question={questions.data.allDomandaByTest[nquestion]} lastQuestion={parseInt(questions.data.allDomandaByTest.length)-1 === parseInt(nquestion)} />
                    </div>)
                    :
                    <div> questa domanda non esiste </div>
                        :
                        isErrorQuestions ?
                            (<p>{JSON.stringify(errorQuestions)}</p>)
                            :
                            (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default ExecuteExam;