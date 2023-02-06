import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "../pages/Login";
import { logout } from "../redux/AuthenticationSlice";
import { endExamCreation } from "../redux/CreateExamSlice";
import { endExamPresentation } from "../redux/ExamPresentationSlice";
import { endExamExecution } from "../redux/ExamExecutionSlice";
import { endExamResults } from "../redux/ExamCompletionSlice";

function LogOut(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logout());
        dispatch(endExamCreation());
        dispatch(endExamPresentation());
        dispatch(endExamExecution());
        dispatch(endExamResults());
    },[dispatch]);

    return <Login/>;
}

export default LogOut;