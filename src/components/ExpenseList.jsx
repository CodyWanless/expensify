import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';

export function ExpenseList({ expenses }) {
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
        {expenses.length === 0 ? (
          <div className="list-item list-item__message">
            <span>No expenses</span>
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseListItem
              key={expense.id}
              id={expense.id}
              description={expense.description}
              amount={expense.amount}
              createdAt={expense.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
