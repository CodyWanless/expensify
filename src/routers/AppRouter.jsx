import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import RedirectOnAuth from './RedirectOnAuth';
import RequireAuth from './RequireAuth';

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectOnAuth redirectTo="/dashboard">
                <LoginPage />
              </RedirectOnAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth redirectTo="/">
                <ExpenseDashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="create"
            element={
              <RequireAuth redirectTo="/">
                <AddExpensePage />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth redirectTo="/">
                <EditExpensePage render={(params) => ({ ...params })} />
              </RequireAuth>
            }
          />
          <Route path="help" element={HelpPage} />
          <Route element={NotFoundPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
