import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
  const reducer = combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer,
  });

  const store = configureStore({
    reducer,
  });

  return store;
};
