import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month').toDate().getTime(),
    endDate: moment().endOf('month').toDate().getTime(),
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount',
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const expectedText = 'test text';
  const action = {
    type: 'SET_TEXT_FILTER',
    textFilter: expectedText,
  };
  const state = filtersReducer(undefined, action);

  expect(state.text).toBe(expectedText);
});

test('should set startDate filter', () => {
  const expectedDate = moment(0).add(4, 'days').valueOf();
  const action = {
    type: 'SET_START_DATE',
    startDate: expectedDate,
  };
  const state = filtersReducer(undefined, action);

  expect(state.startDate).toBe(expectedDate);
});

test('should set endDate filter', () => {
  const expectedDate = moment(0).add(4, 'days').valueOf();
  const action = {
    type: 'SET_END_DATE',
    endDate: expectedDate,
  };
  const state = filtersReducer(undefined, action);

  expect(state.endDate).toBe(expectedDate);
});
