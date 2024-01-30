// Dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
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
    return (
        // Sidebar Layout Component
        <SidebarLayout active={0} addressText={'John Doe > UOM Weather Station > tblsensor_data > Configure'}>
            {/* Devices Section */}
            <div className={`flex flex-row justify-between px-7 sm:px-10 mt-10 sm:mt-3`}>
                <span className={`text-lg`}>Configure Table - {'<table_name>'}</span>
                <div className={``}>
                    <PillButton text="Table Settings" icon={FaPlusCircle} onClick={() => { }} />
                </div>
            </div>

            <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                <ConfigTableCard columnName="id" dataType="Integer" defaultValue="N/A" isAutoIncrement={true} isNullAllowed={false} isUnique={true} onClick={() => { }} />
                <ConfigTableCard columnName="device" dataType="Integer" defaultValue="N/A" isAutoIncrement={false} isNullAllowed={false} isUnique={false} onClick={() => { }} />
                <ConfigTableCard columnName="temperature" dataType="Decimal" defaultValue="-100" isAutoIncrement={false} isNullAllowed={false} isUnique={false} onClick={() => { }} />
                <ConfigTableCard columnName="wind_speed" dataType="Decimal" defaultValue="0" isAutoIncrement={false} isNullAllowed={false} isUnique={true} onClick={() => { }} />
            </div>
        </SidebarLayout>
    )
}

export default ConfigureTable;