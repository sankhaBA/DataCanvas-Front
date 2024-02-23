// Dependencies
import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
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
import ConfigTableCard from "../components/ConfigTableCard";
import axios from "axios";

function ConfigureTable() {
    // ---------- Navigation hooks ----------
    const navigate = useNavigate();

    // ---------- Get states from navigation location for retrieval of tbl_id ----------
    const { state } = useLocation();

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false);

    // ---------- Table Details ----------
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
                    toast.error('Error in getting data types');
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
                    toast.error('Error in getting table column details');
                    navigate('/overview');
                    break;
            }
        }
    }

    return (
        // Sidebar Layout Component
        <SidebarLayout active={0} addressText={'John Doe > UOM Weather Station > tblsensor_data > Configure'}>
            {/* Devices Section */}
            <div className={`flex flex-col sm:flex-row justify-center items-center text-center sm:justify-between px-7 sm:px-10 mt-5 sm:mt-3`}>
                <span className={`text-lg`}>Configure Table - {tblName}</span>
                <div className={`mt-2 sm:mt-0`}>
                    <PillButton text="Table Settings" icon={FaPlusCircle} onClick={() => { }} />
                </div>
            </div>

            <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                {/* <ConfigTableCard columnName="id" dataType="Integer" defaultValue="N/A" isAutoIncrement={true} isNullAllowed={false} isUnique={true} onClick={() => { }} /> */}
                {columns.map((column) => {
                    return (
                        <ConfigTableCard key={column.clm_id}
                            columnName={column.clm_name}
                            dataType={`${(dataTypes.find(x => x.type_id == column.data_type).type_name)}` + `${(column.max_length != null) ? `(${column.max_length})` : ''}`}
                            defaultValue={(column.default_value == null) ? 'N/A' : column.default_value}
                            isAutoIncrement={column.constraints.find(x => x.constraint_id == 1) != undefined}
                            isNullAllowed={column.constraints.find(x => x.constraint_id == 2) != undefined}
                            isUnique={column.constraints.find(x => x.constraint_id == 3) != undefined}
                            onClick={() => { }}
                            onEdit={() => { }}
                            onDelete={() => { }}
                            disabled={((column.clm_name == 'id' || (column.clm_name) == 'device')) ? true : false} />
                    )
                })}
            </div>

            <div className={`flex flex-row justify-center items-center mt-12`}>
                <PillButton text="Add Fields" icon={FaPlusCircle} onClick={() => { }} />
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
    )
}

export default ConfigureTable;