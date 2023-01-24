import { configureStore} from "@reduxjs/toolkit";
import { AuthenticationSlice } from "./AuthenticationSlice";
import { CreateExamSlice } from "./CreateExamSlice";
import { ExamCompletionSlice } from "./ExamCompletionSlice";
import { ExamExecutionSlice } from "./ExamExecutionSlice";
import { VeroTestApi } from "./VeroTestApi";

export const Store = configureStore({
    reducer : {
        [VeroTestApi.reducerPath] : VeroTestApi.reducer,
        authentication : AuthenticationSlice.reducer,
        examExecution  : ExamExecutionSlice.reducer,
        examCompletion : ExamCompletionSlice.reducer,
        createExam     : CreateExamSlice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(VeroTestApi.middleware)
});