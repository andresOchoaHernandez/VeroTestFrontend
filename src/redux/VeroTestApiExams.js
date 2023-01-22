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
        })
    })
});

export const { useGetAllExamsQuery } = VeroTestApiExams;