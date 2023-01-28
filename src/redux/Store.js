import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { AuthenticationSlice } from "./AuthenticationSlice";
import { CreateExamSlice } from "./CreateExamSlice";
import { ExamCompletionSlice } from "./ExamCompletionSlice";
import { ExamExecutionSlice } from "./ExamExecutionSlice";
import { ExamPresentationSlice } from "./ExamPresentationSlice";
import { VeroTestApi } from "./VeroTestApi";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    [VeroTestApi.reducerPath] : VeroTestApi.reducer,
    authentication : AuthenticationSlice.reducer,
    createExam     : CreateExamSlice.reducer,
    exampresentation: ExamPresentationSlice.reducer,
    examexecution : ExamExecutionSlice.reducer,
    examcompletion: ExamCompletionSlice.reducer
});

const persistenceConfiguration = {
    key: 'VeroTestState',
    storage,
    blacklist:[VeroTestApi.reducerPath]
}

const persistedReducer = persistReducer(persistenceConfiguration,rootReducer);

export const Store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(VeroTestApi.middleware)
});

export const Persistor = persistStore(Store); 