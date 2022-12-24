import React from 'react';
import DatePicker from 'react-datepicker';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? props.expense.createdAt : new Date(),
      error: undefined,
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  saveExpense = (e) => {
    e.preventDefault();

    const { description, amount, createdAt, note } = this.state;
    const { onSubmit } = this.props;

    if (!description || !amount) {
      const error = 'Please provide description and amount.';
      this.setState(() => ({ error }));
    } else {
      this.setState(() => ({ error: '' }));
      onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note,
      });
    }
  };

  render() {
    const { error, description, amount, note, createdAt } = this.state;
    return (
      <form className="form" onSubmit={this.saveExpense}>
        {error && <p className="form__error">{error}</p>}
        <input
          type="text"
          placeholder="Description"
          className="text-input"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={amount}
          onChange={this.onAmountChange}
        />
        <DatePicker
          selected={createdAt}
          onChange={this.onDateChange}
          className="text-input"
          id="created-at_date-picker"
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          value={note}
          className="textarea"
          onChange={this.onNoteChange}
        />
        <div>
          <button type="submit" className="button">
            Save Expense
          </button>
        </div>
      </form>
    );
  }
}
