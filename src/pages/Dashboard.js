import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarLayout from "../components/layouts/SidebarLayout";
import PillButton from '../components/input/PillButton';
import Spinner from "../components/Spinner";
import axios from "axios";
import AddWidgetContainer from '../components/Widgets/AddWidgetContainer';

function Dashboard() {
    // ---------- Get states from navigation location for retrieval of project_id ----------
    const { state } = useLocation();

    // ---------- Navigation hooks ----------
    const navigate = useNavigate()

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- States for project ID and data tables ----------
    const [projectID, setProjectID] = useState(-1);
    const [projectName, setProjectName] = useState(localStorage.getItem('project'));
    const [dataTables, setDataTables] = useState([]);

    // ---------- State to store devices of the selected project ----------
    const [devices, setDevices] = useState([]);

    // ---------- states and functions for Add Widget Popup visibility ----------
    const [isAddWidgetPopupVisible, setIsAddWidgetPopupVisible] = useState(false);
    const toggleAddDatatableModal = () => setIsAddWidgetPopupVisible(!isAddWidgetPopupVisible);

    useEffect(() => {
        // ---------- Getting project_id from the location state and uypdating projectID state ----------
        try {
            setProjectID(state.project_id);
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (projectID != -1) {
            loadDataTables();
            loadDevices();
        }
    }, [projectID]);

    // ---------- Load data tables from the backend ----------
    const loadDataTables = async () => {
        setLoading(true);
        // Get request to localhost:3001/api/data/tbl?project_id=<project_id> to get data tables
        try {
            const response = await axios.get(`http://localhost:3001/api/data/tbl?project_id=${projectID}`, {
                headers: {
                    'authorization': localStorage.getItem('auth-token')
                }
            });

            if (response.status == 200) {
                let dataTablesArray = [];
                response.data.forEach((dataTable) => {
                    let tableDetails = {
                        tbl_id: dataTable.tbl_id,
                        tbl_name: dataTable.tbl_name,
                    }
                    dataTablesArray.push(tableDetails);
                });
                setDataTables(dataTablesArray);
                setLoading(false);
            }

        } catch (err) {
            switch (err.response.status) {
                case 400:
                    toast.error('Bad request!');
                    break;
                case 401:
                    toast.error('Unauthorized access!');
                    navigate('/login');
                    break;
                case 403:
                    toast.error('Unauthorized access!');
                    navigate('/login');
                    break;
                case 404:
                    toast.error('Project not found!');
                    navigate('/projects');
                    break;
                default:
                    toast.error('Something went wrong!');
                    break;
            }
            setDataTables([]);
            setLoading(false);
        }
    }

    const loadDevices = async () => {
        setLoading(true);
        // get request to localhost:3001/api/device?project_id=<projectID>
        try {
            const response = await axios.get(
                `http://localhost:3001/api/device?project_id=${projectID}`,
                {
                    headers: {
                        authorization: localStorage.getItem("auth-token"),
                    },
                }
            );

            if (response.status == 200) {
                let devicesArray = [];
                response.data.forEach((device) => {
                    let deviceDetails = {
                        device_id: device.device_id,
                        device_name: device.device_name,
                    };
                    devicesArray.push(deviceDetails);
                });

                setDevices(devicesArray);
                setLoading(false);
            }
        } catch (err) {
            switch (err.response.status) {
                case 400:
                    toast.error("Bad request!");
                    break;
                case 401:
                    toast.error("Unauthorized access!");
                    break;
                case 403:
                    toast.error("Unauthorized access!");
                    break;
                case 404:
                    toast.error("Project not found!");
                    break;
                default:
                    toast.error("Something went wrong!");
                    break;
            }
            setDevices([]);
            setLoading(false);
        }
    }

    return (
        <SidebarLayout active={1}
            breadcrumb={`${localStorage.getItem('project')} > Dashboard`}>
            <div className={`flex flex-row justify-between px-7 sm:px-10 mt-6 sm:mt-2`}>
                <span className={`text-lg font-semibold`}>{projectName}</span>
                <PillButton text="Add Widget" icon={FaPlusCircle} onClick={() => { setIsAddWidgetPopupVisible(true) }} />
            </div>

            <AddWidgetContainer isOpen={isAddWidgetPopupVisible}
                closeFunction={toggleAddDatatableModal}
                tables={dataTables}
                devices={devices}
                setLoading={setLoading}
            />

            <Spinner isVisible={loading} />

            <ToastContainer
                position="bottom-center"
                closeFunction={toggleAddDatatableModal}
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

export default Dashboard;