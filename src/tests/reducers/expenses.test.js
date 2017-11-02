import expensesReducer from '../../reducers/expenses';
import expenses from './../fixtures/expenses';
import uuid from 'uuid';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should remove expense by id', () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id: uuid()
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add expense', () => {
    const expense = {
        id: uuid(),
        description: 'New expense',
        note: 'note',
        amount: 1234,
        createdAt: 1234
    };
    const action = {
        type:'ADD_EXPENSE',
        expense  
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, expense]);
});

test('should edit expense', () => {
    const expense = {
        id: expenses[0].id,
        description: 'Edited expense',
        note: 'note',
        amount: 6543,
        createdAt: 6543
    };
    const action = {
        type:'EDIT_EXPENSE',
        id: expense.id,
        updates: expense  
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expense, expenses[1], expenses[2]]);
});

test('should not edit expense if expense not found', () => {
    const expense = {
        id: uuid(),
        description: 'Edited expense',
        note: 'note',
        amount: 6543,
        createdAt: 6543
    };
    const action = {
        type:'EDIT_EXPENSE',
        id: expense.id,
        updates: expense  
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});