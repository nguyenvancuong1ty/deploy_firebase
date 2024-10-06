import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifyData: [],
};

export const notifyData = createSlice({
    name: 'notifyData',
    initialState,
    reducers: {
        addNotifyData: (state, action) => {
            const existingIds = state.notifyData.map((item) => item.id);
            const newData = action.payload.filter((item) => !existingIds.includes(item.id));
            state.notifyData = [...state.notifyData, ...newData].sort((a, b) => b.time - a.time);
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
