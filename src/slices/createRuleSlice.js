import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formToggle: true,
    allRules: []
}

const createRuleSlice = createSlice({
    name: "createRule",
    initialState: initialState,
    reducers: {
        setFormToggle(state, value) {
            state.formToggle = !state.formToggle
        },
        addRules(state, value) {
            state.allRules = [...value.payload.allRules]
        },
        resetAllRules(state, value) {
            state.allRules = initialState.allRules;
        }
    }
});

export default createRuleSlice.reducer;

export function SetFormToggle() {
    return async (dispatch, getState) => {
        dispatch(createRuleSlice.actions.setFormToggle());
    }
}

export function AddToRules(newRules) {
    console.log("inside reducer, newRules = ", newRules)
    return async (dispatch, getState) => {
        dispatch(createRuleSlice.actions.addRules({
            allRules: [...newRules]
        }))
    }
}

export function ResetAllRules() {
    return async (dispatch, getState) => {
        dispatch(createRuleSlice.actions.resetAllRules())
    }
}