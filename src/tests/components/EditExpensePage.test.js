import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { startEditExpense, startRemoveExpense } from '../../actions/expenses';
import expensesFixture from '../fixtures/expenses';

import EditExpensePage from '../../components/EditExpensePage';

jest.mock(
  '../../components/ExpenseForm',
  () =>
    function ExpenseForm(props) {
      async function submitForm(e) {
        e.preventDefault();
        const { onSubmit } = props;
        await onSubmit();
      }

      return (
        <form onSubmit={submitForm}>
          <button type="submit">Submit</button>
        </form>
      );
    },
);

jest.mock('../../actions/expenses', () => ({
  startEditExpense: jest.fn(),
  startRemoveExpense: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockStore = { expenses: [] };
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn().mockImplementation((selector) => selector(mockStore)),
}));

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

describe('EditExpensePage', () => {
  let id;

  beforeEach(() => {
    mockUseParams.mockClear();
    mockDispatch.mockClear();

    mockStore.expenses = expensesFixture;

    id = expensesFixture[0].id;
    mockUseParams.mockReturnValue({ id });
  });

  it('renders expense page', () => {
    render(<EditExpensePage />);

    expect(screen.getByText('Edit Expense')).toBeInTheDocument();
  });

  it('edits expense on submit', async () => {
    render(<EditExpensePage />);

    const expectedAction = {};
    startEditExpense.mockReturnValue(expectedAction);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    expect(startEditExpense).toHaveBeenCalled();
  });

  it('removes expense when remove clicked', async () => {
    render(<EditExpensePage />);

    const removeAction = jest.fn();
    startRemoveExpense.mockReturnValue(removeAction);

    const removeButton = screen.getByText('Remove Expense');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    expect(mockDispatch).toHaveBeenCalledWith(removeAction);
    expect(startRemoveExpense).toHaveBeenCalledWith({ id });
  });
});
