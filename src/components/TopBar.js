import React, { useState } from 'react';

const TopBar = ({ userName, userIcon }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="flex flex-row w-full h-[60px] relative px-8 py-3 md:flex md:flex-grow flex-row justify-end space-x-1 shadow hover:shadow-2xl">
      {/* Clickable Search Area */}
      <div className="w-full sm:w-[636px] " onClick={toggleSearch}>
        {/* Top Bar Content */}
        <div className="flex w-full items-center justify-between">
          {/* Search Bar for Larger Screens */}
          <div className={` basis-1/2 w-[425px] h-9 bg-neutral-900 rounded-3xl border border-neutral-400 cursor-pointer flex flex-row items-center justify-between sm:flex ${isSearchVisible ? 'hidden' : 'block'}`}>
            <div className="flex items-center">
              <img src={process.env.PUBLIC_URL + '/img/icons/searchIcon.png'} alt="Search Icon" className="m-4 cursor-pointer" onClick={toggleSearch} />
              <div className="text-stone-300 text-[12px] font-normal font-['Inter']">Search</div>
            </div>
          </div>

          {/* User Information */}
          <div className="basis-1/4 text-white text-[26px] font-normal font-['Inter'] flex-initial">
           <div className="text-white text-[18px] font-normal font-['Inter'] ml-5"> {userName} </div>
          </div>

          <div className="basis-1/4 flex-initial">
            <img
              src={userIcon}
              alt="User Icon"
              className="w-[40px] h-[40px] rounded-[25px] border border-zinc-400 ml-9"
            />
          </div>
        </div>

        {/* Search Bar for Smaller Screens */}
        <div className={`w-full sm:hidden ${isSearchVisible ? 'block' : 'hidden'}`}>
          <input type="text" placeholder="Search..." className="w-full h-9 bg-neutral-900 rounded-3xl border border-neutral-400 text-stone-300 px-4" />
          <button onClick={toggleSearch} className="text-stone-300 text-[12px] font-normal font-['Inter'] mt-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
