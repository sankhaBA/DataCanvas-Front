import React, { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import Switch from "react-switch";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardToggleCard = ({
    onClick = () => { },
    widget,
    deleteWidget = () => { }
}) => {
    const [toggleState, setToggleState] = useState(false);

    useEffect(() => {
        loadToggleData();
    }, []);

    /*
        * Function to load the data for the toggle widget
        * @param {void}
        * @returns {void}
        * Use the relevant API and load data for this toggle widget
        * Set the true/false value to the toggleState state
    */
    const loadToggleData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/data/get/toggle/${widget.id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('auth-token')
                    }
                });

            if (response.status == 200) {
                setToggleState(response.data[widget.configuration.Column.clm_name]);
            }
        } catch (err) {
            switch (err.response.status) {
                case 404:
                    toast.error(`Data not found for ${widget.widget_name}!`);
                    setToggleState(false);
                    break;
                default:
                    toast.error('Something went wrong!');
                    break;
            }
        }
    }

    /*
        * Function to update the toggle status
        * @param {boolean} status - The status of the toggle
        * @returns {void}
        * Use the relevant API and update the toggle status
    */
    const updateToggleState = async (status) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/data/feed/update/toggle`,
                {
                    widget_id: widget.id,
                    new_value: status
                }
            );

            if (response.status == 200) {
                toast.success("toggle updated successfully")
            }
        } catch (err) {
            console.log(err);
            toast.error(`Something went wrong while updating ${widget.widget_name} status!`);
            return;
        }
    }


    const handleToggleChange = async (status) => {
        setToggleState(status);
        updateToggleState(status);
    }

    return (
        <div
            className={
                `w-full sm:w-[400px] h-[300px] bg-black3 rounded-2xl mx-3 my-1 sm:my-5
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green cursor-pointer`
            }
            onClick={onClick}
        >
            <div className="w-full h-full pt-4 pl-4 pb-4 flex flex-col justify-between">
                <div className="flex items-center justify-start">
                    {/* Content for the main box (title and icon) */}
                    <IoIosSwitch className="text-xl text-green" />
                    <div className="text-md text-gray2 font-medium max-w-full truncate ms-2">{widget.widget_name}</div>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <Switch onChange={(e) => handleToggleChange(!toggleState)}
                        checked={toggleState}
                        width={80}
                        height={40}
                        handleDiameter={42}
                        disabled={(widget.configuration.write_enabled == true) ? false : true} />
                    {widget.configuration.write_enabled == true ? <span className="text-sm mt-4 text-gray1">This toggle widget works as a 2-way switch</span> : null}
                </div>

                {/* Bottom bar for edit and delete buttons */}
                <div className="flex justify-end w-full px-4">
                    <div className="flex">
                        <FaPencilAlt className="text-green text-lg hover:text-gray2 transition duration-300" />
                        <FaTrash className="text-red text-lg ms-5 hover:text-gray2 transition duration-300"
                            onClick={() => { deleteWidget(widget.id) }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardToggleCard;