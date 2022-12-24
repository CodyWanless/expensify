import { login, logout } from '../../actions/auth';

jest.mock('../../firebase/firebase');

describe('auth actions', () => {
  it('should generate login action', () => {
    const id = '123412';
    const action = login(id);

    expect(action).toEqual({
      type: 'LOGIN',
      uid: id,
    });
  });

  it('should generate logout action', () => {
    const action = logout();

    expect(action).toEqual({
      type: 'LOGOUT',
    });
  });
});
