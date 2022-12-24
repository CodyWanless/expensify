import {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpenses,
} from '../../actions/expenses';
import firebase from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

jest.mock('../../firebase/firebase');

describe('expense actions', () => {
  beforeEach(() => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
      expensesData[id] = { description, note, amount, createdAt };
    });
  });

  it('should set up remove expense action object', () => {
    const id = '1234abc';
    const action = removeExpense({ id });
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id,
    });
  });

  it('should set up edit expense action object', () => {
    const id = '1234abc';
    const expectedObject = {
      amount: 12345,
      description: 'desc',
      note: 'note',
      createdAt: 12341234,
    };
    const action = editExpense(id, expectedObject);

    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates: { ...expectedObject },
    });
  });

  it('should set up add expense action object with provided values', () => {
    const action = addExpense(expenses[0]);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[0],
    });
  });

  it('should add expense to database and store', async () => {
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 11234,
    };

    const mockDispatch = jest.fn();
    const expenseKey = Math.random();
    jest.spyOn(firebase, 'insert').mockResolvedValue(expenseKey);

    const startAddExpenseAction = startAddExpense(expenseData);

    await startAddExpenseAction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      addExpense({
        id: expenseKey,
        ...expenseData,
      }),
    );
  });

  it('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
  });

  it('should fetch the expenses from firebase', async () => {
    const mockDispatch = jest.fn();

    const expensesData = expenses.map((e) => ({
      key: e.id,
      val: () => e,
    }));
    jest.spyOn(firebase, 'getSnapshot').mockResolvedValue(expensesData);

    const setExpensesAction = startSetExpenses();
    await setExpensesAction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(setExpenses(expenses));
  });

  it('should start remove expense action object', async () => {
    const id = '1234abc';

    jest.spyOn(firebase, 'delete').mockResolvedValue();

    const mockDispatch = jest.fn();
    const removeExpenseAction = startRemoveExpense({ id });
    await removeExpenseAction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(removeExpense({ id }));
  });

  it('should edit expense action object', async () => {
    const id = '1234abc';
    const expectedObject = {
      amount: 12345,
      description: 'desc',
      note: 'note',
      createdAt: 12341234,
    };

    jest.spyOn(firebase, 'update').mockResolvedValue();

    const mockDispatch = jest.fn();
    const editExpenseAction = startEditExpense(id, expectedObject);
    await editExpenseAction(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(editExpense(id, expectedObject));
  });
});
