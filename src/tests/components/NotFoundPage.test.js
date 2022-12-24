import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFoundPage from '../../components/NotFoundPage';

jest.mock('react-router-dom');

describe('NotFoundPage', () => {
  it('should render NotFoundPage correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404', { exact: false })).toBeInTheDocument();
  });
});
