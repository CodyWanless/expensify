import authReducer from '../../reducers/auth';

test('should set uid on Login', () => {
    const expectedUid = '12341234';
    const action = {
        type: 'LOGIN',
        uid: expectedUid
    };

    const state = authReducer({}, action);

    expect(state.uid).toBe(expectedUid);
});

test('should clear uid on Logout', () => {
    const currentState = {
        uid: 'aff1'
    };
    const action = {
        type: 'LOGOUT'
    };

    const state = authReducer(currentState, action);

    expect(state).toEqual({});
});