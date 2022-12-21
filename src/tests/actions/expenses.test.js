// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import database from '../../firebase/firebase';
// import expenses from '../fixtures/expenses';
// import { addExpense, editExpense, removeExpense, setExpenses, startAddExpense, startEditExpense, startRemoveExpense, startSetExpenses } from './../../actions/expenses';

// const createMockStore = configureMockStore([thunk]);
// const uid = 'thisismytestuid';
// const defaultAuthState = { auth: { uid } };

// beforeEach((done) => {
//     const expensesData = {};
//     expenses.forEach(({ id, description, note, amount, createdAt }) => {
//         expensesData[id] = { description, note, amount, createdAt };
//     });

//     database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
// });

// test('should set up remove expense action object', () => {
//     const id = '1234abc';
//     const action = removeExpense({ id });
//     expect(action).toEqual({
//         type: 'REMOVE_EXPENSE',
//         id
//     });
// });

// test('should set up edit expense action object', () => {
//     const id = '1234abc';
//     const expectedObject = {
//         amount: 12345,
//         description: 'desc',
//         note: 'note',
//         createdAt: 12341234
//     };
//     const action = editExpense(id, expectedObject);

//     expect(action).toEqual({
//         type: 'EDIT_EXPENSE',
//         id,
//         updates: { ...expectedObject }
//     });
// });

// test('should set up add expense action object with provided values', () => {
//     const action = addExpense(expenses[0]);

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: expenses[0]
//     });
// });

// test('should add expense to database and store', (done) => {
//     const store = createMockStore(defaultAuthState);
//     const expenseData = {
//         description: 'Mouse',
//         amount: 3000,
//         note: 'This one is better',
//         createdAt: 11234
//     };

//     store.dispatch(startAddExpense(expenseData)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'ADD_EXPENSE',
//             expense: {
//                 id: expect.any(String),
//                 ...expenseData
//             }
//         });
//         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
//     }).then(snapshot => {
//         expect(snapshot.val()).toEqual(expenseData);
//         done();
//     });
// });

// test('should add expense with defaults to database and store', (done) => {
//     const store = createMockStore(defaultAuthState);
//     const emptyExpenseObject = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     };

//     store.dispatch(startAddExpense({})).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'ADD_EXPENSE',
//             expense: {
//                 id: expect.any(String),
//                 ...emptyExpenseObject
//             }
//         });
//         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
//     }).then(snapshot => {
//         expect(snapshot.val()).toEqual(emptyExpenseObject);
//         done();
//     });
// });

// test('should setup set expense action object with data', () => {
//     const action = setExpenses(expenses);

//     expect(action).toEqual({
//         type: 'SET_EXPENSES',
//         expenses
//     });
// });

// test('should fetch the expenses from firebase', (done) => {
//     const store = createMockStore(defaultAuthState);

//     store.dispatch(startSetExpenses()).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'SET_EXPENSES',
//             expenses
//         });
//         done();
//     });
// });

// test('should start remove expense action object', (done) => {
//     const store = createMockStore(defaultAuthState);
//     const id = '1234abc';

//     const action = store.dispatch(startRemoveExpense({ id })).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'REMOVE_EXPENSE',
//             id
//         });
//         return database.ref(`users/${uid}/expenses/${id}`).once('value');
//     }).then(snapshot => {
//         expect(snapshot.val()).toBeFalsy();
//         done();
//     });
// });

// test('should edit expense action object', (done) => {
//     const store = createMockStore(defaultAuthState);
//     const id = '1234abc';
//     const expectedObject = {
//         amount: 12345,
//         description: 'desc',
//         note: 'note',
//         createdAt: 12341234
//     };

//     store.dispatch(startEditExpense(id, expectedObject)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'EDIT_EXPENSE',
//             id,
//             updates: { ...expectedObject }
//         });
//         return database.ref(`users/${uid}/expenses/${id}`).once('value');
//     }).then(snapshot => {
//         expect(snapshot.val()).toEqual(expectedObject);
//         done();
//     });
// });
it.skip('skip', () => {});