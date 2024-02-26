// Dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import TextBox from "../components/TextBox";
import PillButton from "../components/PillButton";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";
import CriticalAction from "../components/CriticalAction";

function ProjectSettings(){
    // ---------- Navigation hooks ----------
    const navigate = useNavigate();

    // ---------- Get states from navigation location for retrieval of project_id ----------
    const { state } = useLocation();

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- Project Details states ----------
    const [projectID, setProjectID] = useState(-1);
    const [projectDetails, setProjectDetails] = useState({
        name: '',
        description: '',
        created_at: '',
        updated_at: '',
        user_id: -1,
    });
    
    return (
         //Sidebar Component
        <SidebarLayout active={4} addressText={'John Doe > UOM Weather Station > Project Settings'}>

            <div className="text-xl text-gray2 font-semibold mx-8 mt-2">Project Settings</div>
            <div className="text-m text-gray2 font-semibold mx-8 mt-8">General Settings</div>

            <div className='flex flex-row ml-8 mt-1'>
                <div className='flex flex-col w-1/4 md:w-1/6'>
                    <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Project Name</div>
                </div>
                <TextBox text="ProjectName" onChange={(e) => { }} type="text" placeholder="UoM-SUPSI Weather Station" maxLength={50} textAlign="left" width="w-2/3 md:w-1/4"  disabled={true} />
            </div>
            <div className="flex flex-row ml-8 mt-4">
                <div className="flex flex-col w-1/4 md:w-1/6">
                    <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Project Description</div>
                </div>
                <textarea className="w-2/3 md:w-1/4 h-24 border-2 border-gray1 border-opacity-30 rounded-xl p-2 text-gray1 bg-black3" placeholder="Description" ></textarea>
            </div>
            <div className='flex flex-row ml-8 mt-2'>
                <div className='flex flex-col w-1/4 md:w-1/6'>
                    <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Project ID</div>
                </div>
                <TextBox text="ProjectID" onChange={(e) => { }} type="text" placeholder="256" maxLength={50} textAlign="left" width="w-2/3 md:w-1/4"  disabled={true} />
            </div>

            <div className="border-t border-gray1 border-opacity-80 mx-8 my-8 mr-8"></div>

            <div className="text-m text-gray2 font-semibold mx-8 mt-8">Critical Settings</div>

            <div className="flex flex-col mx-6 mt-4">
                <CriticalAction title="Delete all data" subtitle="This will delete all the gathered data in the tables. This will not delete tables" buttonText={"Delete"} buttonColor={"red"} onClick={() => { }} /> 
                <CriticalAction title="Delete all tables" subtitle="This will delete all the gathered data as well as tables" buttonText={"Delete"} buttonColor={"red"} onClick={() => { }} />   
                <CriticalAction title="Delete all devices" subtitle="This will delete all the devices and their respective gathered data" buttonText={"Delete"} buttonColor={"red"} onClick={() => { }} />   
                <CriticalAction title="Delete project" subtitle="This will delete this project, including all devices, tables, data and dashboard" buttonText={"Delete"} buttonColor={"red"} onClick={() => { }} />     
            </div> 

        </SidebarLayout>
    );

   
}

export default ProjectSettings;