import { render, screen } from '@testing-library/react';
import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';

jest.mock('react-router-dom');

describe('ExpensesSummary', () => {
  it('should render ExpensesSummary correctly with 1 item', () => {
    render(<ExpensesSummary expensesCount={1} expensesTotal={4000} />);

    expect(screen.getByText('$40.00', { exact: false })).toBeInTheDocument();
  });
});
