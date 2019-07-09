/** @jsx jsx */
import { jsx } from "@emotion/core";
import ProgressBar from "./ProgessBar";
import AddCategoryForm from "./AddCategoryForm";

const styles = {
  container: {
    padding: 10
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 10
  },
  listItem: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    gridTemplateRows: "1fr 20px",
    alignItems: "center"
  },
  left: {
    gridColumn: "1 / span 2",
    fontSize: 10,
    textAlign: "right"
  }
};

function Categories(props) {
  return (
    <div css={styles.container}>
      <ul css={styles.list}>
        {props.categories.map(category => {
          const expensesForCategory = props.expenses.filter(
            e => e.category === category.id
          );

          const totalSpent = expensesForCategory.reduce((total, expense) => {
            return total + expense.amount;
          }, 0);

          const amountRemaining = category.amount - totalSpent;
          const percentSpent = (totalSpent / category.amount) * 100;

          return (
            <li css={styles.listItem} key={category.id}>
              <div>{category.display}</div>
              <ProgressBar progress={percentSpent} />
              <div css={styles.left}>${amountRemaining} left</div>
            </li>
          );
        })}
      </ul>
      <AddCategoryForm onSave={props.addCategory} />
    </div>
  );
}

export default Categories;
