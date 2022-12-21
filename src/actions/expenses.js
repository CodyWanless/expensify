import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense =
  (expenseData = {}) =>
  async (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt,
    };

    const key = await database.insert(expense);
    return dispatch(
      addExpense({
        id: key,
        ...expense,
      }),
    );
  };

// REMOVE_EXPENSE
export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense =
  ({ id }) =>
  async (dispatch) => {
    await database.delete(id);
    return dispatch(removeExpense({ id }));
  };

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates) => async (dispatch) => {
  await database.update(id, updates);
  return dispatch(editExpense(id, updates));
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => async (dispatch) => {
  const expenses = [];

  const snapshot = await database.getSnapshot();
  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });

  return dispatch(setExpenses(expenses));
};
