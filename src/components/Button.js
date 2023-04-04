import React from 'react';

function Button(props) {
  const { onClick, text, color, size } = props;

  const styles = {
    backgroundColor: color,
    fontSize: size,
    width: '100%',
    borderRadius: 16,
    border: 0,
    color: 'white',
    fontFamily: 'calibri',
    padding: 15,
    marginTop: 10
  };

  return (
    <button onClick={onClick} style={{ ...styles, ...props.style }}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: '#065A82',
  size: '20px',
};

export default Button;
