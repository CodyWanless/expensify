import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './../actions/filters';
import DatePicker from 'react-datepicker';

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

    onDatesChange = ([startDate, endDate]) => {
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
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text"
                            className="text-input"
                            value={this.props.filters.text}
                            placeholder="Search Expenses"
                            onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select value={this.props.filters.sortBy}
                            onChange={this.sortByChangedHandler}
                            className="select">
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        {<DatePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            selectsRange={true}
                            isClearable={true}
                            onChange={this.onDatesChange}
                            onFocus={this.onFocusChange}
                            autoFocus={this.state.calendarFocused}
                            className="text-input"
                        />}
                    </div>
                </div>
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