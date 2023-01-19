import {useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VeroTestGraphqlAPI } from "./VeroTestGraphqlAPI";

function Question({question,lastQuestion}){

    const navigate = useNavigate();

    const params = useParams();

    const{nome,testo,punti,ordineCasuale,risposteConNumero} = question;

    function shuffle(punti,ordineCasuale,risposteConNumero){
        //TODO:
    }

    shuffle(punti,ordineCasuale,risposteConNumero)

    const [answers,setData] = useState([]);
    
    useEffect(() => {VeroTestGraphqlAPI.getAllAnswersOfQuestion(nome).then(res=>{setData(res.allRispostaOfDomanda)}).catch(err => {console.log(err)});},[nome]);

    async function submitQuestion(idAnswer){

        if(!lastQuestion){
            const compilazione = {
                idUtente: parseInt(localStorage.getItem("userId")),
                dataTest: params.data,
                oraTest:  params.ora,
                nomeTest: params.nome,
                nomeDomanda: nome,
                idRisposta: parseInt(idAnswer.answer)
            }

            await VeroTestGraphqlAPI.insertCompilazione(compilazione);      
            window.location.href=`/esame/${params.data}/${params.ora}/${params.nome}/domanda/${parseInt(params.nquestion) + 1}`;
        }
        else{
            const compilazione = {
                idUtente: parseInt(localStorage.getItem("userId")),
                dataTest: params.data,
                oraTest:  params.ora,
                nomeTest: params.nome,
                nomeDomanda: nome,
                idRisposta: parseInt(idAnswer.answer)
            }
            const riassunto = await VeroTestGraphqlAPI.completeTest(compilazione);
            navigate(`/esame/${params.data}/${params.ora}/${params.nome}/summary`,{state:riassunto})   
        }
    }

    return(
        <div>
            <div id="testoDomanda">
                <p> {testo}</p>
            </div>
            <form onSubmit={(event) => {event.preventDefault();submitQuestion(Object.fromEntries(new FormData(event.target)));}}>
                {answers.map(
                    (input,index)=>{
                        return(
                            <div key={index}>
                                <input name="answer" type="radio" value={input.id} required/>
                                <label htmlFor={input.testo}>{input.testo}</label>
                            </div>
                        );
                    }
                )}
                <button type="submit">{lastQuestion ?"CONCLUDI ESAME":"PROSSIMA DOMANDA"}</button>
            </form>
        </div>
    );
}

export default Question;