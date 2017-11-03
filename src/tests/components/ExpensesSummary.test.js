import React from 'react';
import {shallow} from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test ('should render ExpensesSummary correctly with 1 item', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={4000} />);

    expect(wrapper).toMatchSnapshot();
});

test ('should render ExpensesSummary correctly with multiple items', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={4000} />);

    expect(wrapper).toMatchSnapshot();
});