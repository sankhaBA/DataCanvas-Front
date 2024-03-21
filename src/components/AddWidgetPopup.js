import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PopupContainer from "./PopupContainer";
import PillButton from "./PillButton";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const AddWidgetPopup = ({ isOpen, closeFunction, tables = [] }) => {
    const [widgetTypes, setWidgetTypes] = useState([
        { id: 1, name: 'Chart (Any)' },
        { id: 2, name: 'Table' },
        { id: 3, name: 'Toggle Switch' },
        { id: 4, name: 'Gauge' }
    ]);

    return (
        <PopupContainer
            isOpen={isOpen}
            closeFunction={closeFunction}
            onClose={() => { }}
            title={'Add New Widget'}
            Icon={FaPlus}
            closeIconVisible={true}>
            <div className="flex flex-col space-y-5 mt-4">
                <div className="flex flex-col">
                    <label className="text-gray2 font-normal text-sm">Widget Name</label>
                    <TextBox
                        placeholder="Enter widget name"
                        value={''}
                        onChange={() => { }}
                        maxLength={50}
                        textAlign={'left'} />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray2 font-normal text-sm">Widget Type</label>
                    <SelectBox value={''} onChange={() => { }}>
                        <option value={0}>Select Widget Type</option>
                        {widgetTypes.map((widgetType) => {
                            return (
                                <option key={widgetType.id} value={widgetType.id}>{widgetType.name}</option>
                            )
                        })}
                    </SelectBox>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray2 font-normal text-sm">Dataset</label>
                    <SelectBox value={''} onChange={() => { }}>
                        <option value={0}>Select Dataset</option>
                        {tables.map((table) => {
                            return (
                                <option key={table.id} value={table.id}>{table.name}</option>
                            )
                        })}
                    </SelectBox>
                </div>

                {/* Horizontal Rule */}
                <hr className="border-gray2 border-opacity-10" />

                <div className="flex justify-center mt-4">
                    <PillButton text="Add Widget" onClick={() => { }} icon={FaPlus} />
                </div>

            </div>
        </PopupContainer>
    )
}

// default props
AddWidgetPopup.defaultProps = {
    isOpen: false,
    closeFunction: () => { }
}

export default AddWidgetPopup;