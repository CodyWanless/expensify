import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should nop removing expense when id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: Math.random(),
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add expense', () => {
  const expense = {
    id: Math.random(),
    description: 'New expense',
    note: 'note',
    amount: 1234,
    createdAt: 1234,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);
});

test('should edit expense', () => {
  const expense = {
    ...expenses[0],
    id: expenses[0].id,
    description: 'Edited expense',
    note: 'note',
    amount: 6543,
    createdAt: 6543,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expense.id,
    updates: expense,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expense, expenses[1], expenses[2]]);
});

test('should not edit expense if expense not found', () => {
  const expense = {
    id: Math.random(),
    description: 'Edited expense',
    note: 'note',
    amount: 6543,
    createdAt: 6543,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expense.id,
    updates: expense,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const expectedExpenses = [
    {
      id: 1234,
      description: 'Expect',
      note: 'test',
      createdAt: 123412,
      amount: 12,
    },
  ];
  const action = {
    type: 'SET_EXPENSES',
    expenses: expectedExpenses,
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expectedExpenses);
});
