import { createSlice } from "@reduxjs/toolkit";

export const CreateExamSlice = createSlice({
    name : "createExam",
    initialState: {
        dataTest : null,
        oraTest  : null,
        nomeTest : null,
        ordineCasuale: false,
        domandeConNumero: false
    },
    reducers:{
        setExamCreation: (state,action) => {
            const {dataTest,oraTest,nomeTest,ordineCasuale,domandeConNumero} = action.payload;
            state.dataTest  = dataTest;
            state.oraTest   = oraTest;
            state.nomeTest  = nomeTest;
            state.ordineCasuale = ordineCasuale;
            state.domandeConNumero = domandeConNumero;
        },
        endExamCreation: (state) => {     
            state.dataTest = null;
            state.oraTest  = null;
            state.nomeTest = null;
            state.ordineCasuale = false;
            state.domandeConNumero = false;
        }
    }
});

export const {setExamCreation,endExamCreation} = CreateExamSlice.actions;

export const selectCurrentDataTestCreation  = (state) => state.createExam.dataTest;
export const selectCurrentOraTestCreation   = (state) => state.createExam.oraTest;
export const selectCurrentNomeTestCreation  = (state) => state.createExam.nomeTest;
export const selectCurrentOrdineCasualeTestCreation = (state) => state.createExam.ordineCasuale;
export const selectCurrentDomandeConNumeroTestCreation = (state) => state.createExam.domandeConNumero;