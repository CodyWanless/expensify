export default (expenses) => {
  if (expenses) {
    return expenses
      .map((x) => x.amount)
      .reduce((sum, currentAmount) => sum + currentAmount, 0);
  }

  return 0;
};
