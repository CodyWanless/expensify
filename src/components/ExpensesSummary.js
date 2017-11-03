import React from 'react';
import { connect } from 'react-redux';
import expensesTotalSelector from '../selectors/expenses-total';
import expensesSelector from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = ({expensesCount, expensesTotal }) => {
    const expensesText = expensesCount === 1 ? 'expense' : 'expenses';
    
    return (
        <div>   
            <h1>Viewing {expensesCount} {expensesText} totalling {numeral(expensesTotal / 100).format('$0,0.00')}</h1>
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