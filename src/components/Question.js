import { useNavigate, useParams } from "react-router-dom";
import { useCompleteTestMutation, useGetAllAnswersOfQuestionQuery,useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { endExam, selectCurrentqstAnsw, setExamExecution } from "../redux/ExamExecutionSlice";
import { setExamResults } from "../redux/ExamCompletionSlice";

function checkIfQuestionIsPresent(array,question){

    let result = false;
    
    array.forEach(elem => {
        if(elem.question.localeCompare(question) === 0){
            result = true
        }
    })

    return result;
}

function checkIfAnswerIsPresent(array,answer){
    
    let result = false;

    array.forEach(elem => {
        if(elem.answer === answer){
            result = true;
        }
    })

    return result;
}

function Question({question,lastQuestion}){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data,ora,nome,nquestion} = useParams();
    const idUtente = useSelector(selectCurrentUserId);

    const {data:answers,isLoading:isLoadingAnswers,isSuccess:isSuccessAnswers,isError:isErrorAnswers,error:errorAnswers} = useGetAllAnswersOfQuestionQuery(question.nome);
    const insertCompilazione = useInsertCompilazioneMutation()[0];
    const completeTest = useCompleteTestMutation()[0];

    const [idRisposta, setIdRisposta] = useState('');
    const rispostaRef = useRef()
    const [error,setErrorMessage] = useState('');
    const errorRef = useRef();

    useEffect(()=> {rispostaRef?.current?.focus()},[]);

    const handleAnswer = (event) => {setIdRisposta(event.target.value)};

    const qstAnsw = useSelector(selectCurrentqstAnsw);

    const handleSubmit = async (event) => {

        event.preventDefault();

        const compilazione = {
            idUtente:idUtente,
            dataTest:data,
            oraTest:ora,
            nomeTest:nome,
            nomeDomanda:question.nome,
            idRisposta: parseInt(idRisposta)
        }

        let indexOfprevAnswer;
        
        if(checkIfQuestionIsPresent(qstAnsw,question.nome)){

            let previousAnswer;

            qstAnsw.forEach((elem,index)=> {
                if(elem.question === question.nome){
                    previousAnswer = elem.answer;
                    indexOfprevAnswer = index;
                }
            })

            if(isNaN(parseInt(idRisposta)) || previousAnswer === parseInt(idRisposta)){
                navigate(`/esame/${data}/${ora}/${nome}/domanda/${parseInt(nquestion)+1}`);
                return;
            }
        }

        try{
            if(!lastQuestion){
                const response = await insertCompilazione(compilazione).unwrap();
                
                if(response?.data?.insertCompilazione){
                   
                    let newQstAnsw = [];

                    qstAnsw.forEach(element => {
                        newQstAnsw.push(element);
                    });

                    if(indexOfprevAnswer !== undefined){
                        newQstAnsw.splice(indexOfprevAnswer,1);
                    }

                    newQstAnsw.push({question:question.nome,answer:parseInt(idRisposta)})
                   
                    dispatch(setExamExecution({dataTest:data,oraTest:ora,nomeTest:nome,qstAnsw:newQstAnsw}));
                    navigate(`/esame/${data}/${ora}/${nome}/domanda/${parseInt(nquestion)+1}`);
                }
                else{
                    setErrorMessage("NON È STATO POSSIBILE EFFETTUARE IL SALVATAGGIO DELLA RISPOSTA NEL SERVER");
                }
            }
            else{
                const response = await completeTest(compilazione).unwrap();
                dispatch(setExamResults({dataTest:data,oraTest:ora,nomeTest:nome,results:response.data.completeTest}))
                dispatch(endExam());
                navigate(`/esame/${data}/${ora}/${nome}/summary`);
            }
        }
        catch(exception){
            if(exception?.status === "FETCH_ERROR"){
                setErrorMessage("NON È STATO POSSIBILE EFFETTUARE IL SALVATAGGIO DELLA RISPOSTA NEL SERVER");
            }
            else if(exception?.status === 401){
                setErrorMessage("NON AUTORIZZATO, EFFETTUARE DI NUOVO IL LOGIN");
            }
            else{
                setErrorMessage("ERRORE LOGIN NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SITO");
                console.log(exception)
            }
        }
    };

    return isLoadingAnswers ? 
        <p>CARICAMENTO...</p>
        :
        isSuccessAnswers ?(
            <div>
                <div id="testoDomanda">
                    <p> {question.testo}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {answers.data.allRispostaOfDomanda.map(
                        (input,index)=>{
                            return(
                                <div key={index}>
                                    <input defaultChecked={checkIfQuestionIsPresent(qstAnsw,question.nome) && checkIfAnswerIsPresent(qstAnsw,parseInt(input.id))} name="answer" type="radio" value={input.id} onChange={handleAnswer} onClick={handleAnswer} onInput = {handleAnswer} ref={rispostaRef} required/>
                                    <label htmlFor={input.testo}>{input.testo}</label>
                                </div>
                            );
                        }
                    )}
                    <button type="submit">{lastQuestion ?"CONCLUDI ESAME":"PROSSIMA DOMANDA"}</button>
                </form>
                <p ref={errorRef} value={error} className={error? "error" : "offscreen"} aria-live="assertive">{error}</p>
            </div>)
            :
            isErrorAnswers ?
                (<p>{JSON.stringify(errorAnswers)}</p>)
                :
                (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default Question;