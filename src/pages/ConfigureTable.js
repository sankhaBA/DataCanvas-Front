// Dependencies
import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaSalesforce, FaUpload } from "react-icons/fa";
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

    // ---------- Popup states ----------
    const [isAddColumnPopupVisible, setIsAddColumnPopupVisible] = useState(false);
    useEffect(() => {
        setNewColumnName('');
        setNewColumnDataType(-1);
        setNewColumnMaxLength(0);
        setNewColumnDefaultValue('');
        setNewColumnAutoIncrement(false);
        setNewColumnNullAllowed(false);
        setNewColumnUnique(false);
    }, [isAddColumnPopupVisible]);

    const [newColumnName, setNewColumnName] = useState('');
    const [newColumnDataType, setNewColumnDataType] = useState(-1);
    useEffect(() => {
        if (newColumnDataType == 3) {
            setNewColumnMaxLength(255);
            setNewColumnAutoIncrement(false);
        } else {
            setNewColumnMaxLength(0);
        }
        setNewColumnDefaultValue('');
    }, [newColumnDataType]);
    const [newColumnMaxLength, setNewColumnMaxLength] = useState(0);
    const [newColumnDefaultValue, setNewColumnDefaultValue] = useState('');
    const [newColumnAutoIncrement, setNewColumnAutoIncrement] = useState(false);
    const [newColumnNullAllowed, setNewColumnNullAllowed] = useState(false);
    const [newColumnUnique, setNewColumnUnique] = useState(false);

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

    const AddColumnPopup = () => {

        const validateNewColumn = () => {
            if (newColumnName.trim() == '' || newColumnName.trim() == null) {
                toast.warning('Field Name cannot be empty');
                return false;
            }

            if (newColumnDataType == -1) {
                toast.warning('Please select a data type');
                return false;
            }

            if (newColumnDataType == 3) {
                if ((newColumnMaxLength == 0 || newColumnMaxLength == '' || newColumnMaxLength == null)) {
                    toast.warning('Maximum length should be more than 0 for Text data type');
                    return false;
                }
            } else {
                if (isNaN(newColumnDefaultValue)) {
                    toast.warning('Default value should be a number for numerical data types');
                    return false;
                }

                if (newColumnAutoIncrement && newColumnDataType != 1) {
                    toast.warning('Auto Increment is only allowed for Integer data type');
                    return false;
                }

                // For data type = 2, default value should be an integer, not a decimal number
                if (newColumnDataType == 2 && (newColumnDefaultValue % 1 != 0)) {
                    toast.warning('Default value should be an integer for Integer data type');
                    return false;
                }
            }

            return true;
        }

        const saveNewColumn = async () => {
            if (validateNewColumn()) {
                setLoading(true);
                // ---------- Get auth-token from local storage ----------
                const token = localStorage.getItem('auth-token');

                /*
                    REQUEST BODY STRUCTURE
                    {
                        "clm_name": "humidity",
                        "data_type": 2,
                        "tbl_id": 1,
                        "default_value": null,
                        "max_length": null,
                        "constraints": [1,2]
                    }
                */

                let constraints = [];
                if (newColumnAutoIncrement) {
                    constraints.push(constraints.find(x => x.constraint_name == 'Auto Increment').constraint_id);
                }
                if (newColumnNullAllowed) {
                    constraints.push(constraints.find(x => x.constraint_name == 'Not Null').constraint_id);
                }
                if (newColumnUnique) {
                    constraints.push(constraints.find(x => x.constraint_name == 'Unique').constraint_id);
                }

                const requestBody = {
                    clm_name: newColumnName,
                    data_type: newColumnDataType,
                    tbl_id: tblID,
                    default_value: newColumnDefaultValue,
                    max_length: newColumnMaxLength,
                    constraints: constraints
                }

                try {
                    const res = await axios.post(`http://localhost:3001/api/data/clm/`, requestBody, {
                        headers: {
                            'authorization': token
                        }
                    });

                    if (res.status == 201) {
                        toast.success('Field added successfully');
                        setIsAddColumnPopupVisible(false);
                        getColumnDetails();
                    }
                } catch (err) {
                    console.log(err);
                    switch (err.response.status) {
                        case 401 || 403:
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                            break;
                        case 400 || 404:
                            toast.error('Error in adding field');
                            navigate('/projects')
                            break;
                        default:
                            toast.error('Something went wrong');
                            break;
                    }
                } finally {
                    setLoading(false);
                    setIsAddColumnPopupVisible(false);
                }

            }
        }

        return (
            <PopupContainer isOpen={isAddColumnPopupVisible}
                onClose={() => { }}
                closeFunction={() => setIsAddColumnPopupVisible(false)}
                Icon={FaPlusCircle}
                title='Add Table Fields'
                closeIconVisible={true}
                width={'550px'}>
                <div className="sm:flex justify-between items-center mt-4 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                    <div className="flex flex-col justify-center sm:w-1/2">
                        <label className="text-gray1 text-sm">Field Name</label>
                        <TextBox text=""
                            type="text"
                            placeholder="Field Name"
                            maxLength={20}
                            textAlign={'left'}
                            onChange={((e) => setNewColumnName(e.target.value))}
                            value={newColumnName} />
                    </div>

                    <div className="flex flex-col justify-center sm:w-1/2">
                        <label className="text-gray1 text-sm">Data Type</label>
                        <SelectBox onChange={(e) => setNewColumnDataType(e.target.value)}
                            value={newColumnDataType}>
                            <option value={-1}>Select Data Type</option>
                            {dataTypes.map((type) => {
                                return (
                                    <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                                )
                            })}
                        </SelectBox>
                    </div>
                </div>

                <div className="sm:flex justify-between items-center mt-4 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                    <div className="flex flex-col justify-center">
                        <label className="text-gray1 text-sm">Maximum Length</label>
                        <TextBox text=""
                            type='number'
                            placeholder="Maximum Length"
                            maxLength={20}
                            textAlign={'left'}
                            onChange={((e) => setNewColumnMaxLength(e.target.value))}
                            value={newColumnMaxLength}
                            disabled={(newColumnDataType == 3) ? false : true} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="text-gray1 text-sm">Default Value</label>
                        <TextBox text=""
                            type='mumber'
                            placeholder="Default Value"
                            maxLength={255}
                            textAlign={'left'}
                            onChange={((e) => setNewColumnDefaultValue(e.target.value))}
                            value={newColumnDefaultValue} />
                    </div>
                </div>

                <div className="sm:flex justify-center items-center mt-4 sm:mt-8 space-y-4 sm:space-y-0 space-x-0 sm:space-x-12">
                    {/* 3 Check boxes with captions Auto Increment, Null Allowed, Unique. Checkbox and the caption should be horizontally aligned*/}
                    {newColumnDataType != 3 ? (
                        <div className="flex justify-center items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4"
                                checked={newColumnAutoIncrement}
                                onChange={(e) => setNewColumnAutoIncrement(e.target.value)} />
                            <label className="text-gray2 text-sm">Auto Increment</label>
                        </div>
                    ) : null}

                    <div className="flex justify-center items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4"
                            checked={newColumnNullAllowed}
                            onChange={(e) => setNewColumnNullAllowed(e.target.value)} />
                        <label className="text-gray2 text-sm">Null Allowed</label>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4"
                            checked={newColumnUnique}
                            onChange={(e) => setNewColumnUnique(e.target.value)} />
                        <label className="text-gray2 text-sm">Unique</label>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-6">
                    <PillButton text="Save Field" onClick={() => { saveNewColumn() }} icon={FaUpload} />
                </div>
            </PopupContainer>
        )
    }

    return (
        // Sidebar Layout Component
        <SidebarLayout active={3} addressText={'John Doe > UOM Weather Station > tblsensor_data > Configure'}>
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
                <PillButton text="Add Fields" icon={FaPlusCircle} onClick={() => { setIsAddColumnPopupVisible(true) }} />
            </div>

            {/* Popup container for column adding */}
            {isAddColumnPopupVisible ? AddColumnPopup() : null}

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