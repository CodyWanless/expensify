import moment from 'moment';
import {
  setEndDate,
  setStartDate,
  setTextFilter,
  sortByDate,
} from '../../actions/filters';

describe('filter actions', () => {
  test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: moment(0),
    });
  });

  test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: moment(0),
    });
  });

  test('should generate sort by date action object', () => {
    const action = sortByDate();

    expect(action).toEqual({
      type: 'SORT_BY_DATE',
    });
  });

  test('should generate sort by amount action object', () => {
    const action = sortByDate();

    expect(action).toEqual({
      type: 'SORT_BY_DATE',
    });
  });

  test('should generate set text filter action object with passed value', () => {
    const filterText = 'Test text';
    const action = setTextFilter(filterText);

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      textFilter: filterText,
    });
  });

  test('should generate set text filter action object with default value', () => {
    const filterText = '';
    const action = setTextFilter();

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      textFilter: filterText,
    });
  });
});
