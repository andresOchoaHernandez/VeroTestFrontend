import { createSlice } from "@reduxjs/toolkit";

export const ExamCompletionSlice = createSlice({
    name : "examcompletion",
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

export const selectCurrentDataTestResult  = (state) => state.examcompletion.dataTest
export const selectCurrentOraTestResult   = (state) => state.examcompletion.oraTest
export const selectCurrentNomeTestResult  = (state) => state.examcompletion.nomeTest
export const selectCurrentResults         = (state) => state.examcompletion.results