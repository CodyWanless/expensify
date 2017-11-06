import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import expensesTotalSelector from '../selectors/expenses-total';
import expensesSelector from '../selectors/expenses';

export const ExpensesSummary = ({expensesCount, expensesTotal }) => {
    const expensesText = expensesCount === 1 ? 'expense' : 'expenses';
    
    return (
        <div className="page-header">   
            <div className="content-container"> 
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expensesText} totalling <span>{numeral(expensesTotal / 100).format('$0,0.00')}</span></h1>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Add Expense</Link>
                </div>
            </div>
        </div>);
};

const mapStateToProps= (state) => {
    const expenses = expensesSelector(state.expenses, state.filters);
    
    return {
        expensesTotal: expensesTotalSelector(expenses),
        expensesCount: expenses.length
    };
};

export default connect(mapStateToProps)(ExpensesSummary);