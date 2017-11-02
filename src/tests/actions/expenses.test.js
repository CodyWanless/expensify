import { addExpense, editExpense, removeExpense } from './../../actions/expenses';

test('should set up remove expense action object', () => {
    const id = '1234abc';
    const action = removeExpense({ id });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id
    });
});

test('should set up edit expense action object', () => {
    const id = '1234abc';
    const expectedObject = {
        amount: 12345,
        description: 'desc',
        note: 'note',
        createdAt: 12341234
    };
    const action = editExpense(id, expectedObject);

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates: { ...expectedObject }
    })
});

test('should set up add expense action object with provided values', () => {
    const expenseData = {
        amount: 12345,
        description: 'desc',
        note: 'note',
        createdAt: 12341234
    };
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should set up add expense action object with default values', () => {
    const expectedData = {
        amount: 0,
        createdAt: 0,
        description: '',
        note: ''
    };
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expectedData,
            id: expect.any(String)
        }
    })
});