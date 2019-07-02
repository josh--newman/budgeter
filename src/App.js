import React, { useEffect, useState } from "react";
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

function App() {
  const budgets = useBudgets(db);

  return (
    <Router>
      {!budgets ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {budgets.map(budget => {
            return (
              <li key={budget.id}>
                <Link to={`/budget/${budget.id}`}>{budget.name}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <Route path="/budget/:id" component={Budget} />
    </Router>
  );
}

export default App;
