// Dependencies
import React, { useState, useEffect } from "react";
import { } from "react-icons/fa";
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
        try {
            setProjectID(state.project_id);
        } catch (err) {
            console.log(err);
            navigate('/projects');
        }
    }, []);

    useEffect(() => {
        if(projectID !== -1){
                // ---------- Load project details from the backend ----------
        }
    }, [projectID]);

    return (
        // Sidebar Layout Component
        <SidebarLayout active={0}>

        </SidebarLayout>
    );
}

export default ProjectOverview;

