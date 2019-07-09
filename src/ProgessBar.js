/** @jsx jsx */
import { jsx } from "@emotion/core";

const styles = {
  barCss: {
    height: 10,
    position: "relative",
    background: "#eee",
    borderRadius: 8,
    padding: 4
  },
  spanCss: props => ({
    display: "block",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "lightpink",
    width: `${props.progress}%`,
    borderRadius: 5
  })
};

const ProgressBar = props => {
  return (
    <div css={styles.barCss}>
      <span css={styles.spanCss(props)} />
    </div>
  );
};

export default ProgressBar;
