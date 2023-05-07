import React, {useState} from 'react';

function IconButton(props) {
  const { onClick, src } = props;
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    icon: {
        width: 30
    },
    hoverOn: {
      transform: 'scale(1.15)'
    },
    hoverOff: {
        transition: 'transform 0.3s ease-out'
    },

  }

  return (
    <img style={{ 
        ...styles.icon, 
        ...(isHovered ? styles.hoverOn : styles.hoverOff),
        ...props.style 
      }} 
      src={src}
      onMouseEnter={() => {setIsHovered(true); }} 
      onMouseLeave={() => {setIsHovered(false);}} 
      onClick={() => { onClick() }}/>
  );
}

IconButton.defaultProps = {
  width: 30
};

export default IconButton;
