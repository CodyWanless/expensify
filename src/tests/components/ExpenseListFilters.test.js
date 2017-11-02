import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />);
});

test ('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test ('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({filters: altFilters});
    expect(wrapper).toMatchSnapshot();
});

test ('should handle text change', () => {
    const updateText = 'updated text';
    wrapper.find('input').simulate('change', {
        target: {
            value: updateText
        }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(updateText);
}); 

test ('should sort by date', () => {
    const dateValue = 'date';
    wrapper.find('select').simulate('change', {
        target: {
            value: dateValue
        }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test ('should sort by amount', () => {
    const amountValue = 'amount';
    wrapper.find('select').simulate('change', {
        target: {
            value: amountValue
        }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test ('should handle date changes', () => {
    const startDate = moment();
    const endDate = moment().add(4, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test ('should handle date focus change', () => {
    const calendarFocused = true;
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});