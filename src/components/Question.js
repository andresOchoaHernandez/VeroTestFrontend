import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setExamResults } from "../redux/ExamCompletionSlice";
import { addCompiledQuestion, changeAnswerToCompiledQuestion, endExamExecution } from "../redux/ExamExecutionSlice";
import { endExamPresentation } from "../redux/ExamPresentationSlice";
import { useCompleteTestMutation, useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";
import classesHome from "../pages/layout/HomePage.module.css";
import classesTest from "../pages/layout/TestPage.module.css";
import NavigationBar from "./NavigationBar";

function Question({userId,dataTest,oraTest,nomeTest,domandeConNumeroEsame,domanda,nquestion,isLastQuestion,domandeCompilate})
{
    const eligibleAnswerId = []; //array per tutte le possibili risposte di una domanda

    for(const risposta of domanda.risposte){ //popolo array con l'id di tutte le possibili risposte
        eligibleAnswerId.push(parseInt(risposta.id));
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedAnswersId,setAnswer] = useState('')
    const handleSelectedAnswer = (event) =>{setAnswer(event.target.value)}

    //funzioni per interagire con il back-end per inserire compilazione e completare il test
    const insertCompilazione = useInsertCompilazioneMutation()[0];
    const completeTest = useCompleteTestMutation()[0];

    //verifico se domanda è stata risposta e con che risposta
    function checkIfanswered(nomeDomanda,idRisposta){
        let result = false;
        domandeCompilate.forEach((input)=>{
            if(input.nomeDomanda === nomeDomanda && input.risposta === parseInt(idRisposta)){
                result = true;
            }
        })
        return result;
    }

    //verifico se domanda è stata risposta
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
        const {data:{completeTest:results}} = await completeTest(compilazione).unwrap(); //il server mi restituisce i risultati della compilazione
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

        //l'utente non ha selezionato nessuna risposta
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

        //l'utente ha modificato una risposta data in precedenza (verifico se domanda è tra l'elenco delle domande compilate)
        if(checkIfQuestionIsAnswered(compilazione.nomeDomanda)){

            let prevAnswer;
            domandeCompilate.forEach((input,index)=>{
                if(input.nomeDomanda === compilazione.nomeDomanda){
                    prevAnswer = input.risposta;
                }
            });

            //se le due risposte sono uguali
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
            //se non sono uguali perchè si verifica side effect
            else{
                /* side effect => answers of unrelated questions are registered*/
                if(!eligibleAnswerId.includes(compilazione.idRisposta)){ //verifico che idRisposta appena data non sia tra quelle possibili per quella domanda
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
            //se non sono uguali e quindi l'utente ha modificato la risposta data ad una domanda già compilata
            dispatch(changeAnswerToCompiledQuestion({nomeDomanda:compilazione.nomeDomanda,nuovaRisposta:compilazione.idRisposta}))
        }
        //l'utente ha selezionato la risposta
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

    const questionReference = useRef();
    useEffect(()=>{questionReference.current.focus();},[])

    return (
        <div className={classesHome.home} ref={questionReference}>
            <NavigationBar/>
            <div className={classesHome.question} tabIndex="0">
                <div id="testoDomanda" tabIndex="0">
                    <h4>{domandeConNumeroEsame?nquestion+" : "+domanda.testo:domanda.testo}</h4>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                    {domanda.risposte.map((input,index)=>{
                        return (
                            <div className={classesTest.test} key={domanda.nome + index}>
                                <input id={domanda.nome.replace(/\s/g,"") + input.id} defaultChecked={checkIfanswered(domanda.nome,input.id)} name={domanda.nome} type="radio" value={input.id} onChange={handleSelectedAnswer} required/>
                                <label htmlFor={domanda.nome.replace(/\s/g,"") + input.id} >{domanda.risposteConNumero?index+" : "+input.testo:input.testo}</label>
                            </div>
                        );
                    })}
                    {
                        isLastQuestion? //ultima domanda
                        (<div>
                            <button className={classesTest.buttonmanagequestion} name="domPrec" type="submit" >DOMANDA PRECEDENTE</button> 
                            <button className={classesTest.buttonmanagequestion} name="concludi" type="submit" >CONCLUDI ESAME</button>
                        </div>)
                        :
                        nquestion - 1 < 0 ? //prima domanda
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