import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setExamResults } from "../redux/ExamCompletionSlice";
import { addCompiledQuestion, changeAnswerToCompiledQuestion, endExamExecution } from "../redux/ExamExecutionSlice";
import { endExamPresentation } from "../redux/ExamPresentationSlice";
import { useCompleteTestMutation, useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";

function Question({
    userId,
    dataTest,
    oraTest,
    nomeTest,
    domandeConNumeroEsame,
    domanda,
    nquestion,
    isLastQuestion,
    domandeCompilate
})
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        let pressedButton = window.event.submitter.name;

        const compilazione = {
            idUtente:userId,
            dataTest:dataTest,
            oraTest:oraTest,
            nomeTest:nomeTest,
            nomeDomanda:domanda.nome,
            idRisposta: parseInt(selectedAnswersId)
        }

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
                else if(pressedButton === "domPrec"){
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)-1}`);
                }
                return;
            }

            dispatch(changeAnswerToCompiledQuestion({nomeDomanda:compilazione.nomeDomanda,nuovaRisposta:compilazione.idRisposta}))
        }
        else{
            dispatch(addCompiledQuestion({nomeDomanda:compilazione.nomeDomanda,risposta:compilazione.idRisposta}));
        }

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
                dispatch(setExamResults({dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest,results:results}))
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


    return (
        <div id="domandaContainer">
            <div id="testoDomanda">
                <p>{domandeConNumeroEsame?nquestion+" : "+domanda.testo:domanda.testo}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {domanda.risposte.map((input,index)=>{

                    return (
                        <div key={index}>
                            <input defaultChecked={checkIfanswered(domanda.nome,input.id)} id={domanda.nome + input.id} onChange={handleSelectedAnswer} name="answer" type="radio" value={input.id} required/>
                            <label htmlFor={domanda.nome + input.id} >{ domanda.risposteConNumero?index+" : "+input.testo:input.testo}</label>
                        </div>
                    );
                })}
                {
                    isLastQuestion?
                    (<div>
                        <button name="domPrec" type="submit" >DOMANDA PRECEDENTE</button> 
                        <button name="concludi" type="submit" >CONCLUDI ESAME</button>
                    </div>)
                    :
                    nquestion - 1 < 0 ?
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

export default Question;