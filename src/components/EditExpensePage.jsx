import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export default function EditExpensePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const expense = useSelector((state) =>
    state.expenses.find((e) => e.id === id),
  );

  const onEditExpenseSubmit = async (expenseToAdd) => {
    await dispatch(startEditExpense(id, expenseToAdd));
    navigate('/');
  };

  const onRemoveClick = async () => {
    await dispatch(startRemoveExpense({ id }));
    navigate('/');
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={onEditExpenseSubmit} expense={expense} />
        <button onClick={onRemoveClick} className="button button--secondary">
          Remove Expense
        </button>
      </div>
    </div>
  );
}
