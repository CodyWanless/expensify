import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;
        const expense = {
            description,
            note,
            amount,
            createdAt
        };

        const ref = await database.ref(`users/${uid}/expenses`).push(expense);
        return dispatch(addExpense({
            id: ref.key,
            ...expense
        }));
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id }) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await database.ref(`users/${uid}/expenses/${id}`).remove();

        return dispatch(removeExpense({ id }));
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await database.ref(`users/${uid}/expenses/${id}`).update(updates);

        return dispatch(editExpense(id, updates));
    };
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = [];

        const snapshot = await database.ref(`users/${uid}/expenses`).once('value');
        snapshot.forEach(childSnapshot => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        return dispatch(setExpenses(expenses));
    };
};