import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PopupContainer from "../PopupContainer";
import PillButton from "../input/PillButton";
import TextBox from "../input/TextBox";
import SelectBox from "../input/SelectBox";
import 'react-toastify/dist/ReactToastify.css';

const AddWidgetPopup = ({
    isOpen,
    closeFunction,
    tables = [],
    widgetName, setWidgetName,
    widgetType, setWidgetType,
    dataset, setDataset,
    nextFunction
}) => {
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
                        value={widgetName}
                        onChange={(e) => { setWidgetName(e.target.value) }}
                        maxLength={50}
                        textAlign={'left'} />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray2 font-normal text-sm">Widget Type</label>
                    <SelectBox value={widgetType} onChange={(e) => { setWidgetType(e.target.value) }}>
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
                    <SelectBox value={dataset} onChange={(e) => { setDataset(e.target.value) }}>
                        <option value={0}>Select Dataset</option>
                        {tables.map((table) => {
                            return (
                                <option key={table.tbl_id} value={table.tbl_id}>{table.tbl_name}</option>
                            )
                        })}
                    </SelectBox>
                </div>

                {/* Horizontal Rule */}
                <hr className="border-gray2 border-opacity-10" />

                <div className="flex justify-center mt-4">
                    <PillButton text="Add Widget" onClick={() => { nextFunction() }} icon={FaPlus} />
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