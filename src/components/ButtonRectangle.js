import React from 'react';

const ButtonRectangle = ({ text, onClick, icon, isPopup }) => {
    return (
        <button className={`w-auto bg-black3 text-sm border border-green text-green rounded-md text-center ${isPopup ? 'px-5' : 'px-5 sm:px-10'} py-0.5
                            hover:bg-black
                            hover:text-gray2
                            hover:border-gray1
                            transition duration-300 ease-in-out"`}
                            onClick={onClick}>
                                {text}
                            </button>
    );
};

export default ButtonRectangle;
