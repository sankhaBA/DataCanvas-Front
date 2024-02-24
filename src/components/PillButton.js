import React from 'react';

const PillButton = ({ text, onClick, icon: Icon, isPopup, color }) => {
  const buttonClasses = `w-auto bg-black3 text-sm border ${color == 'red' ? 'border-red' : 'border-green'} text-${color} rounded-full text-center ${isPopup ? 'px-10' : 'px-5 sm:px-10'} py-0.5
  hover:bg-black
  hover:text-gray2
  hover:border-gray1
  transition duration-300 ease-in-out
  flex flex-row items-center justify-center"`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      <span className='text-sm'>{text}</span>
      <Icon className={`text-sm ml-2`} />
    </button>
  );
};

// Default props
PillButton.defaultProps = {
  onClick: () => { },
  isPopup: false,
  color: 'green'
};

export default PillButton;

