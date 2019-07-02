import React, { Fragment } from "react";
import db from "./firebase";
import useFetchBudget from "./useFetchBudget";
import Categories from "./Categories";
import Expenses from "./Expenses";

const Budget = ({ match }) => {
  const budget = useFetchBudget(match.params.id);
  const addCategory = category => {
    db.collection("budgets")
      .doc(match.params.id)
      .set({
        ...budget,
        categories: [...budget.categories, category]
      });
  };
  const addExpense = expense => {
    db.collection("budgets")
      .doc(match.params.id)
      .set({
        ...budget,
        expenses: [...budget.expenses, expense]
      });
  };

  return !budget ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Categories
        addCategory={addCategory}
        categories={budget.categories}
        expenses={budget.expenses}
      />
      <Expenses
        addExpense={addExpense}
        categories={budget.categories}
        expenses={budget.expenses}
      />
    </Fragment>
  );
};

export default Budget;
