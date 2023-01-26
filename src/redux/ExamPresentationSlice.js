import { createSlice } from "@reduxjs/toolkit";

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
  
export const ExamPresentationSlice = createSlice({
    name : "exampresentation",
    initialState: {
        data: null,
        ora:null,
        nome:null,
        ordineCasuale:null,
        domandeConNumero:null,
        domande:null
    },
    reducers:{
        setExamPresentation: (state,action) => {
            const {data,ora,nome,ordineCasuale,domandeConNumero,domande} = action.payload;
            state.data = data;
            state.ora = ora;
            state.nome = nome;
            state.ordineCasuale = ordineCasuale;
            state.domandeConNumero = domandeConNumero;
            state.domande = ordineCasuale?shuffle(domande):domande;

            state.domande.forEach((input,index)=>{
                if(input.ordineCasuale){
                    input.risposte = shuffle(input.risposte)
                }
            })
        },
        endExamPresentation: (state) => {
            state.data = null;
            state.ora = null;
            state.nome = null;
            state.ordineCasuale = null;
            state.domandeConNumero = null;
            state.domande = null; 
        }
    }
});

export const {setExamPresentation,endExamPresentation} = ExamPresentationSlice.actions;

export const presentedExamData = (state) => state.exampresentation.data;
export const presentedExamOra = (state) => state.exampresentation.ora;
export const presentedExamNome = (state) => state.exampresentation.nome;
export const presentedExamOrdineCasuale = (state) => state.exampresentation.ordineCasuale;
export const presentedExamDomandeConNumero = (state) => state.exampresentation.domandeConNumero;
export const presentedExamDomande = (state) => state.exampresentation.domande;