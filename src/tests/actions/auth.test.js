import { login, logout } from './../../actions/auth';

test ('should generate login action', () => {
    const id = '123412';
    const action = login(id);

    expect(action).toEqual({
        type: 'LOGIN',
        uid: id
    });
});

test ('should generate logout action', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT'
    });
});