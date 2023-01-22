import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataTest : null,
    oraTest  : null,
    nomeTest : null,
    questions: null,
    answers  : null
}

export const ExamExecutionSlice = createSlice({
    name : "examExecution",
    initialState: initialState,
    reducers:{
        setExamExecution: (state,action) => {
            const {dataTest,oraTest,nomeTest,questions,answers} = action.payload;
            state.dataTest  = dataTest;
            state.oraTest   = oraTest;
            state.nomeTest  = nomeTest;
            state.questions = questions;
            state.answers   = answers;
        }
    }
});

export const {setExamExecution} = ExamExecutionSlice.actions;

export const selectCurrentDataTest  = (state) => state.examExecution.dataTest
export const selectCurrentOraTest   = (state) => state.examExecution.oraTest
export const selectCurrentNomeTest  = (state) => state.examExecution.nomeTest
export const selectCurrentquestions = (state) => state.examExecution.questions
export const selectCurrentAnswers   = (state) => state.examExecution.answers