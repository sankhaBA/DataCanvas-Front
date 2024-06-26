import React from 'react';

const ButtonRectangle = ({ text, onClick, isPopup, color, width, disabled }) => {
    return (
        <button className={`w-${width} bg-black3 text-sm border ${color == 'green' ? 'border-green' : 'border-red'} ${color == 'green' ? 'text-green' : 'text-red'} rounded-md text-center ${isPopup ? 'px-5' : 'px-5 sm:px-10'} py-0.5
                            hover:bg-black
                            hover:text-gray2
                            hover:border-gray1
                            transition duration-300 ease-in-out"`}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
};

// Defailt props
ButtonRectangle.defaultProps = {
    onClick: () => { },
    isPopup: false,
    color: "green",
    width: "auto",
    disabled: false
}

export default ButtonRectangle;
