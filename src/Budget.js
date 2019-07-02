import React, { Fragment, useContext } from "react";
import { FirebaseContext } from "./firebase";
import useFetchBudget from "./useFetchBudget";
import Categories from "./Categories";
import Expenses from "./Expenses";

const Budget = ({ match }) => {
  const firebase = useContext(FirebaseContext);
  const budget = useFetchBudget(match.params.id);
  const addCategory = category => {
    firebase.database
      .collection("budgets")
      .doc(match.params.id)
      .set({
        ...budget,
        categories: [...budget.categories, category]
      });
  };
  const addExpense = expense => {
    firebase.database
      .collection("budgets")
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
