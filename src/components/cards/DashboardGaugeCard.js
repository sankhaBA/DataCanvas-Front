import React, { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt, FaExpand } from "react-icons/fa";
import { LuGauge } from "react-icons/lu";
import GaugeComponent from 'react-gauge-component'
import axios from "axios";

const DashboardGaugeCard = ({
    onClick = () => { },
    widget,
    deleteWidget = () => { },
    updateWidget = () => { }
}) => {
    const [widgetValue, setWidgetValue] = useState(100);
    const [widgetPercentage, setWidgetPercentage] = useState(0);

    useEffect(() => {
        calculatePercentage();
    }, [widgetValue]);

    /*
        * Function to load the data for the gauge widget
        * @param {void}
        * @returns {void}
        * Use the relevant API and load data for this gauge widget
        * Set the value to the widgetValue state
        * Do not need to set the widgetPercentage as it is calculated based on the widgetValue by the calculatePercentage function
    */
    const loadGaugeData = async () => {

    }

    /*
        * Function to calculate the percentage of the value
        * min_value and max_value are taken from the widget object
        * Real value is taken from the widgetValue
        * If the value is less than min_value, the percentage is 0
        * If the value is more than max_value, the percentage is 100
        * Otherwise, the percentage is calculated using the formula:
        * (value - min_value) / (max_value - min_value) * 100 and round it off to 2 decimal places if it have decimals
    */
    const calculatePercentage = (value) => {
        const min_value = widget.configuration.min_value;
        const max_value = widget.configuration.max_value;

        let percentage = 0;
        if (max_value - min_value == 0) {
            percentage = 0;
        } else if (widgetValue < min_value) {
            percentage = 0;
        } else if (widgetValue > max_value) {
            percentage = 100;
        } else {
            percentage = Math.round(((widgetValue - min_value) / (max_value - min_value)) * 100 * 100) / 100;
        }

        console.log("Percentage: ", min_value, max_value, percentage);
        setWidgetPercentage(percentage);
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
                        <FaPencilAlt className="text-green text-lg hover:text-gray2 transition duration-300"
                            onClick={() => { updateWidget(widget) }} />
                        <FaTrash className="text-red text-lg ms-5 hover:text-gray2 transition duration-300"
                            onClick={() => { deleteWidget(widget.id) }} />
                    </div>
                </div>
            </div >
        </div >
    );
}

export default DashboardGaugeCard;