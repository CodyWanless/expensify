import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { startLogin } from '../../actions/auth';
import { LoginPage } from '../../components/LoginPage';

jest.mock('../../actions/auth', () => ({
  startLogin: jest.fn(),
}));

describe('LoginPage', () => {
  test('should render LoginPage', () => {
    render(<LoginPage startLogin={() => {}} />);

    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  test('should call startLogout on button click', () => {
    render(<LoginPage startLogin={startLogin} />);

    const loginButton = screen.getByText('Login with Google');
    act(() => {
      loginButton.click();
    });

    expect(startLogin).toHaveBeenCalled();
  });
});
