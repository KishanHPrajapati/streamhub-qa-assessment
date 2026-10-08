import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./App.css";

const initialExpenses = [
  {
    id: 1,
    date: "2026-10-01",
    category: "Food",
    amount: 1200
  },
  {
    id: 2,
    date: "2026-10-02",
    category: "Travel",
    amount: 4500
  },
  {
    id: 3,
    date: "2026-10-03",
    category: "Bills",
    amount: 2000
  },
  {
    id: 4,
    date: "2026-10-04",
    category: "Shopping",
    amount: 3500
  },
  {
    id: 5,
    date: "2026-10-05",
    category: "Food",
    amount: 1800
  }
];

const categories = ["Food", "Travel", "Bills", "Shopping"];

function App() {
  const [page, setPage] = useState("dashboard");
  const [expenses, setExpenses] = useState(initialExpenses);

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const chartData = categories.map((categoryName) => ({
    name: categoryName,
    value: expenses
      .filter((expense) => expense.category === categoryName)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  const addExpense = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      date: new Date().toISOString().split("T")[0],
      category,
      amount: numericAmount
    };

    setExpenses([...expenses, newExpense]);
    setAmount("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Analytics Dashboard</h1>

        <nav>
          <button
            data-testid="dashboard-link"
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            data-testid="reports-link"
            onClick={() => setPage("reports")}
          >
            Reports
          </button>
        </nav>
      </header>

      {page === "dashboard" && (
        <main>
          <section className="summary-grid">
            <div className="summary-card">
              <h2>Total Expenses</h2>
              <p data-testid="total-expenses">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="summary-card">
              <h2>Total Transactions</h2>
              <p data-testid="transaction-count">
                {expenses.length}
              </p>
            </div>

            <div className="summary-card">
              <h2>Average Expense</h2>
              <p data-testid="average-expense">
                ₹{Math.round(averageExpense).toLocaleString("en-IN")}
              </p>
            </div>
          </section>

          <section className="chart-section">
            <h2>Expense by Category</h2>

            <div
              data-testid="expense-chart"
              className="chart-container"
            >
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div data-testid="chart-data">
              {chartData.map((item) => (
                <span
                  key={item.name}
                  data-testid={`chart-value-${item.name.toLowerCase()}`}
                  data-value={item.value}
                >
                  {item.name}: {item.value}
                </span>
              ))}
            </div>
          </section>

          <button
            className="primary-button"
            data-testid="view-reports-button"
            onClick={() => setPage("reports")}
          >
            View Reports
          </button>
        </main>
      )}

      {page === "reports" && (
        <main>
          <section className="report-section">
            <h2>Expense Reports</h2>

            <div className="form">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label htmlFor="amount">
                Amount
              </label>

              <input
                id="amount"
                type="number"
                value={amount}
                placeholder="Enter amount"
                onChange={(event) =>
                  setAmount(event.target.value)
                }
              />

              <button
                data-testid="add-expense-button"
                onClick={addExpense}
              >
                Add Expense
              </button>
            </div>

            <table data-testid="expense-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.category}</td>
                    <td>₹{expense.amount.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="secondary-button"
              data-testid="back-dashboard-button"
              onClick={() => setPage("dashboard")}
            >
              Back to Dashboard
            </button>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;