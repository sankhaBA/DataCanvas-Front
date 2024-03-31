import React, { useState } from 'react';
import { FaSearch, FaRegQuestionCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ searchBarDisplayed, sideBarButtonDisplayed, isSidebarOpen, toggleSidebar, breadcrumb }) => {
    // ---------- Navigation ----------
    const navigate = useNavigate();

    const [searchBarShown, setSearchBarShown] = useState(false);

    return (
        <>
            {searchBarShown ? (
                <div className="flex w-full items-center justify-end h-20 px-5">
                    <div className={`w-full relative mr-4 ${searchBarShown ? ' opacity-100' : 'opacity-0'} transition-opacity ease-out duration-500`}>
                        <div className="absolute inset-y-0 start-1 flex items-center ps-3.5 pointer-events-none">
                            <FaSearch className="text-green text-lg" />
                        </div>
                        <input type="text" id="input-group-1" className="w-full bg-black3 border border-gray2 border-opacity-30 rounded-full pr-4 ps-12 py-1 text-sm" placeholder="Search" />
                    </div>
                    <FaTimes className="text-2xl text-green mr-4 cursor-pointer hover:text-white transition-all duration-300" onClick={() => setSearchBarShown(false)} />
                </div>
            ) : (
                <div className="flex w-full items-center justify-end sm:justify-between h-20 px-5">
                    <div className='text-gray2 text-sm hidden sm:block truncate mr-3'>
                        {`${breadcrumb}`}
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        {searchBarDisplayed ? (
                            <>
                                <div className={`w-84 relative mr-4 hidden sm:block`}>
                                    <div className="absolute inset-y-0 start-1 flex items-center ps-3.5 pointer-events-none">
                                        <FaSearch className="text-green text-lg" />
                                    </div>
                                    <input type="text" id="input-group-1" className="w-full bg-black3 border border-gray2 border-opacity-30 rounded-full pr-4 ps-12 py-1 text-sm" placeholder="Search" />
                                </div>
                                <FaSearch className="text-2xl text-green mr-4 cursor-pointer sm:hidden" onClick={() => setSearchBarShown(true)} />
                            </>
                        ) : null}

                        <FaRegQuestionCircle className="text-2xl text-green mr-4 cursor-pointer" />
                        <FaSignOutAlt className="text-2xl text-green mr-4  cursor-pointer" />
                        {!isSidebarOpen && sideBarButtonDisplayed ? (
                            <FaBars className="text-2xl text-green mr-4 cursor-pointer visible lg:hidden" onClick={toggleSidebar} />
                        ) : null}
                        <img src={process.env.PUBLIC_URL + '/img/sample_user.jpg'} alt="Logo" className="w-10 h-10 object-cover rounded-full cursor-pointer" onClick={() => navigate('/usersettings')} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Topbar;