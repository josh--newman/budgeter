import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "./firebase";

const useFetchBudget = id => {
  const firebase = useContext(FirebaseContext);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const getBudgets = async () => {
      await firebase.database
        .collection("budgets")
        .doc(id)
        .onSnapshot(doc => setBudget(doc.data()));
    };
    if (firebase) {
      getBudgets();
    }
  }, [id, firebase]);

  return budget;
};

export default useFetchBudget;
