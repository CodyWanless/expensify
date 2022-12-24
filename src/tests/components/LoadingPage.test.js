import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadingPage from '../../components/LoadingPage';

test('should render LoadingPage correctly', () => {
  render(<LoadingPage />);

  expect(screen.getByAltText('loading_gif')).toBeInTheDocument();
});
