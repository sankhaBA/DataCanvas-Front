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

function ProjectOverview() {
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

    // ---------- Devices states ----------
    const [devices, setDevices] = useState([]);

    // ---------- Data Table states ----------
    const [dataTables, setDataTables] = useState([]);

    // ---------- Miscallenous states ----------
    const [dataRecordsCount, setDataRecordsCount] = useState(548);
    const [lastRecordUpdate, setLastRecordUpdate] = useState('2021-08-01');

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
        if (projectID !== -1) {
            console.log('Project ID', projectID);
            loadProjectDetails();
        }
    }, [projectID]);

    useEffect(() => {
        if (projectDetails.name !== '') {
            console.log('Project Details', projectDetails);
            loadDevices();
            loadDataTables();
        }
    }, [projectDetails]);

    useEffect(() => {

    }, [devices]);

    // ---------- Load project details from the backend ----------
    const loadProjectDetails = async () => {
        setLoading(true);

        // Get request to localhost:3001/api/project/<project_id> to get project details
        try {
            const response = await axios.get(`http://localhost:3001/api/project/${projectID}`, {
                headers: {
                    'authorization': localStorage.getItem('auth-token')
                }
            });

            if (response.status === 200) {
                let details = {
                    name: response.data.project_name,
                    description: response.data.description,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt,
                    user_id: response.data.user_id,
                }

                setProjectDetails(details);

                setLoading(false);
            }

        } catch (err) {
            switch (err.status) {
                case 400:
                    toast.error('Bad request!');
                    break;
                case 401:
                    toast.error('Unauthorized access!');
                    break;
                case 403:
                    toast.error('Unauthorized access!');
                    break;
                case 404:
                    toast.error('Project not found!');
                    break;
                default:
                    toast.error('Something went wrong!');
                    break;
            }
            setLoading(false);
        }
    }

    // ---------- Load devices from the backend ----------
    const loadDevices = async () => {
        setLoading(true);

        // Get request to localhost:3001/api/device?project_id=<project_id> to get devices
        try {
            const response = await axios.get(`http://localhost:3001/api/device?project_id=${projectID}`, {
                headers: {
                    'authorization': localStorage.getItem('auth-token')
                }
            });

            if (response.status === 200) {
                console.log(response.data);

                let devicesArray = [];
                response.data.forEach((device) => {
                    // Specify the locale as 'si-LK' for Sri Lanka
                    const date = new Date(device.updatedAt);
                    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' };
                    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

                    let deviceDetails = {
                        device_id: device.device_id,
                        device_name: device.device_name,
                        updatedAt: formattedDate,
                    }
                    devicesArray.push(deviceDetails);
                });
                setDevices(devicesArray);
                setLoading(false);
            }

        } catch (err) {
            switch (err.status) {
                case 400:
                    toast.error('Bad request!');
                    break;
                case 401:
                    toast.error('Unauthorized access!');
                    break;
                case 403:
                    toast.error('Unauthorized access!');
                    break;
                case 404:
                    toast.error('Project not found!');
                    break;
                default:
                    toast.error('Something went wrong!');
                    break;
            }
            setDevices([]);
            setLoading(false);
        }
    }

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

            if (response.status === 200) {
                console.log(response.data);

                let dataTablesArray = [];
                response.data.forEach((dataTable) => {

                    const date = new Date(dataTable.updatedAt);
                    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' };
                    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

                    let tableDetails = {
                        tbl_id: dataTable.tbl_id,
                        tbl_name: dataTable.tbl_name,
                        updatedAt: formattedDate,
                    }
                    dataTablesArray.push(tableDetails);
                });
                setDataTables(dataTablesArray);
                setLoading(false);
            }

        } catch (err) {
            switch (err.status) {
                case 400:
                    toast.error('Bad request!');
                    break;
                case 401:
                    toast.error('Unauthorized access!');
                    break;
                case 403:
                    toast.error('Unauthorized access!');
                    break;
                case 404:
                    toast.error('Project not found!');
                    break;
                default:
                    toast.error('Something went wrong!');
                    break;
            }
            setDataTables([]);
            setLoading(false);
        }
    }

    return (
        // Sidebar Layout Component
        <SidebarLayout active={0} addressText={`John Doe > ${projectDetails.name} > Overview`}>

            {/* Page Title - Project Name */}
            <div className="container  mb-32">
                <div className={`text-lg px-7 sm:px-10 mb-3`}>{projectDetails.name}</div>

                {/* Insights Section */}
                <div className={`flex flex-wrap justify-center`}>
                    <InsightCard title={devices.length} subtitle="Registered Devices" icon={FaMicrochip} />
                    <InsightCard title={dataRecordsCount} subtitle="Total Data Records" icon={FaDatabase} />
                    <InsightCard title={lastRecordUpdate} subtitle="Last Record Update" icon={FaClock} />
                </div>

                {/* Devices Section */}
                <div className={`flex flex-row justify-between px-7 sm:px-10 mt-8 sm:mt-3`}>
                    <span className={`text-lg`}>Devices</span>
                    <div className={`bg-green px-4 py-1 text-sm text-black3 border border-black2 rounded-full`}>
                        {devices.length} Devices Found
                    </div>
                </div>
                <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                    {devices.length > 0 ? (
                        devices.slice(0, 5).map((device) => {
                            return (
                                <RectangularCard key={device.device_id} title={device.device_name} subtitle={`Last Update: ${device.updatedAt}`} icon={FaAngleRight} />
                            );
                        })
                    ) : (
                        <div className={`flex flex-row justify-center items-center mt-4`}>
                            <PillButton text="Add Your First Device" icon={FaPlusCircle} onClick={() => {
                                navigate('/devices', { state: { project_id: projectID } });
                            }} />
                        </div>
                    )}
                </div>

                {devices.length > 0 ? (
                    <div className={`flex flex-row justify-center items-center mt-4`}>
                        <PillButton text="View All" icon={FaForward} onClick={() => {
                            navigate('/devices', { state: { project_id: projectID } });
                        }} />
                    </div>
                ) : null}

                {/* Data Tables Section */}
                <div className={`flex flex-row justify-between px-7 sm:px-10 mt-12 sm:mt-10`}>
                    <span className={`text-lg`}>Data Tables</span>
                    <div className={`bg-green px-4 py-1 text-sm text-black3 border border-black2 rounded-full`}>
                        {dataTables.length} Table Found
                    </div>
                </div>
                <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                    {dataTables.length > 0 ? (
                        dataTables.slice(0, 5).map((table) => {
                            return (
                                <RectangularCard key={table.tbl_id} title={table.tbl_name} subtitle={`Last Update: ${table.updatedAt}`} icon={FaAngleRight} />
                            );
                        })
                    ) : (
                        <div className={`flex flex-row justify-center items-center mt-4`}>
                            <PillButton text="Add Your First Table" icon={FaPlusCircle} onClick={() => {
                                navigate('/datahandler', { state: { project_id: projectID } });
                            }} />
                        </div>
                    )}
                </div>

                {dataTables.length > 0 ? (
                    <div className={`flex flex-row justify-center items-center mt-4`}>
                        <PillButton text="View All" icon={FaForward} onClick={() => {
                            navigate('/datahandler', { state: { project_id: projectID } });
                        }} />
                    </div>
                ) : null}
            </div>

            {/* Spinner */}
            <Spinner isVisible={loading} />

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

export default ProjectOverview;

