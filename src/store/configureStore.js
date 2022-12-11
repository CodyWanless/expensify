import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../reducers/auth';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';

export default () => {
    const reducer = combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
        auth: authReducer
    });

    const store = configureStore({
        reducer: reducer,
    });

    return store;
};