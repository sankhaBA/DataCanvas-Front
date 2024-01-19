// Dependencies
import React, { useState, useEffect } from "react";
import { } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import axios from "axios";

function ProjectOverview() {

    useEffect(() => {
        console.log("ProjectOverview")
    }, []);

    return (
        <SidebarLayout active={0}>
            Sankha Bimsara Ambeypitiya Sankha Bimsara Ambeypitiya Sankha Bimsara Ambeypitiya
        </SidebarLayout>
    );
}

export default ProjectOverview;

