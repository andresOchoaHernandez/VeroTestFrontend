import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import { VeroTestGraphqlAPI } from "../components/VeroTestGraphqlAPI";

//TODO: modificare utilizzando l'api con redux

function ExecuteExam(){
    const {data,ora,nome,nquestion} = useParams();
    const [questions,setData] = useState([]);
    
    useEffect(() => {VeroTestGraphqlAPI.getAllQuestionsOfTest(data,ora,nome).then(res=>{setData(res.allDomandaByTest)}).catch(err => {console.log(err)});},[data,ora,nome]);

    return(
        <div>
            {nquestion < questions.length ? <Question question={questions[nquestion]} lastQuestion={parseInt(nquestion) === parseInt(questions.length-1)}/> : <div>Questa domanda non esiste in questo esame</div>}
        </div>
    );
}

export default ExecuteExam;