import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarLayout from "../components/layouts/SidebarLayout";
import PillButton from '../components/input/PillButton';
import ExpandedChart from '../components/Widgets/ExpandedChart';
import Spinner from "../components/Spinner";
import axios from "axios";

function ExpandedWidget() {
    // ---------- Get states from navigation location for retrieval of project_id ----------
    const { state } = useLocation();

    // ---------- Navigation hooks ----------
    const navigate = useNavigate()

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- States for project ID and data tables ----------
    const [projectID, setProjectID] = useState(-1);

    // ---------- State to store details of the selected widget ----------
    const [widgetID, setWidgetID] = useState(-1);
    const [widget, setWidget] = useState({
        widget_id: 1,
        widget_name: "Temperature Variation",
        dataset: 59,
        widget_type: 1,
        configuration: {
            chart_id: 1,
            x_axis: 0,
            chart_type: 1,
            series: [
                {
                    series_id: 1,
                    series_name: "Temperature",
                    clm_id: 146,
                    device_id: 72
                }
            ]
        }
    });

    useEffect(() => {
        // ---------- Getting project_id from the location state and uypdating projectID state ----------
        try {
            setProjectID(state.project_id);
            setWidgetID(state.widget_id);
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (widgetID != -1) {
            loadWidgetDetails();
        }
    }, [widgetID]);

    // ---------- Load widget details from the backend ----------
    const loadWidgetDetails = async () => {

    }

    return (
        <SidebarLayout active={1}
            breadcrumb={`${localStorage.getItem('project')} > Dashboard > ${widget.widget_name}`}>
            <div className='px-2 sm:px-10 mt-8 mb-24'>
                <div className={`flex flex-row justify-between px-7 sm:px-10 mt-6 sm:mt-2 mb-8`}>
                    <span className={`text-lg font-semibold`}>{widget.widget_name}</span>
                </div>

                {/* Expanded chart component */}
                {widget.widget_type == 1 && <ExpandedChart widget={widget} />}
            </div>


            {/* Chart component */}


            {/* Spinner component will be visible when loading state is true */}
            <Spinner isVisible={loading} />

            {/* Toast container for notifications */}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </SidebarLayout>
    );
}

export default ExpandedWidget;