import React from 'react';

function Sidebar({isSidebarOpen}) {

  return (
    <div className={`h-screen w-64 fixed top-0 bg-black2 text-gray2 ${isSidebarOpen ? 'left-0' : '-left-64'}`}>
      Sidebar
    </div>
  );
}

export default Sidebar;

