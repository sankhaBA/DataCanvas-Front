// Dependencies
import React, { useState, useEffect } from "react";
import { } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import SquareCard from "../components/SquareCard";


const Device = () => {


    return(
        
        <div className="bg-black w-full h-screen">
           <SidebarLayout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <SquareCard isIconShown title="Device 1" subtitle="Device 1" footer="Device 1" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 2" subtitle="Device 2" footer="Device 2" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 3" subtitle="Device 3" footer="Device 3" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 4" subtitle="Device 4" footer="Device 4" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 5" subtitle="Device 5" footer="Device 5" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 6" subtitle="Device 6" footer="Device 6" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 7" subtitle="Device 7" footer="Device 7" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 8" subtitle="Device 8" footer="Device 8" onClick={() => {}}/>
                    <SquareCard isIconShown title="Device 9" subtitle="Device 9" footer="Device 9" onClick={() => {}}/>
                </div>
           </SidebarLayout>
        </div>
    )
}

export default Device;