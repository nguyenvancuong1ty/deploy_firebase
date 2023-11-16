import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numberNotify: 0,
};

export const numberNotify = createSlice({
    name: 'numberNotify',
    initialState,
    reducers: {
        increment: (state) => {
            state.numberNotify += 1;
        },
        decrement: (state) => {
            state.numberNotify -= 1;
        },
        resetNumberNotify: (state) => {
            state.numberNotify = 0;
        },
        changeNumberNotify: (state, action) => {
            state.numberNotify = action.payload;
        },
        incrementByAmount: (state, action) => {
            state.numberNotify += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount, resetNumberNotify, changeNumberNotify } = numberNotify.actions;

export default numberNotify.reducer;
