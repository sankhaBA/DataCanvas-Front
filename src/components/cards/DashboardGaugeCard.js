import React, { useState } from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { LuGauge } from "react-icons/lu";
import GaugeComponent from 'react-gauge-component'

const DashboardGaugeCard = ({ onClick = () => { }, widget }) => {
    const [widgetValue, setWidgetValue] = useState(15);
    const [widgetPercentage, setWidgetPercentage] = useState(60);

    /*
        * Function to calculate the percentage of the value
        * min_value and max_value are taken from the widget object
        * Real value is taken from the widgetValue
        * If the value is less than min_value, the percentage is 0
        * If the value is more than max_value, the percentage is 100
        * Otherwise, the percentage is calculated using the formula:
        * (value - min_value) / (max_value - min_value) * 100
    */
    const calculatePercentage = (value) => {

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
                    <LuGauge className="text-xl text-green" />
                    <div className="text-md text-gray2 font-medium max-w-full truncate ms-2">{widget.widget_name}</div>
                </div>

                <div className="w-full flex flex-col justify-center items-center px-10">
                    {widget.configuration.gauge_type == 1 ? (
                        // Speedometer
                        <>
                            <GaugeComponent value={widgetPercentage} />
                            <span className="text-gray1 text-sm font-normal mt-2">Real Value : {widgetValue}</span>
                            {widgetValue < widget.configuration.min_value && <span className="text-red text-xs font-normal mt-2">Value is below minimum</span>}
                            {widgetValue > widget.configuration.max_value && <span className="text-red text-xs font-normal mt-2">Value is above maximum</span>}
                        </>
                    ) : (
                        // Progress Bar
                        <>
                            <span className="text-gray2 text-2xl font-semibold mb-2">{widgetPercentage}%</span>
                            <div className="w-full h-6 bg-gray1 rounded-full">
                                <div className="bg-green h-6 text-xs font-semibold text-black3 text-center p-1.5 leading-none rounded-full" style={{ width: `${widgetPercentage}%` }}> {widgetPercentage}%</div>
                            </div>
                            <span className="text-gray1 text-sm font-normal mt-2">Real Value : {widgetValue}</span>
                            {widgetValue < widget.configuration.min_value && <span className="text-red text-xs font-normal mt-2">Value is below minimum</span>}
                            {widgetValue > widget.configuration.max_value && <span className="text-red text-xs font-normal mt-2">Value is above maximum</span>}
                        </>
                    )}

                </div>

                {/* Bottom bar for edit and delete buttons */}
                <div className="flex justify-end w-full px-4">
                    <div className="flex">
                        <FaPencilAlt className="text-green text-lg hover:text-gray2 transition duration-300" />
                        <FaTrash className="text-red text-lg ms-5 hover:text-gray2 transition duration-300" />
                    </div>
                </div>
            </div >
        </div >
    );
}

export default DashboardGaugeCard;