import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from './../actions/expenses';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);

        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onEditExpenseSubmit = this.onEditExpenseSubmit.bind(this);
    }

    async onEditExpenseSubmit(expense) {
        await this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    async onRemoveClick() {
        await this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onEditExpenseSubmit}
                        expense={this.props.expense} />
                    <button onClick={this.onRemoveClick} className="button button--secondary">Remove Expense</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(e => e.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);