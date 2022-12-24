import React from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  setEndDate as setEndDateAction,
  setStartDate as setStartDateAction,
  setTextFilter as setTextFilterAction,
  sortByAmount as sortByAmountAction,
  sortByDate as sortByDateAction,
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarFocused: null,
    };
  }

  sortByChangedHandler = (e) => {
    const { sortByDate, sortByAmount } = this.props;
    const targetSortBy = e.target.value;
    if (targetSortBy === 'date') {
      sortByDate();
    } else if (targetSortBy === 'amount') {
      sortByAmount();
    } else {
      throw new Error('Sort by not supported');
    }
  };

  onDatesChange = ([startDate, endDate]) => {
    const { setStartDate, setEndDate } = this.props;

    setStartDate(startDate?.getTime());
    setEndDate(endDate?.getTime());
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({
      calendarFocused,
    }));
  };

  onTextChange = (e) => {
    const { setTextFilter } = this.props;
    setTextFilter(e.target.value);
  };

  render() {
    const { filters } = this.props;
    const { calendarFocused } = this.state;

    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              value={filters.text}
              placeholder="Search Expenses"
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              value={filters.sortBy}
              onChange={this.sortByChangedHandler}
              className="select"
              data-testid="select"
            >
              <option data-testid="date_select-option" value="date">
                Date
              </option>
              <option data-testid="amount_select-option" value="amount">
                Amount
              </option>
            </select>
          </div>
          <div className="input-group__item">
            <DatePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              selectsRange
              isClearable
              onChange={this.onDatesChange}
              onFocus={this.onFocusChange}
              autoFocus={calendarFocused}
              className="text-input"
              id="filter-datepicker"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilterAction(text)),
  sortByDate: () => dispatch(sortByDateAction()),
  sortByAmount: () => dispatch(sortByAmountAction()),
  setStartDate: (startDate) => dispatch(setStartDateAction(startDate)),
  setEndDate: (endDate) => dispatch(setEndDateAction(endDate)),
});

const mapStateToProps = (state) => ({
  filters: {
    ...state.filters,
    startDate: state.filters.startDate
      ? new Date(state.filters.startDate)
      : null,
    endDate: state.filters.endDate ? new Date(state.filters.endDate) : null,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
