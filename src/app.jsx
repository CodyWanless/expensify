import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from './actions/auth';
import { startSetExpenses } from './actions/expenses';
import LoadingPage from './components/LoadingPage';
import { handleAuthStateChange } from './firebase/firebase';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';

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
    store
      .dispatch(startSetExpenses())
      .then(() => {
        renderApp();
        // eslint-disable-next-line no-restricted-globals
        if (location.pathname === '/') {
          <Link to="/" />;
        }
      })
      .catch((e) => console.log(e));
  },
  () => {
    store.dispatch(logout());
    renderApp();
    <Link to="/" />;
  },
);
