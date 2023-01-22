import { configureStore} from "@reduxjs/toolkit";
import { AuthenticationSlice } from "./AuthenticationSlice";
import { ExamExecutionSlice } from "./ExamExecutionSlice";
import { VeroTestApi } from "./VeroTestApi";

export const Store = configureStore({
    reducer : {
        [VeroTestApi.reducerPath] : VeroTestApi.reducer,
        authentication : AuthenticationSlice.reducer,
        examExecution  : ExamExecutionSlice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(VeroTestApi.middleware)
});