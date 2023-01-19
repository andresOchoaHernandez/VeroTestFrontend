import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { VeroTestGraphqlAPI } from "./VeroTestGraphqlAPI";

function Question({question,lastQuestion}){

    console.log(lastQuestion);

    const params = useParams();

    const{nome,testo,punti,ordineCasuale,risposteConNumero} = question;

    console.log(punti,ordineCasuale,risposteConNumero); // TO BE DELETED

    const [answers,setData] = useState([]);
    
    useEffect(() => {VeroTestGraphqlAPI.getAllAnswersOfQuestion(nome).then(res=>{setData(res.allRispostaOfDomanda)}).catch(err => {console.log(err)});},[nome]);

    function submitQuestion(givenAnswer){
        if(!lastQuestion){
            //TODO: salva lo stato del test
            window.location.href=`/esame/${params.data}/${params.ora}/${params.nome}/domanda/${parseInt(params.nquestion) + 1}`;
        }
        else{
            //TODO: submit dell'esame e calcolo del punteggio
            window.location.href=localStorage.getItem("scope").includes("DOCENTE")? "/home-docenti" : "/home-studenti";
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
                                <input name="answer" type="radio" value={input.testo} required/>
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