import React from 'react';

function Sidebar({isSidebarOpen}) {

  return (
    <div className={`h-screen lg:w-64 w-64 fixed top-0 left-0 bg-black2 text-gray2 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      Sidebar
    </div>
  );
}

export default Sidebar;

