import React from 'react';

const TextBox = ({ text, onChange, icon, type, placeholder, maxLength, textAlign }) => {

    return (
        <input type={type} placeholder={placeholder}  className={`w-full bg-black3 border border-gray2 border-opacity-30 rounded-full ${textAlign==='center' ? 'text-center' : ''} px-4 py-1 mt-2 text-gray2`} 
            onChange={onChange}
            maxLength={maxLength}/>
    );
};

// Specifies the default values for props:
TextBox.defaultProps = {
    type: "text",
    placeholder: "",
    maxLength: 50,
    textAlign: "center",
};

export default TextBox;
