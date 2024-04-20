import React from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import PillButton from "../input/PillButton";

const DashboardChartCard = ({ onClick = () => { }, widget }) => {
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
                    <BsBarChartFill className="text-xl text-green" />
                    <div className="text-md text-gray2 font-medium max-w-full truncate ms-2">{widget.widget_name}</div>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <img src={process.env.PUBLIC_URL + '/anim/chart.gif'} alt="chart" className="w-[100px] h-[100px] object-cover mb-3" />
                    <PillButton text="Expand Chart" icon={FaExpand} onClick={onClick} />
                    <span className="text-gray1 mt-2 text-xs">Thumbnnail cannot be displayed</span>
                </div>

                {/* Bottom bar for edit and delete buttons */}
                <div className="flex justify-end w-full px-4">
                    <div className="flex">
                        <FaPencilAlt className="text-green text-lg hover:text-gray2 transition duration-300" />
                        <FaTrash className="text-red text-lg ms-5 hover:text-gray2 transition duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardChartCard;