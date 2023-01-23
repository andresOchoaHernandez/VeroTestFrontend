import { createSlice } from "@reduxjs/toolkit";

export const ExamExecutionSlice = createSlice({
    name : "examExecution",
    initialState: {
        dataTest : null,
        oraTest  : null,
        nomeTest : null,
        qstAnsw  : []
    },
    reducers:{
        setExamExecution: (state,action) => {
            const {dataTest,oraTest,nomeTest,qstAnsw} = action.payload;
            state.dataTest  = dataTest;
            state.oraTest   = oraTest;
            state.nomeTest  = nomeTest;
            state.qstAnsw   = qstAnsw;
        },
        endExam: (state) => {
            state.dataTest  = null;
            state.oraTest   = null;
            state.nomeTest  = null;
            state.qstAnsw   = []
        }
    }
});

export const {setExamExecution,endExam} = ExamExecutionSlice.actions;

export const selectCurrentDataTest  = (state) => state.examExecution.dataTest
export const selectCurrentOraTest   = (state) => state.examExecution.oraTest
export const selectCurrentNomeTest  = (state) => state.examExecution.nomeTest
export const selectCurrentqstAnsw   = (state) => state.examExecution.qstAnsw