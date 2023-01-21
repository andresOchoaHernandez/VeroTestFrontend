import { VeroTestApi } from "./VeroTestApi";

export const VeroTestApiAuthentication = VeroTestApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/token',
                method:'POST',
                body: {...credentials},
                responseHandler: "text"
            })
        })
    })
});

export const { useLoginMutation } = VeroTestApiAuthentication;