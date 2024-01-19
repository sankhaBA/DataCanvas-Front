import React from 'react';

function PageBody({ children, isSidebarOpen, toggleSidebar }) {
  return (
    <div className={`w-full lg:ml-64 bg-black text-gray2`}>
      <div className="fixed w-full">
        <button className="h-12 bg-green text-black3 lg:hidden " onClick={toggleSidebar}>{isSidebarOpen ? 'Collapse' : 'Open'}</button>
      </div>
      <div className="mt-16 overflow-y-auto h-screen text-white">
        {children}
      </div>
    </div>
  );
}

export default PageBody;
