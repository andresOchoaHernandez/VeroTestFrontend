import { createSlice } from "@reduxjs/toolkit";

export const ExamExecutionSlice = createSlice({
    name : "examexecution",
    initialState: {
        data: null,
        ora:null,
        nome:null,
        domandeCompilate:null
    },
    reducers:{
        setExamExecution: (state,action) => {
            const {data,ora,nome,domandeCompilate} = action.payload;
            state.data = data;
            state.ora = ora;
            state.nome = nome;
            state.domandeCompilate = domandeCompilate;
        },
        changeAnswerToCompiledQuestion: (state,action) => {
            const {nomeDomanda,nuovaRisposta} = action.payload;
            state.domandeCompilate.forEach((input)=>{
                if(nomeDomanda === input.nomeDomanda){
                    input.risposta = nuovaRisposta;
                }
            });
        },
        addCompiledQuestion: (state,action) =>{
            const {nomeDomanda,risposta} = action.payload;
            state.domandeCompilate.push({nomeDomanda:nomeDomanda,risposta:risposta});
        },
        endExamExecution: (state) => {
            state.data = null;
            state.ora = null;
            state.nome = null;
            state.domandeCompilate = null;
        }
    }
});

export const {setExamExecution,changeAnswerToCompiledQuestion,addCompiledQuestion,endExamExecution} = ExamExecutionSlice.actions;

export const dataExecutionExam = (state) => state.examexecution.data;
export const oraExecutionExam = (state) => state.examexecution.ora;
export const nomeExecutionExam = (state) => state.examexecution.nome;
export const domandeCompilateExecutionExam = (state) => state.examexecution.domandeCompilate;