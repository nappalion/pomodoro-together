import React, { useState } from 'react';

import EyeOn from '../assets/eye-fill.svg';
import EyeOff from '../assets/eye-off-fill.svg';
import IconButton from './IconButton';

function TextInput(props) {
    const { placeholder, value, onChangeText, label, name, onSubmit, inputStyle, isPassword, icon, type, inputRef, inputProps} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    const handleFocus = () => {
        setIsFocused(true);
    }
    
    const handleBlur = () => {
        setIsFocused(false);
    }

    const styles = {
        container: {
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 10,
        },
        label: {
            textAlign: 'left',
            color: 'black',
            fontSize: 15,
            paddingLeft: 10,
            paddingBottom: 5,
        },
        textInput: {
            border: 'none',
            outline: 'none',
            '::placeholder': {
                color: '#949494'
            },
            backgroundColor: '#F6F6F6',
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 16,
            fontSize: 18,
            flex: 1,
            paddingLeft: icon ? 0 : 20
        },
        icon: {
            width: 30,
            paddingLeft: 10,
            paddingRight: 10
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#F6F6F6',
            border: !isFocused ? '2px solid #DADADA' : '2px solid #636363',
            borderRadius: 16,
            width: '100%'
        }, 
        
    }
  
    return (
        <div style={{...styles.container, ...props.style}} >
            <span style={styles.label}>{label}</span>
            <div style={styles.inputContainer}>
                {icon && <img style={styles.icon} src={icon}/>}
                <input
                    ref={inputRef}
                    name={name}
                    value={value}
                    type={!type ? (isPassword && !showPassword ? 'password': 'text') : type}
                    style={{...styles.textInput, ...inputStyle}}
                    placeholder={placeholder}
                    onChange={onChangeText}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...inputProps}
                />
                {isPassword && <IconButton style={styles.icon} src={!showPassword ? EyeOff : EyeOn } onClick={() => setShowPassword(!showPassword)}/>}
            </div>
        </div>
    );
}

TextInput.defaultProps = {
  color: '#065A82',
  size: '20px',
};

export default TextInput;
