// Dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import PillButton from "../components/PillButton";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";

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

        </SidebarLayout>
    );

   
}

export default ProjectSettings;