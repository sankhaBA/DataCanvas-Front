import React, { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import Switch from "react-switch";
import axios from "axios";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";

const DashboardToggleCard = ({
    onClick = () => { },
    widget,
    deleteWidget = () => { },
    updateWidget = () => { },
    mqttPayload = null
}) => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/data/get/toggle/${widget.id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('auth-token')
                    }
                });

            if (response.status == 200) {
                setLoading(false);
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
            setLoading(false);
        }
    }

    /*
        * Function to update the toggle status
        * @param {boolean} status - The status of the toggle
        * @returns {void}
        * Use the relevant API and update the toggle status
    */
    const updateToggleState = async (status) => {
        setLoading(true);
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/data/feed/update/toggle`,
                {
                    widget_id: widget.id,
                    new_value: status
                }
            );

            if (response.status == 200) {
                setLoading(false);
                toast.success("Toggle updated successfully")
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
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

                {loading ? (
                    <div className={`flex flex-col justify-center items-center mt-5`}>
                        <ScaleLoader color={"#3ECF8E"} loading={true} size={30} />
                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center">
                        <Switch onChange={(e) => {
                            if (widget.configuration.write_enabled == true) {
                                handleToggleChange(e);
                            } else {
                                toast.error("This toggle widget is read-only!");
                            }
                        }}
                            checked={toggleState}
                            width={80}
                            height={40}
                            handleDiameter={42}
                            offColor="#C0392B"
                        // disabled={(widget.configuration.write_enabled == true) ? false : true} 
                        />
                        {widget.configuration.write_enabled == true ? <span className="text-sm mt-4 text-gray1">This toggle widget works as a 2-way switch</span> :
                            <span className="text-sm mt-4 text-gray1">This toggle widget works as a 1-way switch</span>}
                    </div>
                )}

                {/* Bottom bar for edit and delete buttons */}
                <div className="flex justify-end w-full px-4">
                    <div className="flex">
                        <FaPencilAlt className="text-green text-lg hover:text-gray2 transition duration-300"
                            onClick={() => { updateWidget(widget) }} />
                        <FaTrash className="text-red text-lg ms-5 hover:text-gray2 transition duration-300"
                            onClick={() => { deleteWidget(widget.id) }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardToggleCard;