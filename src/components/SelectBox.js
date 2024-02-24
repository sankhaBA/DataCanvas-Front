import React from 'react';

const SelectBox = ({ children, onChange, value, width, mt }) => {

    return (
        <select className={`bg-black3 border border-gray2 border-opacity-30 rounded-full px-4 py-1 text-gray2 ${mt} ${width}`} onChange={onChange} value={value}>
            {children}
        </select>
    );
};

// Specifies the default values for props:
SelectBox.defaultProps = {
    value: -1,
    width: "w-full",
    mt: "mt-2",
};

export default SelectBox;
