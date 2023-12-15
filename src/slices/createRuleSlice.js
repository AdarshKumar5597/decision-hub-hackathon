import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createRuleData: null,
    loading: false
}

const createRuleSlice = createSlice({
    name: "createRule",
    initialState: initialState,
    reducers: {
        setCreateRuleData(state, value) {
            state.createRuleData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        }
    }
});

export const { setCreateRuleData, setLoading } = createRuleSlice.actions;

export default createRuleSlice.reducer;