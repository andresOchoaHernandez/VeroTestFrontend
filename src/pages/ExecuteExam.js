import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { addCompiledQuestion, changeAnswerToCompiledQuestion, domandeCompilateExecutionExam, endExamExecution } from "../redux/ExamExecutionSlice";
import { presentedExamData, presentedExamDomande, presentedExamDomandeConNumero,presentedExamNome,presentedExamOra,endExamPresentation} from "../redux/ExamPresentationSlice"
import { useCompleteTestMutation, useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";
import {setExamResults} from "../redux/ExamCompletionSlice"
import NoPage from "./NoPage";

function ExecuteExam(){

    const {nquestion} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(selectCurrentUserId);

    const dataTest = useSelector(presentedExamData);
    const oraTest = useSelector(presentedExamOra);
    const nomeTest = useSelector(presentedExamNome);
    const domandeConNumeroEsame = useSelector (presentedExamDomandeConNumero);
    const domandeEsame = useSelector (presentedExamDomande);
    const domandeCompilate = useSelector(domandeCompilateExecutionExam);

    const [selectedAnswersId,setAnswer] = useState(undefined)
    const handleSelectedAnswer = (event) =>{ setAnswer(event.target.value) }

    const insertCompilazione = useInsertCompilazioneMutation()[0];
    const completeTest = useCompleteTestMutation()[0];

    function checkIfanswered(nomeDomanda,idRisposta){
        let result = false;
        domandeCompilate.forEach((input)=>{
            if(input.nomeDomanda === nomeDomanda && input.risposta === parseInt(idRisposta)){
                result = true;
            }
        })
        return result;
    }

    function checkIfQuestionIsAnswered(nomeDomanda){
        let result = false;
        domandeCompilate.forEach((input)=>{
            if(input.nomeDomanda === nomeDomanda){
                result = true;
            }
        })
        return result;       
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const compilazione = {
            idUtente:userId,
            dataTest:dataTest,
            oraTest:oraTest,
            nomeTest:nomeTest,
            nomeDomanda:domandeEsame[nquestion].nome,
            idRisposta: parseInt(selectedAnswersId)
        }

        let pressedButton = window.event.submitter.name;
        console.log(pressedButton);

        /* UPDATE THE STATE OF THE EXAM EXECUTION */
        if(checkIfQuestionIsAnswered(compilazione.nomeDomanda)){

            let prevAnswer;
            domandeCompilate.forEach((input,index)=>{
                if(input.nomeDomanda === compilazione.nomeDomanda){
                    prevAnswer = input.risposta;
                }
            });

            if(isNaN(compilazione.idRisposta) || compilazione.idRisposta === prevAnswer ){ 

                if(pressedButton === "domSuc"){
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
                }
                else{
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
                }
                return;
            }

            dispatch(changeAnswerToCompiledQuestion({nomeDomanda:compilazione.nomeDomanda,nuovaRisposta:compilazione.idRisposta}))
        }
        else{
            dispatch(addCompiledQuestion({nomeDomanda:compilazione.nomeDomanda,risposta:compilazione.idRisposta}));
        }

        /* SAVE THE CURRENT EXAM EXECUTION STATE TO THE DB */
        try{
            if(pressedButton === "domSuc" || pressedButton === "domPrec"){
                const {data:{insertCompilazione:inserted}} = await insertCompilazione(compilazione).unwrap();
                if(!inserted){
                    console.log(" PROBLEMI DURANTE IL SALVATAGGIO DELLO STATO DEL TEST")
                }

                if(pressedButton==="domSuc"){
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
                }
                else{
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)-1}`);
                }
            }
            else if(pressedButton === "concludi"){
                const {data:{completeTest:results}} = await completeTest(compilazione).unwrap();
                dispatch(setExamResults ({dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest,results:results}))
                dispatch(endExamExecution());
                dispatch(endExamPresentation());
                navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/summary`);
            }
            else{
                console.log("ERRORE IMPREVISTO");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    let content;
    if(nquestion < domandeEsame.length){
        content = (
            <div id="domandaContainer">
                <div id="testoDomanda">
                    <p>{domandeConNumeroEsame?nquestion+" : "+domandeEsame[nquestion].testo:domandeEsame[nquestion].testo}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {domandeEsame[nquestion].risposte.map((input,index)=>{    
                        return (
                            <div key={index}>
                                <input defaultChecked={checkIfanswered(domandeEsame[nquestion].nome,input.id)} id={domandeEsame[nquestion].nome + input.id} onChange={handleSelectedAnswer} name="answer" type="radio" value={input.id} required/>
                                <label htmlFor={domandeEsame[nquestion].nome + input.id} >{ domandeEsame[nquestion].risposteConNumero?index+" : "+input.testo:input.testo}</label>
                            </div>
                        );
                    })}
                    {
                        domandeEsame.length === parseInt(nquestion)-1?
                        (<div>
                            <button name="domPrec" type="submit" >DOMANDA PRECEDENTE</button> 
                            <button name="concludi" type="submit" >CONCLUDI ESAME</button>
                        </div>)
                        :
                        parseInt(nquestion) - 1 < 0 ?
                            (<button name="domSuc" type="submit"> DOMANDA SUCCESSIVA </button>)
                            :
                            (<div>
                                <button name="domPrec" type="submit">DOMANDA PRECEDENTE</button> 
                                <button name="domSuc" type="submit">DOMANDA SUCCESSIVA</button>
                            </div>)

                    }
                </form>
            </div>
        );
    }
    else{
        content = <NoPage/>;
    }

    return content;
}

export default ExecuteExam;