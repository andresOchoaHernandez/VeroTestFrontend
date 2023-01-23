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
    })
});

export const { useGetAllExamsQuery } = VeroTestApiExams;
export const { useGetAllQuestionsOfTestQuery } = VeroTestApiExams;
export const { useGetAllAnswersOfQuestionQuery } = VeroTestApiExams;
export const { useInsertCompilazioneMutation } = VeroTestApiExams;
export const { useCompleteTestMutation} = VeroTestApiExams;