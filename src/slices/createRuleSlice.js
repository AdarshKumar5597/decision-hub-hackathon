import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formToggle: true,
}

const createRuleSlice = createSlice({
    name: "createRule",
    initialState: initialState,
    reducers: {
        setFormToggle(state, value) {
            state.formToggle = !state.formToggle
        }
    }
});

export default createRuleSlice.reducer;

export function SetFormToggle() {
    return async (dispatch, getState) => {
        dispatch(createRuleSlice.actions.setFormToggle());
    }
}