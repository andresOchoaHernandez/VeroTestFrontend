import { useParams } from "react-router-dom";

function ExecuteExam(){

    const params = useParams();
    console.log(params);
}

export default ExecuteExam;