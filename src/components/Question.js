import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setExamResults } from "../redux/ExamCompletionSlice";
import { addCompiledQuestion, changeAnswerToCompiledQuestion, endExamExecution } from "../redux/ExamExecutionSlice";
import { endExamPresentation } from "../redux/ExamPresentationSlice";
import { useCompleteTestMutation, useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";
import classesHome from "../pages/layout/HomePage.module.css";
import classesTest from "../pages/layout/TestPage.module.css";

function Question({userId,dataTest,oraTest,nomeTest,domandeConNumeroEsame,domanda,nquestion,isLastQuestion,domandeCompilate})
{
    const eligibleAnswerId = [];

    for(const risposta of domanda.risposte){
        eligibleAnswerId.push(parseInt(risposta.id));
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedAnswersId,setAnswer] = useState('')
    const handleSelectedAnswer = (event) =>{setAnswer(event.target.value)}

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

    const concludiEsame = async (compilazione) => {
        const {data:{completeTest:results}} = await completeTest(compilazione).unwrap();
        dispatch(setExamResults({dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest,results:results}))
        dispatch(endExamExecution());
        dispatch(endExamPresentation());
        navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/summary`);
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

        if(isNaN(compilazione.idRisposta)){ 

            if(pressedButton === "domSuc"){
                navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
            }
            else if(pressedButton === "domPrec"){
                navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)-1}`);
            }
            else if(pressedButton === "concludi"){
                domandeCompilate.forEach((input,index)=>{
                    if(input.nomeDomanda === compilazione.nomeDomanda){
                        compilazione.idRisposta = input.risposta;
                    }
                });
                concludiEsame(compilazione);
            }

            return;
        }

        if(checkIfQuestionIsAnswered(compilazione.nomeDomanda)){

            let prevAnswer;
            domandeCompilate.forEach((input,index)=>{
                if(input.nomeDomanda === compilazione.nomeDomanda){
                    prevAnswer = input.risposta;
                }
            });

            if(compilazione.idRisposta === prevAnswer ){ 

                if(pressedButton === "domSuc"){
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
                }
                else if(pressedButton === "domPrec"){
                    navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)-1}`);
                }
                else if(pressedButton === "concludi"){
                    concludiEsame(compilazione);
                }
                return;
            }
            else{
                /* side effect => answers of unrelated questions are registered*/
                if(!eligibleAnswerId.includes(compilazione.idRisposta)){
                    if(pressedButton === "domSuc"){
                        navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)+1}`);
                    }
                    else if(pressedButton === "domPrec"){
                        navigate(`/esame/${dataTest}/${oraTest}/${nomeTest}/${parseInt(nquestion)-1}`);
                    }
                    else if(pressedButton === "concludi"){
                        domandeCompilate.forEach((input,index)=>{
                            if(input.nomeDomanda === compilazione.nomeDomanda){
                                compilazione.idRisposta = input.risposta;
                            }
                        });
                        concludiEsame(compilazione);
                    }
                    return;
                }
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
                concludiEsame(compilazione);
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
        <div className={classesHome.home}>
            <div className={classesHome.question}>
                <div id="testoDomanda">
                    <h4>{domandeConNumeroEsame?nquestion+" : "+domanda.testo:domanda.testo}</h4>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                    {domanda.risposte.map((input,index)=>{
                        return (
                            <div className={classesTest.test} key={domanda.nome + index}>
                                <input defaultChecked={checkIfanswered(domanda.nome,input.id)} name={domanda.nome} type="radio" value={input.id} onChange={handleSelectedAnswer} required/>
                                <label htmlFor={domanda.nome} >{domanda.risposteConNumero?index+" : "+input.testo:input.testo}</label>
                            </div>
                        );
                    })}
                    {
                        isLastQuestion?
                        (<div>
                            <button className={classesTest.buttonmanagequestion} name="domPrec" type="submit" >DOMANDA PRECEDENTE</button> 
                            <button className={classesTest.buttonmanagequestion} name="concludi" type="submit" >CONCLUDI ESAME</button>
                        </div>)
                        :
                        nquestion - 1 < 0 ?
                            (<button className={classesTest.buttonmanagequestion} name="domSuc" type="submit"> DOMANDA SUCCESSIVA </button>)
                            :
                            (<div>
                                <button className={classesTest.buttonmanagequestion} name="domPrec" type="submit">DOMANDA PRECEDENTE</button> 
                                <button className={classesTest.buttonmanagequestion} name="domSuc" type="submit">DOMANDA SUCCESSIVA</button>
                            </div>)
                    }
                </form>
            </div>
        </div>
    );
    

}

export default Question;