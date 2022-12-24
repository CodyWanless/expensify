import { render, screen } from '@testing-library/react';
import React from 'react';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

jest.mock('../../components/ExpensesSummary');
jest.mock('../../components/ExpenseList');
jest.mock(
  '../../components/ExpenseListFilters',
  () =>
    function ExpenseListFilters() {
      return <div>Expense List Filter</div>;
    },
);

describe('ExpenseDashboardPage', () => {
  it('renders', () => {
    render(<ExpenseDashboardPage />);

    expect(screen.getByText('Expense List Filter')).toBeInTheDocument();
  });
});
