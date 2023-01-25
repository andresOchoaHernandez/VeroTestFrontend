import { VeroTestApi } from "./VeroTestApi";

export const VeroTestApiExams = VeroTestApi.injectEndpoints({
    endpoints: builder => ({
        getAllExams: builder.query({
            query: () => ({
                url: '/graphql',
                method:'POST',
                body: JSON.stringify({
                    query: `                 
                        query allTest{
                            allTest{
                                data,
                                ora,
                                nome,
                                ordineCasuale,
                                domandeConNumero
                            }
                    }`
                })
            })
        }),
        getAllQuestionsOfTest: builder.query({
            query: ({data,ora,nome}) => ({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query: `
                        query allDomandaByTest($data:String!,$hour:String!,$nome:String!){
                            allDomandaByTest(data:$data,hour:$hour,nome:$nome){
                                nome,
                                testo,
                                punti,
                                ordineCasuale,
                                risposteConNumero
                            }
                    }`,
                    variables: {
                        data:data,
                        hour:ora,
                        nome:nome
                    }
                })
            })
        }),
        getAllAnswersOfQuestion: builder.query({
            query: (question) => ({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query: `        
                        query allRispostaOfDomanda($domanda:String!){
                            allRispostaOfDomanda(domanda:$domanda){
                                id,
                                testo,
                                punteggio
                            }
                    }`,
                    variables: {
                        domanda:question
                    }
                })
            })
        }),
        insertCompilazione : builder.mutation({
            query: (compilazione) => ({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        mutation insertCompilazione($input:compilazioneInput){
                            insertCompilazione(input:$input)
                    }`,
                    variables: {
                        input:compilazione
                    }
                })
            })
        }),
        completeTest: builder.mutation({
            query: (compilazione) => ({
                url: '/graphql',
                method : 'POST',
                body: JSON.stringify({
                    query:`
                        mutation completeTest($input:compilazioneInput){
                            completeTest(input:$input){
                                rispostaData,
                                puntiRispostaData,
                                rispostaEsatta
                            }
                    }`,
                    variables: {
                        input:compilazione
                    }
                })
            })
        }),
        allCompilazioniByUserOfExam: builder.mutation({
            query: ({idUtente,dataTest,oraTest,nomeTest}) => ({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        query allCompilazioniByUserOfExam($idUtente:Int!,$dataTest:String!,$oraTest:String!,$nomeTest:String!){
                            allCompilazioniByUserOfExam(idUtente:$idUtente,dataTest:$dataTest,oraTest:$oraTest,nomeTest:$nomeTest){
                                idUtente,
                                dataTest,
                                oraTest,
                                nomeTest,
                                nomeDomanda,
                                idRisposta
                            }
                    }`,
                    variables: {
                        idUtente: idUtente,
                        dataTest: dataTest,
                        oraTest:  oraTest,
                        nomeTest: nomeTest
                    }
                })
            })
        }),
        createTest: builder.mutation({
            query: (testInput)=>({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        mutation createTest($input:testInput){
                            createTest(input:$input)
                    }`,
                    variables:{
                        input:testInput
                    }
                })         
            })
        }),
        createDomanda: builder.mutation({
            query: (domandaInput)=>({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        mutation createDomanda($input:domandaInput){
                            createDomanda(input:$input)
                    }`,
                    variables:{
                        input:domandaInput
                    }
                })         
            })
        }),
        createRisposta: builder.mutation({
            query: (rispostaInput)=>({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        mutation createRisposta($input:rispostaInput){
                            createRisposta(input:$input)
                    }`,
                    variables:{
                        input:rispostaInput
                    }
                })         
            })
        }),
        connectDomandaToTest: builder.mutation({
            query: (intestInput)=>({
                url: '/graphql',
                method: 'POST',
                body: JSON.stringify({
                    query:`
                        mutation connectDomandaToTest($input:intestInput){
                            connectDomandaToTest(input:$input)
                    }`,
                    variables:{
                        input:intestInput
                    }
                })         
            })
        }),

    })
});

export const { useGetAllExamsQuery } = VeroTestApiExams;
export const { useGetAllQuestionsOfTestQuery } = VeroTestApiExams;
export const { useGetAllAnswersOfQuestionQuery } = VeroTestApiExams;
export const { useInsertCompilazioneMutation } = VeroTestApiExams;
export const { useCompleteTestMutation} = VeroTestApiExams;
export const { useAllCompilazioniByUserOfExamMutation} = VeroTestApiExams;
export const {useCreateTestMutation} = VeroTestApiExams;
export const {useCreateDomandaMutation} = VeroTestApiExams;
export const {useCreateRispostaMutation} = VeroTestApiExams;
export const {useConnectDomandaToTestMutation} = VeroTestApiExams;