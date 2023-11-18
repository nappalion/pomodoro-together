/*
Generic search bar that can be used anywhere
Should have a search (magnifying glass) icon on the left
*/

import React, { useState } from "react";

function TableRow(props) {
  const { key } = props;
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    row: {
      color: "black",
      flex: 1,
      textAlign: "left",
      fontSize: 20,
      borderBottom: "1px solid #C0BABA",
      backgroundColor: isHovered ? "#D1D1D1" : "#F3F3F3",
    },
  };

  return (
    <tr
      style={{ ...styles.row, ...{} }}
      key={key}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
    </tr>
  );
}

export default TableRow;
