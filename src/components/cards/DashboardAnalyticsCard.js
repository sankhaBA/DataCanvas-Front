import React, { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaExpand, FaColumns } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { MdOutlineFilterAltOff, MdOutlineFilterAlt } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
import SelectBox from "../input/SelectBox";
import TextBox from "../input/TextBox";
import axios from "axios";

const DashboardAnalyticsCard = ({
    widget,
    columns = [],
    deleteWidget = () => { },
    updateWidget = () => { },
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [value, setValue] = useState(widget.latest_value);
    const [timestamp, setTimestamp] = useState(widget.latest_value_timestamp);

    const [filterVisible, setFilterVisible] = useState(false);
    const [filterType, setFilterType] = useState(0); // 0 - Filter by data points, 1 - Filter by time
    const [filterValue, setFilterValue] = useState(500);

    const [timeFilters, setTimeFilters] = useState([
        { id: 0, name: "Last Hour" },
        { id: 1, name: "Last Day" },
        { id: 2, name: "Last Week" },
        { id: 3, name: "Last Month" },
        { id: 4, name: "Last 6 Months" },
    ]);

    useEffect(() => {
        loadValue();
    }, []);

    const loadValue = async () => {
        setRefreshing(true);
        let object = {
            dataset: widget.dataset,
            parameter: columns.find((col) => col.clm_id == widget.parameter).clm_name,
            device: widget.device,
            analyticType: widget.widget_type,
            filterMethod: Number(filterType),
            filterValue: Number(filterValue)
        }

        console.log(object);
        // //Timeout for 3 s
        // setTimeout(() => {
        //     setRefreshing(false);
        //     let val = Math.floor(Math.random() * 1000);
        //     setValue(val);
        //     setTimestamp(new Date().toISOString());
        //     updateLatestValue(val);
        // }, 3000);

        try {
            let response = await axios.post(`${process.env.REACT_APP_ANALYTICS_API_URL}/data/`, object)

            console.log(response);
            if (response.status == 200) {
                setRefreshing(false);
                console.log(response.data);
                setValue(response.data.result);
                setTimestamp(new Date().toISOString());
                //updateLatestValue(response.data.result);
            }
        } catch (err) {
            console.log(err);
            setRefreshing(false);
        }
    }

    const updateLatestValue = (value) => {
        try {
            axios.put(`${process.env.REACT_APP_API_URL}/analytic_widget/value/`, {
                latest_value: value,
                widget_id: widget.id
            }).then((response) => {
                console.log(response);
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            className={
                `w-full sm:w-[340px] h-[250px] bg-black3 rounded-2xl mx-3 my-1 sm:my-5
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
                    {!filterVisible ? (
                        <>
                            <div className="w-full flex justify-center items-center text-5xl text-white font-semibold">
                                {value}
                            </div>
                            <div className="w-full text-center text-gray1 text-sm mt-4">
                                Last Update: {timestamp.replace("T", " ").replace("Z", " ").substring(0, 19)}
                            </div>
                        </>
                    ) : (
                        <>

                            <span className="text-xs">Filter by:</span>
                            <SelectBox
                                value={filterType}
                                onChange={(e) => { setFilterType(e.target.value) }}
                                width="w-40">
                                <option value={0}>Data Points</option>
                                <option value={1}>Time</option>
                            </SelectBox>
                            <span className="text-xs mt-4">Filter value:</span>
                            {filterType == 0 && (
                                <TextBox
                                    value={filterValue}
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        if (val < 0) val = 0;
                                        if (val > 1000) val = 1000;
                                        setFilterValue(val);
                                    }}
                                    width="w-40"
                                    type={'number'}
                                    mt="mt-2"
                                />
                            )}
                            {filterType == 1 && (
                                <SelectBox
                                    value={filterValue}
                                    onChange={(e) => { setFilterValue(e.target.value) }}
                                    width="w-40"
                                    mt="mt-2">
                                    {timeFilters.map((filter) => (
                                        <option key={filter.id} value={filter.id}>{filter.name}</option>
                                    ))}
                                </SelectBox>
                            )}
                        </>
                    )}

                </div>

                {/* Bottom bar for edit and delete buttons */}
                <div className="flex justify-between w-full px-4">

                    <div className="flex justify-start items-center">
                        {refreshing && (
                            <>
                                <ScaleLoader color={"#3ECF8E"} loading={true} width={1} height={25} />
                                <div className="ms-2 text-green font-semibold text-xs">
                                    Refreshing
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-center items-center">
                        {!refreshing && (
                            <IoMdRefreshCircle className="text-green text-2xl hover:text-gray2 transition duration-300"
                                onClick={() => {
                                    loadValue();
                                }} />
                        )}
                        {filterVisible ? (
                            <MdOutlineFilterAlt className="text-green ms-3 text-2xl hover:text-gray2 transition duration-300"
                                onClick={() => { setFilterVisible(false) }} />
                        ) : (
                            <MdOutlineFilterAltOff className="text-green ms-3 text-2xl hover:text-gray2 transition duration-300"
                                onClick={() => { setFilterVisible(true) }} />
                        )}
                        <FaPencilAlt className="text-green ms-5 text-lg hover:text-gray2 transition duration-300"
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