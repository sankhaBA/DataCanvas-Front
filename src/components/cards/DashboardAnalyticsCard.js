import React, { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import PillButton from "../input/PillButton";

const DashboardAnalyticsCard = ({
    widget,
    deleteWidget = () => { },
    updateWidget = () => { },
}) => {
    const [refreshing, setRefreshing] = useState(false);
    return (
        <div
            className={
                `w-full sm:w-[400px] h-[300px] bg-black3 rounded-2xl mx-3 my-1 sm:my-5
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green cursor-pointer`
            }
        >
            <div className="w-full h-full pt-4 pl-4 pb-4 flex flex-col justify-between">
                <div className="flex items-center justify-start">
                    {/* Content for the main box (title and icon) */}
                    <DiGoogleAnalytics className="text-xl text-green" />
                    <div className="text-md text-gray2 font-medium max-w-full truncate ms-2">{widget.widget_name}</div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex justify-center items-center text-5xl text-white font-semibold">
                        25.45
                    </div>
                    <div className="w-full text-center text-gray1 text-sm mt-4">
                        Last Update: {widget.latest_value_timestamp.replace("T", " ").replace("Z", " ").substring(0, 19)}
                    </div>
                </div>

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

export default DashboardAnalyticsCard;