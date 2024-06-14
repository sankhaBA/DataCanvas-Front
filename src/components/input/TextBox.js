import React from 'react';

const TextBox = ({ text, onChange, icon, type, placeholder, maxLength, textAlign, width, mt, disabled, value }) => {

    return (
        <input type={type}
            placeholder={placeholder}
            className={`${width} bg-black3 text-sm border border-gray2 border-opacity-30 rounded-full ${textAlign === 'center' ? 'text-center' : ''} px-4 py-1 ${mt} text-gray2`}
            onChange={onChange}
            maxLength={maxLength}
            value={value}
            disabled={disabled} />
    );
};

// Specifies the default values for props:
TextBox.defaultProps = {
    type: "text",
    placeholder: "",
    maxLength: 500,
    textAlign: "center",
    width: "w-full",
    mt: "mt-2",
    disabled: false,
};

export default TextBox;