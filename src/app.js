import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 121, note: '', createdAt: 5 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 1234, note: '', createdAt: 1 }));
store.dispatch(addExpense({ description: 'Rent', amount: 1095, note: '', createdAt: new Date().getTime() }));

const currentState = store.getState();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));