import { render, screen } from '@testing-library/react';
import React from 'react';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

jest.mock(
  '../../components/ExpenseListItem',
  () =>
    function ExpenseListItem(props) {
      const { description } = props;
      return <div placeholder="ExpenseListItem">{description}</div>;
    },
);

describe('ExpenseList', () => {
  it('should render ExpenseList with expenses', () => {
    render(<ExpenseList expenses={expenses} />);

    for (let i = 0; i < expenses.length; i += 1) {
      expect(screen.getByText(expenses[i].description)).toBeInTheDocument();
    }
  });

  it('should render ExpenseList with empty message', () => {
    render(<ExpenseList expenses={[]} />);

    expect(screen.getByText('No expenses')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('ExpenseListItem'),
    ).not.toBeInTheDocument();
  });
});
