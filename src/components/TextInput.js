import React, { useState } from 'react';

function TextInput(props) {
    const { placeholder, value, onChangeText } = props;

    const styles = {
        '::placeholder': {
            color: '#949494'
        },
        width: '90%',
        padding: 15,
        backgroundColor: '#F6F6F6',
        borderColor: '#DADADA',
        borderRadius: 16,
        marginTop: 10
    }
  
    return (
        <input
            type="text"
            value={value}
            style={styles}
            placeholder={placeholder}
            onChange={onChangeText}
        />
    );
}

TextInput.defaultProps = {
  color: '#065A82',
  size: '20px',
};

export default TextInput;
