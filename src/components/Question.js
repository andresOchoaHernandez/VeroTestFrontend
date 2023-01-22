//import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllAnswersOfQuestionQuery } from "../redux/VeroTestApiExams";

function Question({question,lastQuestion}){

    const navigate = useNavigate();
    const {data,ora,nome,nquestion} = useParams();

    const {data:answers,isLoading,isSuccess,isError,error} = useGetAllAnswersOfQuestionQuery(question.nome);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!lastQuestion){
            
            //TODO: aggiornare lo stato sullo store
            //TODO: chiamata API per salvare lo stato nel server

            navigate(`/esame/${data}/${ora}/${nome}/domanda/${parseInt(nquestion)+1}`);
        }
        else{
            
            //TODO: aggiornare lo stato sullo store
            //TODO: chiamata API per concludere l'esame  
            navigate(`/esame/${data}/${ora}/${nome}/summary`);
        }
    };

    return isLoading ? 
        <p>CARICAMENTO...</p>
        :
        isSuccess ?(
            <div>
                <div id="testoDomanda">
                    <p> {question.testo}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {answers.data.allRispostaOfDomanda.map(
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
            </div>)
            :
            isError ?
                (<p>{JSON.stringify(error)}</p>)
                :
                (<p>ERRORE NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SISTEMA</p>);
}

export default Question;