import { createSlice } from "@reduxjs/toolkit";

export const CreateExamSlice = createSlice({
    name : "createExam",
    initialState: {
        dataTest : null,
        oraTest  : null,
        nomeTest : null,
        ordineCasuale: false,
        domandeConNumero: false,
        domande: []
    },
    reducers:{
        setExam: (state,action) => {
            const {dataTest,oraTest,nomeTest,ordineCasuale,domandeConNumero} = action.payload;
            state.dataTest  = dataTest;
            state.oraTest   = oraTest;
            state.nomeTest  = nomeTest;
            state.ordineCasuale = ordineCasuale;
            state.domandeConNumero = domandeConNumero;
        },
        addQuestion: (state,action) => {
            const domande = action.payload;
            state.domande.push(domande);
        },
        deleteQuestion:(state,action)=>{
            const index = action.payload;
            state.domande.splice(index,1);
        },
        endExamCreation: (state) => {     
            state.dataTest = null;
            state.oraTest  = null;
            state.nomeTest = null;
            state.ordineCasuale = false;
            state.domandeConNumero = false;
            state.domande=[];
        }
    }
});

export const {setExam,addQuestion,endExamCreation} = CreateExamSlice.actions;

export const selectCurrentDataTestCreation  = (state) => state.createExam.dataTest;
export const selectCurrentOraTestCreation   = (state) => state.createExam.oraTest;
export const selectCurrentNomeTestCreation  = (state) => state.createExam.nomeTest;
export const selectCurrentOrdineCasualeTestCreation = (state) => state.createExam.ordineCasuale;
export const selectCurrentDomandeConNumeroTestCreation = (state) => state.createExam.domandeConNumero;
export const selectCurrentDomandeTestCreation = (state) => state.createExam.domande;