import React, {useState} from 'react';

function Button(props) {
  const { onClick, text, color, secondaryColor, size, icon, fontColor } = props;
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    button: {
      backgroundColor: isHovered ? secondaryColor : color,
      fontSize: size,
      width: '100%',
      borderRadius: 16,
      border: 0,
      color: fontColor ? fontColor: 'white',
      fontFamily: 'calibri',
      padding: 15,
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: icon ? 'flex-start' : 'center'
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 10
    }
  }

  return (
    <button onClick={onClick} style={{ ...styles.button, ...props.style }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}> 
      {icon && <img src={icon} style={styles.icon}/>}
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: '#065A82',
  secondaryColor: '#02283b',
  size: '25px',
};

export default Button;
