import { createSlice } from "@reduxjs/toolkit";

//TODO: after every refresh the state is initialstate, so the user will log out

export const AuthenticationSlice = createSlice({
    name : "authentication",
    initialState: {username:null,token:null,scope:null,userId:null,isLoggedIn:false},
    reducers:{
        setCredentials: (state,action) => {
            const {username,token,scope,userId} = action.payload;
            state.username = username;
            state.token    = token;
            state.scope    = scope;
            state.userId   = userId;
            state.isLoggedIn = true;
        },
        logout: state => {
            state.username = null;
            state.token    = null;
            state.scope    = null;
            state.userId   = null;
            state.isLoggedIn = false;
        }
    }
});

export const {setCredentials,logout} = AuthenticationSlice.actions;

export const selectCurrentUsername = (state) => state.authentication.username
export const selectCurrentToken    = (state) => state.authentication.token
export const selectCurrentScope    = (state) => state.authentication.scope
export const selectCurrentUserId   = (state) => state.authentication.userId
export const isLoggedIn            = (state) => state.authentication.isLoggedIn
