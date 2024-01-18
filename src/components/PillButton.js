import React from 'react';

const PillButton = ({ text, onClick, icon: Icon, isPopup }) => {
  const buttonClasses = `w-auto bg-black3 border border-green text-green rounded-full text-center ${isPopup ? 'px-10' : 'px-5 sm:px-10'} py-0.5
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

export default PillButton;

