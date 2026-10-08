export function calculateTotalExpense(
  expenses: number[]
): number {
  return expenses.reduce(
    (total, amount) => total + amount,
    0
  );
}

export function calculateAverageExpense(
  expenses: number[]
): number {
  if (expenses.length === 0) {
    return 0;
  }

  const total = calculateTotalExpense(expenses);

  return Math.round(total / expenses.length);
}