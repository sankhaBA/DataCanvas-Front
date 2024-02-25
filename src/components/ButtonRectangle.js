import React from 'react';

const ButtonRectangle = ({ text, onClick, icon, isPopup, color, width }) => {
    return (
        <button className={`w-${width} bg-black3 text-sm border ${color == 'green' ? 'border-green' : 'border-red'} ${color == 'green' ? 'text-green' : 'text-red'} rounded-md text-center ${isPopup ? 'px-5' : 'px-5 sm:px-10'} py-0.5
                            hover:bg-black
                            hover:text-gray2
                            hover:border-gray1
                            transition duration-300 ease-in-out"`}
            onClick={onClick}>
            {text}
        </button>
    );
};

// Defailt props
ButtonRectangle.defaultProps = {
    onClick: () => { },
    icon: null,
    isPopup: false,
    color: "green",
    width: "auto"
}

export default ButtonRectangle;
