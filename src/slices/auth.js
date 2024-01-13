import { createSlice } from "@reduxjs/toolkit";

import { LoginUser } from "../services/authOperations/auth";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, actions) {
            state.isLoggedIn = actions.payload.isLoggedIn;
            state.token = actions.payload.token;
        },
        signOut(state, actions) {
            state.isLoggedIn = false;
            state.token = "";
        }
    }
})

export default slice.reducer;

export function UserLogin(formValues) {
    return async (dispatch, getState) => {
        try {
            const { result, token, success } = await LoginUser(formValues);

            if (success) {
                dispatch(slice.actions.logIn({
                    isLoggedIn: true,
                    token: token
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }
}