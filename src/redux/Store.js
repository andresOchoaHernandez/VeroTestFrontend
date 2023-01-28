import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { AuthenticationSlice } from "./AuthenticationSlice";
import { CreateExamSlice } from "./CreateExamSlice";
import { ExamCompletionSlice } from "./ExamCompletionSlice";
import { ExamExecutionSlice } from "./ExamExecutionSlice";
import { ExamPresentationSlice } from "./ExamPresentationSlice";
import { VeroTestApi } from "./VeroTestApi";

const rootReducer = combineReducers({
    [VeroTestApi.reducerPath] : VeroTestApi.reducer,
    authentication : AuthenticationSlice.reducer,
    createExam     : CreateExamSlice.reducer,
    exampresentation: ExamPresentationSlice.reducer,
    examexecution : ExamExecutionSlice.reducer,
    examcompletion: ExamCompletionSlice.reducer
});

export const Store = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(VeroTestApi.middleware)
});