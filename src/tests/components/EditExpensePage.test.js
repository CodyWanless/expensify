import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper, expense;
beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage startRemoveExpense={startRemoveExpense} startEditExpense={startEditExpense} history={history}  expense={expense}/>);
});

test ('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test ('should handle onSubmit', (done) => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense).then(() => {
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
        done();
    });
});

test ('should handle remove button click', (done) => {
    wrapper.find('button').prop('onClick')({ id: expense.id }).then(() => {
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
        done();
    });
});