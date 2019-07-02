import React, { useState } from "react";
import dateFns from "date-fns";

function Expenses(props) {
  const [expenseCategoryValue, setExpenseCategoryValue] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {props.expenses.map(expense => {
          const category = props.categories.find(
            c => c.id === expense.category
          );
          return (
            <li key={expense.date}>
              <p>
                {category.display} - ${parseFloat(expense.amount)} -{" "}
                {expense.date}
              </p>
            </li>
          );
        })}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          const expense = {
            date: dateFns.format(new Date(), "YYYY-MM-DD"),
            category: expenseCategoryValue,
            amount: parseFloat(amountInputValue)
          };
          props.addExpense(expense);
          setExpenseCategoryValue("");
          setAmountInputValue("");
        }}
      >
        <label>
          Category
          <select
            id="expense-category-select"
            onChange={e => setExpenseCategoryValue(e.target.value)}
            value={expenseCategoryValue}
          >
            <option value="">Select a category</option>
            {props.categories.map(c => {
              return (
                <option key={c.id} value={c.id}>
                  {c.display}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Amount
          <input
            type="number"
            min={0}
            value={amountInputValue}
            onChange={e => setAmountInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Expenses;
