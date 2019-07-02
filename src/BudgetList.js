import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./firebase";
import { Link } from "react-router-dom";

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
  const firebase = useContext(FirebaseContext);
  const budgets = useBudgets(firebase.database);
  return !budgets ? (
    <div>Loading...</div>
  ) : (
    <div>
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
    </div>
  );
};

export default BudgetList;
