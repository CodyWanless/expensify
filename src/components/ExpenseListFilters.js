import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    sortByChangedHandler = (e) => {
        const targetSortBy = e.target.value;
        if (targetSortBy === "date") {
            this.props.sortByDate();
        } else if (targetSortBy === "amount") {
            this.props.sortByAmount();
        } else {
            throw new Error("Sort by not supported");
        }
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.props.filters.text} onChange={this.onTextChange} />
                <select value={this.props.filters.sortBy}
                    onChange={this.sortByChangedHandler}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={day => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: text => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);