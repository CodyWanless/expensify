import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { altFilters, filters } from '../fixtures/filters';

describe('ExpenseListFilter', () => {
  let setTextFilter;
  let sortByDate;
  let sortByAmount;
  let setStartDate;
  let setEndDate;

  beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
  });

  it('should render ExpenseListFilters correctly', () => {
    render(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    expect(screen.getByPlaceholderText('Search Expenses').value).toBe(
      filters.text,
    );
    expect(screen.getByTestId('select').value).toBe(filters.sortBy);
  });

  it('should render ExpenseListFilters with alt data correctly', () => {
    render(
      <ExpenseListFilters
        filters={altFilters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    expect(screen.getByPlaceholderText('Search Expenses').value).toBe(
      altFilters.text,
    );
    expect(screen.getByTestId('select').value).toBe(altFilters.sortBy);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector("[id='filter-datepicker']").value).toBe(
      '12/31/1969 - 01/03/1970',
    );
  });

  it('should handle text change', async () => {
    const updateText = 'updated text';
    render(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    const searchTextInput = screen.getByPlaceholderText('Search Expenses');
    fireEvent.input(searchTextInput, { target: { value: updateText } });

    await waitFor(() => {
      expect(setTextFilter).toHaveBeenCalled();
    });
  });

  it('should sort by date', () => {
    const dateValue = 'date';
    render(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );
    const selectSortInput = screen.getByTestId('select');
    fireEvent.change(selectSortInput, { target: { value: dateValue } });

    expect(sortByDate).toHaveBeenCalled();
  });

  it('should sort by amount', () => {
    const amountValue = 'amount';
    render(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );
    const selectSortInput = screen.getByTestId('select');
    fireEvent.change(selectSortInput, { target: { value: amountValue } });

    expect(sortByAmount).toHaveBeenCalled();
  });

  it('should handle date changes', async () => {
    const startDate = moment().add(1, 'days').toDate();
    const endDate = moment().add(4, 'days').toDate();
    const propFilters = { ...filters };
    const view = render(
      <ExpenseListFilters
        filters={propFilters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    // eslint-disable-next-line testing-library/no-node-access
    const datepicker = document.querySelector("[id='filter-datepicker']");
    setStartDate.mockImplementation((date) => {
      propFilters.startDate = new Date(date);
    });
    fireEvent.input(datepicker, {
      target: { value: startDate },
    });
    await waitFor(() => {
      expect(setStartDate).toHaveBeenCalledWith(startDate.getTime());
    });

    view.rerender(
      <ExpenseListFilters
        filters={propFilters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    fireEvent.input(datepicker, {
      target: { value: endDate },
    });

    await waitFor(() => {
      expect(setStartDate).toHaveBeenLastCalledWith(startDate.getTime());
    });
    expect(setEndDate).toHaveBeenLastCalledWith(endDate.getTime());
  });
});
