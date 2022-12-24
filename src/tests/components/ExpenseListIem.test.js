import { render, screen } from '@testing-library/react';
import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/destructuring-assignment
  Link: (props) => <div>{props.children}</div>,
}));

describe('ExpenseListItem', () => {
  it('should render ExpenseListItem', () => {
    const [expense] = expenses;
    render(
      <ExpenseListItem
        amount={expense.amount}
        createdAt={expense.createdAt}
        description={expense.description}
        id={expense.id}
      />,
    );

    expect(
      screen.getByText(expense.renderedAmount, { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText(expense.description)).toBeInTheDocument();
  });
});
