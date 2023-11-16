// Import các hàm cần thiết
import { configureStore } from '@reduxjs/toolkit';
import notifyDataReducer from './Redux/notifyDataSlice';
import numberNotifyReducer from './Redux/numberNotifySlice';
// Action types
const INCREMENT = 'INCREMENT';
const DECREASE = 'DECREASE';
const RESET = 'RESET';
const CURRENT = 'CURRENT';
const ACCESSTOKEN = 'ACCESSTOKEN';
const TOTALCOIN = 'TOTALCOIN';
const DATACART = 'DATACART';
const TYPEPRODUCT = 'TYPEPRODUCT';
const NUMBERNOTIFY = 'NUMBERNOTIFY';
const NOTIFY = 'NOTIFY';
const AUTH = 'AUTH';

// Action creators
const setToken = (value) => ({
    type: ACCESSTOKEN,
    payload: value,
});
//
const setTypeProduct = (value) => ({
    type: TYPEPRODUCT,
    payload: value,
});
const increment = () => ({
    type: INCREMENT,
});

const reset = () => ({
    type: RESET,
});

const setCurrent = (value) => ({
    type: CURRENT,
    payload: value,
});

const setTotalCoin = (value) => ({
    type: TOTALCOIN,
    payload: value,
});

const setDataCart = (value) => ({
    type: DATACART,
    payload: value,
});

const decrease = () => ({
    type: DECREASE,
});

// Notify
const setNumberNotify = (value) => ({
    type: NUMBERNOTIFY,
    payload: value,
});

const setNotifyData = (value) => ({
    type: NOTIFY,
    payload: value,
});
// is Login
const setAuth = (value) => ({
    type: AUTH,
    payload: value,
});
// Initial state
const initialState = {
    number: 0,
    Auth: JSON.parse(sessionStorage.getItem('reduxAuthState')),
    accessToken: '1',
    totalCoin: 0,
    dataCart: [],
    typeProduct: 'cake',
    numberNotify: 0,
    notifyData: [],
};

// Reducer
const numberReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                number: state.number * 1 + 1,
            };
        case DECREASE:
            return {
                ...state,
                number: state.number * 1 - 1,
            };
        case RESET:
            return {
                ...state,
                number: 0,
            };
        case CURRENT:
            return {
                ...state,
                number: action.payload,
            };
        default:
            return state;
    }
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                Auth: action.payload,
            };
        default:
            return state;
    }
};
const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCESSTOKEN:
            return {
                ...state,
                accessToken: action.payload,
            };
        default:
            return state;
    }
};
const typeProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPEPRODUCT:
            return {
                ...state,
                typeProduct: action.payload,
            };
        default:
            return state;
    }
};
const totalCoinReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOTALCOIN:
            return {
                ...state,
                totalCoin: action.payload,
            };
        default:
            return state;
    }
};

const dataCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATACART:
            return {
                ...state,
                dataCart: action.payload,
            };
        default:
            return state;
    }
};

const numberNotifyReduce = (state = initialState, action) => {
    switch (action.type) {
        case NUMBERNOTIFY:
            return {
                ...state,
                numberNotify: action.payload,
            };
        default:
            return state;
    }
};

const dataNotifyReduce = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY:
            return {
                ...state,
                notifyData: action.payload,
            };
        default:
            return state;
    }
};
// Tạo Redux store với reducer
const store = configureStore({
    reducer: {
        numberReducer,
        tokenReducer,
        totalCoinReducer,
        dataCartReducer,
        typeProductReducer,
        numberNotifyReduce,
        AuthReducer,
        dataNotifyReduce,
        notifyData: notifyDataReducer,
        numberNotify: numberNotifyReducer,
    },
});

export {
    increment,
    reset,
    setCurrent,
    decrease,
    store,
    setToken,
    setTotalCoin,
    setDataCart,
    setTypeProduct,
    setNumberNotify,
    setAuth,
    setNotifyData,
};
