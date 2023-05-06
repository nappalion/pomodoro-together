import React, { useState } from 'react';

function TextInput(props) {
    const { placeholder, value, onChangeText, label, name} = props;
    

    const styles = {
        container: {
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 10
        },
        label: {
            textAlign: 'left',
            color: 'black',
            fontSize: 15,
            paddingLeft: 10,
            paddingBottom: 5,
        },
        textInput: {
            '::placeholder': {
                color: '#949494'
            },
            width: '90%',
            padding: 20,
            backgroundColor: '#F6F6F6',
            border: '2px solid #DADADA',
            borderRadius: 16,
        }
        
    }
  
    return (
        <div style={{...styles.container, ...props.style}} >
            <span style={styles.label}>{label}</span>
            <input
                name={name}
                value={value}
                style={styles.textInput}
                placeholder={placeholder}
                onChange={onChangeText}
            />
        </div>
    );
}

TextInput.defaultProps = {
  color: '#065A82',
  size: '20px',
};

export default TextInput;
