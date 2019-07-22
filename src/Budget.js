/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useContext } from "react";
import { FirebaseContext } from "./firebase";
import useFetchBudget from "./useFetchBudget";
import Categories from "./Categories";
import Expenses from "./Expenses";

const styles = {
  header: {
    padding: 10,
    backgroundColor: "rebeccapurple",
    color: "white",
    textAlign: "center",
    "> h1": {
      margin: 0,
      marginBottom: 10
    },
    "> p": {
      margin: 0
    }
  }
};

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

  const totalBudgeted = (budget ? budget.categories : []).reduce((acc, e) => {
    return acc + e.amount;
  }, 0);

  return !budget ? (
    <div>Loading...</div>
  ) : (
    <div>
      <section css={styles.header}>
        <h1>{budget.name}</h1>
        <p>Total: ${budget.totalAmount}</p>
        <p>Remaining: ${budget.totalAmount - totalBudgeted}</p>
      </section>
      <Categories
        addCategory={addCategory}
        categories={budget.categories}
        expenses={budget.expenses}
      />
      {/* <Expenses
        addExpense={addExpense}
        categories={budget.categories}
        expenses={budget.expenses}
      /> */}
    </div>
  );
};

export default Budget;
