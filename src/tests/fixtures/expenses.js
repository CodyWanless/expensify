import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Gum',
    note: 'note',
    amount: 195,
    renderedAmount: 1.95,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: 'note',
    amount: 109500,
    renderedAmount: 1095.0,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
  },
  {
    id: '3',
    description: 'Credit Card',
    note: 'note',
    amount: 4500,
    renderedAmount: 45.0,
    createdAt: moment(0).add(4, 'days').valueOf(),
  },
];
