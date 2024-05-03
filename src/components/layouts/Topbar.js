import React, { useState } from 'react';
import { FaSearch, FaRegQuestionCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Topbar = ({ searchBarDisplayed, sideBarButtonDisplayed, isSidebarOpen, toggleSidebar, breadcrumb }) => {
    // ---------- Navigation ----------
    const navigate = useNavigate();

    const [searchBarShown, setSearchBarShown] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    /*
        * Implement search function
        * Validate if the search keyword is empty
        * API Endpoint : http://localhost:3001/api/data/get/search?keyword={searchKeyword}&user_id={uid}
        * Method : GET
        * Get uid from localStorage
        * If uid is empty or it is null, do not search and show a toast as Something Went Wrong
        * If searchKeyword is empty, do not search and show a toast as Please enter a keyword to search
        * Response :
        * 200: Success. Console log the results
        * 400: Bad request. Either keyword or user_id is not given
        * 500: Internal Server Error
    */
    const handleSearch = async () => {
        const uid = localStorage.getItem('uid');
        const searchKeyword = searchKeyword.trim();
        //validate if uid is empty
        if (!uid) {
            toast.error('Something Went Wrong');
            return;
        }
        //validate if keyword is empty
        if (searchKeyword === '') {
            toast.error('Please enter a keyword to search');
            return;
        }

        try {
            const url = `http://localhost:3001/api/data/get/search?keyword=${searchKeyword}&user_id=${uid}`;    
            const response = await axios.get(url);
            const data = await response.data;

            if (response.status === 200) {
                console.log(data);
            }else if(response.status === 400){
                toast.error('Bad request. Either keyword or User ID is not given');
            }else{
                toast.error('Internal Server Error');
            
            } }
            catch (error) {
                console.error('Error fetching search data:', error);
                toast.error('Error fetching search data');
            }
            

    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        localStorage.removeItem('project');
        navigate('/login');
    }

    return (
        <>
            {searchBarShown ? (
                <div className="flex w-full items-center justify-end h-20 px-5">
                    <div className={`w-full relative mr-4 ${searchBarShown ? ' opacity-100' : 'opacity-0'} transition-opacity ease-out duration-500`}>
                        <div className="absolute inset-y-0 start-1 flex items-center ps-3.5 pointer-events-none">
                            <FaSearch className="text-green text-lg" />
                        </div>
                        <input
                            type="text"
                            id="input-group-1"
                            className="w-full bg-black3 border border-gray2 border-opacity-30 rounded-full pr-4 ps-12 py-1 text-sm"
                            placeholder="Search"
                            value={searchKeyword}
                            onChange={(e) => { setSearchKeyword(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }} />
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
                                    <input
                                        type="text"
                                        id="input-group-1"
                                        className="w-full bg-black3 border border-gray2 border-opacity-30 rounded-full pr-4 ps-12 py-1 text-sm"
                                        placeholder="Search"
                                        value={searchKeyword}
                                        onChange={(e) => { setSearchKeyword(e.target.value) }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                </div>
                                <FaSearch className="text-2xl text-green mr-4 cursor-pointer sm:hidden" onClick={() => setSearchBarShown(true)} />
                            </>
                        ) : null}

                        <FaRegQuestionCircle className="text-2xl text-green mr-4 cursor-pointer" />
                        <VscSignOut className="text-2xl text-green mr-4  cursor-pointer"
                            onClick={() => { handleLogout() }} />
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