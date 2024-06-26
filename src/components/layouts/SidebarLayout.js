import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PagBody from './PageBody';

function SidebarLayout({ children, active, breadcrumb }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1020);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 1020);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`flex h-screen overflow-hidden`}>
            <Sidebar isSidebarOpen={isSidebarOpen} active={active} toggleSidebar={toggleSidebar} />
            <PagBody isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} breadcrumb={breadcrumb}>
                {children}
            </PagBody>
        </div>
    );
}

export default SidebarLayout;