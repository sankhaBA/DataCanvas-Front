import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PopupContainer from "./PopupContainer";
import ButtonRectangle from "./ButtonRectangle";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const AddDataPopup = ({ isOpen, closeFunction, columns, projectID, tblName, setLoading }) => {
    const [devices, setDevices] = useState([]);
    const [newData, setNewData] = useState({});

    useEffect(() => {
        loadDevices();
        setNewDataObject(columns);
    }, [])


    // setNewData() -> Make this a JSON object with fields same as the clm_name of each element of columns object, except id column
    const setNewDataObject = (columns) => {
        let newDataObject = {};
        columns.map((column, index) => {
            if (column.clm_name !== 'id') {
                newDataObject[column.clm_name] = '';
            }
        })
        console.log(newDataObject);
        setNewData(newDataObject);
    }

    const handleColumnValueChanged = (clm_name, value) => {
        console.log(clm_name, value);
        setNewData({ ...newData, [clm_name]: value });
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

            if (response.status === 200) {
                console.log(response.data);
                setDevices(response.data);
                setLoading(false);
            }
        } catch (err) {
            switch (err.status) {
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
            closeFunction();
        }
    }

    const InputContainer = (caption, placeholder, value, onChange, dataType) => {
        return (
            <div className="my-3">
                <span className="text-sm">{caption}</span>
                <TextBox type={((dataType == 1 || dataType == 2) ? 'number' : 'text')} placeholder={placeholder} value={value} onChange={(e) => onChange(caption, e.target.value)} />
            </div>
        )
    }

    return (
        <PopupContainer
            isOpen={isOpen}
            onClose={() => { }}
            closeFunction={closeFunction}
            title="Add Data"
            Icon={FaPlus}
            closeIconVisible={true}>
            <div className=" h-80 overflow-scroll pe-4 sm:pe-8 ps-0 sm:ps-2 pb-4">

                <div className="my-3">
                    <span className="text-sm">Device</span>
                    <SelectBox value={0} onChange={() => { }}>
                        {devices.map((device) => {
                            return (
                                <option
                                    key={device.device_id}
                                    value={device.device_id}>
                                    {device.device_name}
                                </option>
                            )
                        })}
                    </SelectBox>
                </div>
                {columns.map((column, index) => {
                    if (column.clm_name !== 'id' && column.clm_name !== 'device') {
                        return (
                            <div key={index}>
                                {InputContainer(
                                    column.clm_name,
                                    'Enter ' + column.clm_name + ' value',
                                    newData[column.clm_name],
                                    (clm_name, value) => handleColumnValueChanged(clm_name, value),
                                    column.data_type
                                )}
                            </div>
                        )
                    }
                })}
            </div>
            {/* Horizontal Rule */}
            <hr className="my-4 border-1 border-gray1 border-opacity-30" />
            <div className="flex justify-end space-x-4">
                <ButtonRectangle text="Add" onClick={() => { }} />
                <ButtonRectangle text="Cancel" onClick={closeFunction} />
            </div>

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
        </PopupContainer>

    )

}

export default AddDataPopup;