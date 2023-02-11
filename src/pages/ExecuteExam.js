import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { domandeCompilateExecutionExam, isExamInProgress } from "../redux/ExamExecutionSlice";
import { presentedExamData, presentedExamDomande, presentedExamDomandeConNumero,presentedExamNome,presentedExamOra} from "../redux/ExamPresentationSlice"
import NoPage from "./NoPage";
import Question from "../components/Question";

function ExecuteExam(){
    const {nquestion} = useParams(); //recuperiamo dall'url il parametro nquestion

    const userId = useSelector(selectCurrentUserId);

    const dataTest = useSelector(presentedExamData);
    const oraTest = useSelector(presentedExamOra);
    const nomeTest = useSelector(presentedExamNome);
    const domandeConNumeroEsame = useSelector (presentedExamDomandeConNumero);
    const domandeEsame = useSelector (presentedExamDomande); //array con tutti gli oggetti domanda
    const domandeCompilate = useSelector(domandeCompilateExecutionExam); //array con tutti gli oggetti compilazione di quell'utente per quell'esame

    const examInExec = useSelector(isExamInProgress);

    return (
        examInExec?(
            parseInt(nquestion) < domandeEsame.length ?
                //ogni volta che si passa da una domanda all'altra viene renderizzato il componente <Question />
                <Question 
                    userId={userId} 
                    dataTest={dataTest} 
                    oraTest={oraTest} 
                    nomeTest={nomeTest} 
                    domandeConNumeroEsame={domandeConNumeroEsame} 
                    domanda={domandeEsame[parseInt(nquestion)]} //domanda alla posizione parseInt(nquestion)
                    nquestion={parseInt(nquestion)} //numero della domanda
                    domandeCompilate={domandeCompilate} 
                    isLastQuestion={domandeEsame.length-1===parseInt(nquestion)}
                />
                :
                <NoPage/>
        )
        :
        (<h3>L'esame si è ormai concluso</h3>)
    );      
}

export default ExecuteExam;