import { createSlice } from "@reduxjs/toolkit";

export const ExamCompletionSlice = createSlice({
    name : "examCompletion",
    initialState: {
        dataTest : null,
        oraTest  : null,
        nomeTest : null,
        results  : []
    },
    reducers:{
        setExamResults: (state,action) => {
            const {dataTest,oraTest,nomeTest,results} = action.payload;
            state.dataTest  = dataTest;
            state.oraTest   = oraTest;
            state.nomeTest  = nomeTest;
            state.results   = results;
        },
        endExamResults: (state) => {     
            state.dataTest = null;
            state.oraTest  = null;
            state.nomeTest = null;
            state.results  = [];
        }
    }
});

export const {setExamResults,endExamResults} = ExamCompletionSlice.actions;

export const selectCurrentDataTestResult  = (state) => state.examCompletion.dataTest
export const selectCurrentOraTestResult   = (state) => state.examCompletion.oraTest
export const selectCurrentNomeTestResult  = (state) => state.examCompletion.nomeTest
export const selectCurrentResults         = (state) => state.examCompletion.results