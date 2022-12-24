import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseFixture from '../fixtures/expenses';

// jest.mock('react-datepicker');

describe('ExpenseFrom', () => {
  it('renders', () => {
    const view = render(<ExpenseForm />);
    expect(view.container).toBeTruthy();
  });

  it('renders with existing expense', () => {
    const [existingExpense] = ExpenseFixture;
    render(<ExpenseForm expense={existingExpense} />);

    const amountInput = screen.getByDisplayValue(
      existingExpense.renderedAmount,
    );
    const descriptionInput = screen.getByDisplayValue(
      existingExpense.description,
    );
    const noteInput = screen.getByDisplayValue(existingExpense.note);

    expect(amountInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(noteInput).toBeInTheDocument();
  });

  it('should render error for invalid form submission', async () => {
    render(<ExpenseForm />);
    const submitButton = screen.getByText('Save Expense');

    act(() => {
      submitButton.click();
    });

    await waitFor(() => {
      const errorContent = screen.getByText('Please provide', { exact: false });
      expect(errorContent).toBeInTheDocument();
    });
  });

  it('should set description on input change', async () => {
    const value = 'new description';
    render(<ExpenseForm />);
    const descriptionInput = screen.getByPlaceholderText('Description');

    fireEvent.input(descriptionInput, { target: { value } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });
  });

  it('should set note on text area change', async () => {
    const value = 'new note';
    render(<ExpenseForm />);
    const noteInput = screen.getByPlaceholderText('Add a note', {
      exact: false,
    });

    fireEvent.input(noteInput, { target: { value } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });
  });

  it('should set amount if valid input', async () => {
    const value = '23.50';
    render(<ExpenseForm />);
    const amountInput = screen.getByPlaceholderText('Amount');

    fireEvent.input(amountInput, { target: { value } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });
  });

  it('should not set amount if invalid input', async () => {
    const value = '12.122';
    render(<ExpenseForm />);
    const amountInput = screen.getByPlaceholderText('Amount');

    fireEvent.input(amountInput, { target: { value } });

    await waitFor(() => {
      expect(screen.queryByDisplayValue(value)).not.toBeInTheDocument();
    });
  });

  it('should call onSubmit prop for valid form submission', async () => {
    const onSubmitSpy = jest.fn();
    const [expense] = ExpenseFixture;
    render(<ExpenseForm onSubmit={onSubmitSpy} expense={expense} />);

    const submitButton = screen.getByText('Save Expense');
    act(() => {
      submitButton.click();
    });

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expense.description,
        amount: expense.amount,
        note: expense.note,
        createdAt: expense.createdAt,
      });
    });

    const errorContent = screen.queryByText('Please provide', { exact: false });
    expect(errorContent).not.toBeInTheDocument();
  });

  it('should set new date on date change', () => {
    const epoch = moment();
    render(<ExpenseForm />);

    // eslint-disable-next-line testing-library/no-node-access
    const datePickerContainer = document.querySelector(
      "[id='created-at_date-picker']",
    );

    fireEvent.input(datePickerContainer, {
      target: { value: epoch },
    });

    expect(datePickerContainer.value).toBe('12/31/1969');
  });
});
