import React from 'react';

const TextBox = ({ text, onChange, icon, type, placeholder, maxLength, textAlign, width, mt }) => {

    return (
        <input type={type} placeholder={placeholder}  className={`${width} bg-black3 border border-gray2 border-opacity-30 rounded-full ${textAlign==='center' ? 'text-center' : ''} px-4 py-1 ${mt} text-gray2`} 
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
    width: "w-full",
    mt: "mt-2",
};

export default TextBox;
