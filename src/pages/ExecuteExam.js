import { useParams } from "react-router-dom";
import Question from "../components/Question";
import { useGetAllQuestionsOfTestQuery } from "../redux/VeroTestApiExams";

function ExecuteExam(){

    const {data,ora,nome,nquestion} = useParams();
    const {data:questions,isLoading,isSuccess,isError,error} = useGetAllQuestionsOfTestQuery({data,ora,nome});

    return isLoading ? 
            <p>CARICAMENTO...</p>
            :
            isSuccess ?
                nquestion < questions.data.allDomandaByTest.length ?
                    (<div id="testDisponibili" aria-label="finestra con i test disponibili" tabIndex="10">
                        <Question question={questions.data.allDomandaByTest[nquestion]} lastQuestion={parseInt(questions.data.allDomandaByTest.length)-1 === parseInt(nquestion)} />
                    </div>)
                    :
                    <div> questa domanda non esiste </div>
                        :
                        isError ?
                            (<p>{JSON.stringify(error)}</p>)
                            :
                            (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default ExecuteExam;