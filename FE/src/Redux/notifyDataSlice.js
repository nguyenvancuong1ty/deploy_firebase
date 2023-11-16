import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifyData: [],
};

export const notifyData = createSlice({
    name: 'notifyData',
    initialState,
    reducers: {
        addNotifyData: (state, action) => {
            const data = [...state.notifyData, ...action.payload];
            const newData = data.sort((a, b) => {
                return b.time - a.time;
            });
            return {
                ...state,
                notifyData: newData,
            };
        },
        changeNotifyData: (state, action) => {
            return {
                ...state,
                notifyData: action.payload,
            };
        },
        resetNotifyData: (state) => {
            state.notifyData = [];
        },
    },
});

export const { addNotifyData, changeNotifyData, resetNotifyData } = notifyData.actions;

export default notifyData.reducer;
