import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import { createBrowserHistory } from 'history';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage';
import AddExpensePage from './../components/AddExpensePage';
import EditExpensePage from './../components/EditExpensePage';
import HelpPage from './../components/HelpPage';
import NotFoundPage from './../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import RedirectOnAuth from './RedirectOnAuth';
import RequireAuth from './RequireAuth';

export const history = createBrowserHistory();

const AppRouter = () => (
    <BrowserRouter location={history.location} navigator={history} >
        <div>
            <Routes>
                <Route path="/"
                    element={
                        <RedirectOnAuth redirectTo="/dashboard">
                            <LoginPage />
                        </RedirectOnAuth>
                    } />
                <Route path="dashboard"
                    element={
                        <RequireAuth redirectTo="/">
                            <ExpenseDashboardPage />
                        </RequireAuth>
                    } />
                <Route path="create"
                    element={
                        <RequireAuth redirectTo="/">
                            <AddExpensePage />
                        </RequireAuth>
                    } />
                <Route path="edit/:id"
                    element={
                        <RequireAuth redirectTo="/">
                            <EditExpensePage render={(params) => ({ ...params })} />
                        </RequireAuth>
                    } />
                <Route path="help" element={HelpPage} />
                <Route element={NotFoundPage} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default AppRouter;