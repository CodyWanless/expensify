import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from './../actions/filters';

const sortByChangedHandler = (e, props) => {
    const targetSortBy = e.target.value;
    if (targetSortBy === "date") {
        props.dispatch(sortByDate());
    } else if (targetSortBy === "amount") {
        props.dispatch(sortByAmount());
    } else {
        throw new Error("Sort by not supported");
    }
};

const ExpenseListFilters = (props) => (
    <div>
        <input type="text"
            value={props.filters.text} onChange={(e) => {
                props.dispatch(setTextFilter(e.target.value));
            }} />
        <select value={props.filters.sortBy}
            onChange={e => sortByChangedHandler(e, props)}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);