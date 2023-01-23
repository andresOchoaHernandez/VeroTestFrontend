//import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllAnswersOfQuestionQuery,useInsertCompilazioneMutation } from "../redux/VeroTestApiExams";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../redux/AuthenticationSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { selectCurrentAnswers, selectCurrentDataTest, selectCurrentNomeTest, selectCurrentOraTest, selectCurrentquestions, setExamExecution } from "../redux/ExamExecutionSlice";

function Question({question,lastQuestion}){

    /*=========*/
    console.log("============= DEBUG ===============")
    console.log(useSelector(selectCurrentDataTest))
    console.log(useSelector(selectCurrentOraTest ))
    console.log(useSelector(selectCurrentNomeTest))
    console.log(useSelector(selectCurrentquestions))
    console.log(useSelector(selectCurrentAnswers ))
    console.log("==================================")
    /*=========*/
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data,ora,nome,nquestion} = useParams();
    const idUtente = useSelector(selectCurrentUserId);

    const {data:answers,isLoading:isLoadingAnswers,isSuccess:isSuccessAnswers,isError:isErrorAnswers,error:errorAnswers} = useGetAllAnswersOfQuestionQuery(question.nome);
    const insertCompilazione = useInsertCompilazioneMutation()[0];

    const [idRisposta, setIdRisposta] = useState('');
    const rispostaRef = useRef()
    const [error,setErrorMessage] = useState('');
    const errorRef = useRef();

    useEffect(()=> {rispostaRef?.current?.focus()},[]);
    useEffect(()=> {setErrorMessage('')},[]);
    const handleAnswer = (event) => {setIdRisposta(event.target.value)}

    const answeredQuestions = useSelector(selectCurrentquestions);
    const givenAswers       = useSelector(selectCurrentAnswers);

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

        if(!lastQuestion){

            try{
                const response = await insertCompilazione(compilazione).unwrap();
                
                if(response.data.insertCompilazione){
                    
                    let newAnsweredQuestions = [];
                    answeredQuestions.forEach( qst => {
                        newAnsweredQuestions.push(qst);
                    })
                    newAnsweredQuestions.push(question.nome);

                    let newGivenAnswers = [];
                    givenAswers.forEach(answr => {
                        newGivenAnswers.push(answr)
                    })
                    newGivenAnswers.push(idRisposta);

                    dispatch(setExamExecution({
                        dataTest:data,
                        oraTest:ora,
                        nomeTest:nome,
                        questions:newAnsweredQuestions,
                        answers:newGivenAnswers, 
                    }))
                }
                else{
                    console.log("ERRORE NON GESTITO")
                }
            }
            catch(error){
                setErrorMessage(error.message);
                console.log("ERRORE NON PREVISTO")
                console.log(error)
            }

            navigate(`/esame/${data}/${ora}/${nome}/domanda/${parseInt(nquestion)+1}`);
        }
        else{
            navigate(`/esame/${data}/${ora}/${nome}/summary`);
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
                                    <input name="answer" type="radio" value={input.id} onChange={handleAnswer} ref={rispostaRef} required/>
                                    <label htmlFor={input.testo}>{input.testo}</label>
                                    <p ref={errorRef} value={error}></p>
                                </div>
                            );
                        }
                    )}
                    <button type="submit">{lastQuestion ?"CONCLUDI ESAME":"PROSSIMA DOMANDA"}</button>
                </form>
            </div>)
            :
            isErrorAnswers ?
                (<p>{JSON.stringify(errorAnswers)}</p>)
                :
                (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default Question;