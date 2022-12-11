import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startAddExpense } from './../actions/expenses';
import ExpenseForm from './ExpenseForm';

export default function AddExpensePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (expense) => {
        await dispatch(startAddExpense(expense));
        navigate('/');
    }

    return (
        <div>
            <div className="page-header">
                <div className="content-container" >
                    <h1 className="page-header__title">Add Expense</h1>
                </div>
            </div>
            <div className="content-container" >
                <ExpenseForm onSubmit={onSubmit} />
            </div>
        </div>);
}