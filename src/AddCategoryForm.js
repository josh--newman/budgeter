/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";

const styles = {
  form: {
    display: "grid",
    input: {
      fontSize: "inherit"
    }
  },
  plusButton: {
    display: "flex",
    justifyContent: "flex-end"
  }
};

const AddCategoryForm = ({ onSave }) => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const disabled = !nameInputValue || !amountInputValue;

  return isAdding ? (
    <div css={styles.plusButton}>
      <button onClick={() => setIsAdding(true)}>+</button>
    </div>
  ) : (
    <form
      css={styles.form}
      onSubmit={e => {
        e.preventDefault();
        const category = {
          id: nameInputValue.toLowerCase(),
          display: nameInputValue,
          amount: parseFloat(amountInputValue)
        };
        setNameInputValue("");
        setAmountInputValue("");
        onSave(category);
        setIsAdding(false);
      }}
    >
      <input
        placeholder="Name"
        value={nameInputValue}
        type="text"
        onChange={e => setNameInputValue(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        min={0}
        value={amountInputValue}
        onChange={e => setAmountInputValue(e.target.value)}
      />

      <button disabled={disabled} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddCategoryForm;
