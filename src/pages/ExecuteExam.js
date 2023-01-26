import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { domandeCompilateExecutionExam, isExamInProgress } from "../redux/ExamExecutionSlice";
import { presentedExamData, presentedExamDomande, presentedExamDomandeConNumero,presentedExamNome,presentedExamOra} from "../redux/ExamPresentationSlice"
import NoPage from "./NoPage";
import Question from "../components/Question";

function ExecuteExam(){
    const {nquestion} = useParams();

    const userId = useSelector(selectCurrentUserId);

    const dataTest = useSelector(presentedExamData);
    const oraTest = useSelector(presentedExamOra);
    const nomeTest = useSelector(presentedExamNome);
    const domandeConNumeroEsame = useSelector (presentedExamDomandeConNumero);
    const domandeEsame = useSelector (presentedExamDomande);
    const domandeCompilate = useSelector(domandeCompilateExecutionExam);

    const examInExec = useSelector(isExamInProgress);

    return (
        examInExec?(
            parseInt(nquestion) < domandeEsame.length ?
                <Question 
                    userId={userId} 
                    dataTest={dataTest} 
                    oraTest={oraTest} 
                    nomeTest={nomeTest} 
                    domandeConNumeroEsame={domandeConNumeroEsame} 
                    domanda={domandeEsame[parseInt(nquestion)]} 
                    nquestion={parseInt(nquestion)} 
                    domandeCompilate={domandeCompilate} 
                    isLastQuestion={domandeEsame.length-1===parseInt(nquestion)}
                />
                :
                <NoPage/>
        )
        :
        (<p>L'esame si è ormai concluso</p>)
    );      
}

export default ExecuteExam;