// Dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";

function ProjectOverview() {
    // ---------- Navigation hooks ----------
    const navigate = useNavigate();

    // ---------- Get states from navigation location for retrieval of project_id ----------
    const { state } = useLocation();

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- Project ID state ----------
    const [projectID, setProjectID] = useState(-1);

    useEffect(() => {

        // ---------- Getting project_id from the location state and uypdating projectID state ----------
        // try {
        //     setProjectID(state.project_id);
        // } catch (err) {
        //     console.log(err);
        //     navigate('/projects');
        // }
    }, []);

    useEffect(() => {
        if (projectID !== -1) {
            // ---------- Load project details from the backend ----------
        }
    }, [projectID]);

    return (
        // Sidebar Layout Component
        <SidebarLayout active={0}>

            {/* Page Title - Project Name */}
            <div className={`text-lg px-7 sm:px-10 mb-3`}>UOM Weather Station</div>

            {/* Insights Section */}
            <div className={`flex flex-wrap justify-center`}>
                <InsightCard title="59" subtitle="Registered Devices" icon={FaMicrochip} />
                <InsightCard title="1056" subtitle="Total Data Records" icon={FaDatabase} />
                <InsightCard title="01/01/2024" subtitle="Last Record Update" icon={FaClock} />
            </div>

            {/* Devices Section */}
            <div className={`flex flex-row justify-between px-7 sm:px-10 mt-8 sm:mt-3`}>
                <span className={`text-lg`}>Devices</span>
                <div className={``}>
                    <PillButton text="Add Device" icon={FaPlusCircle} onClick={() => {}} />
                </div>
            </div>
            <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="Ratnapura Weather Station" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
            </div>
            <div className={`flex flex-row justify-center items-center mt-4`}>
                <PillButton text="View All" icon={FaForward} onClick={() => {}} />
            </div>
            
            {/* Data Tables Section */}
            <div className={`flex flex-row justify-between px-7 sm:px-10 mt-8 sm:mt-3`}>
                <span className={`text-lg`}>Data Tables</span>
                <div className={``}>
                    <PillButton text="Add Data Table" icon={FaPlusCircle} onClick={() => {}} />
                </div>
            </div>
            <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                <RectangularCard title="sensor-reading-table" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="sensor-reading-table" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="sensor-reading-table" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
                <RectangularCard title="sensor-reading-table" subtitle="Last Update: 01/01/2023" icon={FaAngleRight}/>
            </div>
            <div className={`flex flex-row justify-center items-center mt-4 mb-32`}>
                <PillButton text="View All" icon={FaForward} onClick={() => {}} />
            </div>
        </SidebarLayout>
    );
}

export default ProjectOverview;

