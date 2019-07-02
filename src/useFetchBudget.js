import { useState, useEffect } from "react";
import db from "./firebase";

const useFetchBudget = id => {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const getBudgets = async () => {
      await db
        .collection("budgets")
        .doc(id)
        .onSnapshot(doc => setBudget(doc.data()));
    };
    if (db) {
      getBudgets();
    }
  }, [id]);

  return budget;
};

export default useFetchBudget;
