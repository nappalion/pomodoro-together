import React, { useState } from "react";

function TextButton(props) {
  const { onClick, text } = props;
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    textButton: {
      color: "#065A82",
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "flex-end",
      marginTop: 5,
    },
    hoverOn: {
      transform: "scale(1.05)",
    },
    hoverOff: {
      transition: "transform 0.3s ease-out",
    },
  };

  return (
    <span
      style={{
        ...styles.textButton,
        ...(isHovered ? styles.hoverOn : styles.hoverOff),
        ...props.style,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </span>
  );
}

TextButton.defaultProps = {
  color: "#065A82",
  secondaryColor: "#02283b",
  size: "25px",
};

export default TextButton;
