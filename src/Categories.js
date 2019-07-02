import React, { useState } from "react";

function Categories(props) {
  const [nameInputValue, setNameInputValue] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {props.categories.map(category => {
          const totalSpent = props.expenses
            .filter(e => e.category === category.id)
            .reduce((total, expense) => {
              return total + expense.amount;
            }, 0);
          return (
            <li key={category.id}>
              <p>
                {category.display} - ${totalSpent} / ${category.amount}
              </p>
            </li>
          );
        })}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log("adding category:", nameInputValue);
          const category = {
            id: nameInputValue.toLowerCase(),
            display: nameInputValue,
            amount: parseFloat(amountInputValue)
          };
          setNameInputValue("");
          setAmountInputValue("");
          props.addCategory(category);
        }}
      >
        <label>
          Name
          <input
            value={nameInputValue}
            type="text"
            onChange={e => setNameInputValue(e.target.value)}
          />
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

export default Categories;
