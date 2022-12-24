import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

import AddExpensePage from '../../components/AddExpensePage';

let mockExpense;
jest.mock(
  '../../components/ExpenseForm',
  () =>
    function ExpenseForm(props) {
      async function formSubmit(e) {
        e.preventDefault();
        const { onSubmit } = props;
        await onSubmit(mockExpense);
      }

      return (
        <form onSubmit={formSubmit}>
          <button type="submit">Submit</button>
        </form>
      );
    },
);

jest.mock('../../actions/expenses', () => ({
  startAddExpense: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({ useDispatch: () => mockDispatch }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('AddExpensePage', () => {
  beforeEach(() => {
    [mockExpense] = expenses;
  });

  it('renders expense page', () => {
    render(<AddExpensePage />);

    expect(screen.getByText('Add Expense')).toBeInTheDocument();
  });

  it('adds expense on submit', async () => {
    render(<AddExpensePage />);

    const startExpenseAction = jest.fn();
    startAddExpense.mockReturnValue(startExpenseAction);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    expect(mockDispatch).toHaveBeenCalledWith(startExpenseAction);
    expect(startAddExpense).toHaveBeenCalledWith(mockExpense);
  });
});
