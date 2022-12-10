import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import './styles/styles.scss'
// import 'react-dates/lib/css/_datepicker.css';
import { handleAuthStateChange } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const container = document.getElementById('app');
const root = createRoot(container);

const renderApp = () => {
    if (!hasRendered) {
        root.render(jsx);
        hasRendered = true;
    }
};

root.render(<LoadingPage />);

handleAuthStateChange(
    (user) => {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        }).catch(e => console.log(e));
    },
    () => {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
);