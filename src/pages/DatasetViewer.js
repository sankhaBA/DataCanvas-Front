// Dependencies
import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import PopupContainer from "../components/PopupContainer";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import TextBox from "../components/TextBox";
import SelectBox from "../components/SelectBox";
import Spinner from "../components/Spinner";
import CriticalAction from "../components/CriticalAction";
import ConfigTableCard from "../components/ConfigTableCard";
import LoginPopup from "../components/LoginPopup";
import axios from "axios";
import './../styles/scrollbar.css';

function DatasetViewer() {
    // ---------- Navigation hooks ----------
    const navigate = useNavigate();

    // ---------- Get states from navigation location for retrieval of tbl_id ----------
    const { state } = useLocation();

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- Table Details ----------
    const [projectID, setProjectID] = useState(-1);
    const [tblID, setTblID] = useState(-1);
    const [tblName, setTblName] = useState([]);

    const [dataTypes, setDataTypes] = useState([
        // {
        //     type_id: 1,
        //     type_name: 'Integer'
        // },
    ])

    const [constraints, setConstraints] = useState([
        // {
        //     constraint_id: 1,
        //     constraint_name: 'Auto Increment'
        // },
    ])

    const [columns, setColumns] = useState([
        // {
        //     clm_id: 1,
        //     clm_name: 'id',
        //     data_type: 1,
        //     default_value: 'N/A',
        //     max_length: 0,
        //     constraints: [
        //         {
        //             constraint_id: 1
        //         },
        //         {
        //             constraint_id: 2
        //         }
        //     ]
        // }
    ]);

    useEffect(() => {
        // ---------- Getting tbl_id from the location state and uypdating tblID state ----------
        try {
            setTblID(state.tbl_id);
            setProjectID(state.project_id);
            console.log('tbl_id : ' + state.tbl_id);
            // ---------- Get auth-token from local storage ----------
            const token = localStorage.getItem('auth-token');
            getDataTypes(token);
            getConstraints(token);
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        // ---------- Get table details ----------
        if (tblID != -1) {
            getTableDetails();
        }
    }, [tblID]);

    useEffect(() => {
        // ---------- Get table details ----------
        if (tblID != -1 && dataTypes.length > 0 && constraints.length > 0 && columns.length == 0) {
            getColumnDetails();
        }
    }, [dataTypes, constraints]);

    // ---------- Function to get data types ----------
    const getDataTypes = async (token) => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3001/api/data/config/type/`, {
                headers: {
                    'authorization': token
                }
            });
            console.log('Data Types : ', res.data);
            setDataTypes(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            switch (err.response.status) {
                case 401 || 403:
                    navigate('/login');
                    break;
                default:
                    console.log('Error in getting data types');
                    toast.error('Error in getting data types');
                    navigate('/overview');
                    break;
            }
        }
    }

    // ---------- Function to get constraints ----------
    const getConstraints = async (token) => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3001/api/data/config/constraint/`, {
                headers: {
                    'authorization': token
                }
            });
            console.log('Constraints : ', res.data);
            setConstraints(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            switch (err.response.status) {
                case 401 || 403:
                    navigate('/login');
                    break;
                default:
                    console.log('Error in getting constraints');
                    toast.error('Error in getting constraints');
                    navigate('/overview');
                    break;
            }
        }
    }

    // ---------- Function to get table details ----------
    const getTableDetails = async () => {
        try {
            setLoading(true);
            // ---------- Get auth-token from local storage ----------
            const token = localStorage.getItem('auth-token');
            const res = await axios.get(`http://localhost:3001/api/data/tbl/` + tblID, {
                headers: {
                    'authorization': token
                }
            });
            setTblName(res.data.tbl_name);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            switch (err.response.status) {
                case 401 || 403:
                    navigate('/login');
                    break;
                default:
                    console.log('Error in getting table details');
                    toast.error('Error in getting table details');
                    navigate('/overview');
                    break;
            }
        }
    }

    // ---------- Function to get column details ----------
    const getColumnDetails = async () => {
        try {
            setLoading(true);
            // ---------- Get auth-token from local storage ----------
            const token = localStorage.getItem('auth-token');
            const res = await axios.get(`http://localhost:3001/api/data/clm?tbl_id=` + tblID, {
                headers: {
                    'authorization': token
                }
            });
            console.log('Columns : ', res.data);
            // Sort columns by clm_id
            res.data.sort((a, b) => (a.clm_id > b.clm_id) ? 1 : -1);
            setColumns(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            switch (err.response.status) {
                case 401 || 403:
                    navigate('/login');
                    break;
                default:
                    console.log('Error in getting table column details');
                    toast.error('Error in getting table column details');
                    navigate('/overview');
                    break;
            }
        }
    }

    return (
        <SidebarLayout active={3} addressText={'John Doe > UOM Weather Station > tblsensor_data > Configure'}>
            {/* Devices Section */}
            <div className={`flex flex-col sm:flex-row justify-center items-center text-center sm:justify-between px-7 sm:px-10 mt-5 sm:mt-3`}>
                <span className={`text-lg`}>Gathered Data - {tblName}</span>
                <div className={`flex mt-2 sm:mt-0 space-x-4`}>
                    <PillButton text="View API" icon={FaUpload} onClick={() => { }} />
                    <PillButton text="Add Data" icon={FaPlusCircle} onClick={() => { }} />
                </div>
            </div>

            <div className="overflow-x-scroll overflow-y-scroll max-h-[500px] px-7 sm:px-10 mt-5 sm:mt-6">
                <table className="table-fixed w-full mb-4">
                    <thead>
                        <tr className={`bg-black3 `}>
                            {columns.map((column, index) => {
                                return (
                                    <th key={column.clm_id} className="w-[300px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">{column.clm_name}</th>
                                )
                            })}
                            <th className="w-[300px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">COLUMN</th>
                            <th className="w-[300px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">COLUMN</th>
                            <th className="w-[300px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">COLUMN</th>
                            <th className="w-[300px] border border-gray1 border-opacity-40 text-gray2 text-sm py-2 font-normal">COLUMN</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Example rows */}
                        <tr>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                        </tr>
                        <tr>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                            <td className="border border-gray1 border-opacity-40 text-white text-xs text-center px-4 py-2">1</td>
                        </tr>

                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </SidebarLayout>
    );

}

export default DatasetViewer;
