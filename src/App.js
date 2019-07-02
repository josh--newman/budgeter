import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Budget from "./Budget";
import db from "./firebase";

const useBudgets = db => {
  const [budgets, setBudgets] = useState(null);

  useEffect(() => {
    const getBudgets = async () => {
      const snapshot = await db.collection("budgets").get();
      let budgetData = [];
      snapshot.forEach(doc => {
        const item = { id: doc.id, ...doc.data() };
        budgetData.push(item);
      });
      setBudgets(budgetData);
    };
    if (db) {
      getBudgets();
    }
  }, [db]);

  return budgets;
};

const BudgetList = () => {
  const budgets = useBudgets(db);
  return !budgets ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <h2>Select a budget</h2>
      <ul>
        {budgets.map(budget => {
          return (
            <li key={budget.id}>
              <Link to={`/budget/${budget.id}`}>{budget.name}</Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

function App() {
  return (
    <Router>
      <Route exact path="/" component={BudgetList} />
      <Route path="/budget/:id" component={Budget} />
    </Router>
  );
}

export default App;
