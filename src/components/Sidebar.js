import React from 'react';
import { FaNewspaper, FaChartBar, FaMicrochip, FaDatabase, FaCogs } from 'react-icons/fa';
import { MdBarChart, MdDashboard } from 'react-icons/md';

function Sidebar({ isSidebarOpen }) {

  const SidebarButton = ({ text, icon:Icon, active, onClick }) => {
    return (
      <div className={`flex items-center ${active ? 'bg-gray3' : ''}  px-5 py-2 my-2 rounded-full cursor-pointer
         hover:bg-gray1 transition-all ease-in-out duration-300`}>
        <Icon className="text-xl text-green" />
        <span className="text-sm text-gray2 ml-4">{text}</span>
      </div>
    )
  }

  return (
    <div className={`h-screen lg:w-64 w-64 fixed top-0 left-0 bg-black2 text-gray2 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-center items-center mt-5">
        <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Logo" className=" w-10" />
        <span className="text-2xl text-gray2 font-bold font-poppins ml-2">DataCanvas</span>
      </div>

      <div className="mt-8 px-3">
        <SidebarButton text="Overview" icon={MdDashboard} active={true} />
        <SidebarButton text="Dashboard" icon={MdBarChart} active={false} />
        <SidebarButton text="Devices" icon={FaMicrochip} active={false} />
        <SidebarButton text="Data Tables" icon={FaDatabase} active={false} />
        <SidebarButton text="Settings" icon={FaCogs} active={false} />
      </div>
    </div>
  );
}

export default Sidebar;

