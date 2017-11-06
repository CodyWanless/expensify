import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from './../actions/expenses';

export class AddExpensePage extends React.Component { 
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(expense) {
        try {
            await this.props.startAddExpense(expense);
            this.props.history.push('/');
        } catch (e) {
            console.log(`Error adding expense: ${e}`);
        }
    }

    render() {
        return (
        <div>
            <ExpenseForm onSubmit={this.onSubmit} />
        </div>);  
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);