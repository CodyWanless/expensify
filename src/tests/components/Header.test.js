import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { startLogout } from '../../actions/auth';
import Header from '../../components/Header';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom');

jest.mock('../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

describe('Header', () => {
  it('should render Header correctly', () => {
    render(<Header startLogout={() => {}} />);

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call startLogout on button click', () => {
    render(<Header startLogout={startLogout} />);

    const logoutButton = screen.getByText('Logout');
    act(() => {
      logoutButton.click();
    });

    expect(startLogout).toHaveBeenCalled();
  });
});
