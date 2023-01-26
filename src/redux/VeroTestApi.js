import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().authentication.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
            headers.set("Content-Type","application/json");
        }
        return headers
    }
});

const veroTestApiQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
};

export const VeroTestApi = createApi({
    baseQuery: veroTestApiQuery,
    endpoints: builder => ({})
});