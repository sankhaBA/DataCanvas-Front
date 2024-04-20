import React, { useState } from "react";
import { FaTools, FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import PopupContainer from "../PopupContainer";
import TextBox from "../input/TextBox";
import SelectBox from "../input/SelectBox";
import PillButton from "../input/PillButton"

const AddGaugeWidgetPopup = ({
  isOpen,
  closeFunction,
  columns,
  devices,
  configuration,
  setConfiguration
}) => {
  const [selectedColumn,setSelectedColumn] = useState(0);
  const [maxValue,setMaxValue] = useState(0);
  const [gaugeType,setGaugeType] = useState(0);
  const [selectedDevice,setSelectedDevice] = useState(-1);

  const saveConfiguration = () =>{

    if(selectedColumn==0 || maxValue.toString().trim() == '' || selectedDevice==-1){
      toast.error("Please fill all the fields");
      return;
    }
    if(selectedDevice==0){
      selectedDevice=null;
    }

    setConfiguration({
      clm_id: selectedColumn,
      max_value: maxValue,
      gauge_type: gaugeType,
      device_id: selectedDevice
    })

    closeFunction;
  }

  return (
    <PopupContainer
      title="Configure Widget - Gauge"
      Icon={FaTools}
      isOpen={isOpen}
      closeFunction={closeFunction}
      onClose={() => { }}
      closeIconVisible={true}
    >
      {/* Content of the popup */}
      <div className="my-3">
        <span className="text-sm">Field Name</span>
        <SelectBox
          value={selectedColumn}
          onChange={(e) => {setSelectedColumn(e.target.value) }}>
          <option value={0}>Select Field</option>
          {columns.map((column) => {
            return (
              <option key={column.clm_id} value={column.clm_id}>
                {column.clm_name}
              </option>
            );
          })}
        </SelectBox>

        <div className="mt-4">
          <span className="text-sm">Maximum Value</span>
          <TextBox type="number" placeholder="Enter maximum value"
            value={maxValue}
            onChange={(e) => {setMaxValue(e.target.value) }} />
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Gauge Type</span>
          <SelectBox value={''}
            onChange={(e) => { }}>
            <option value={0}>Select Gauge Type</option>
            <option value={1}>Radial (Speedometer)</option>
            <option value={2}>Linear (Progress Bar)</option>
          </SelectBox>
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Device</span>
          <SelectBox value={selectedDevice} onChange={(e) => {setSelectedDevice(e.target.value) }}>
            <option value={-1}>Select Device</option>
            <option value={0}>All Devices</option>
            {devices.map((device) => {
              return (
                <option key={device.device_id} value={device.device_id}>
                  {device.device_name}
                </option>
              );
            })}
          </SelectBox>
        </div>

        <hr className="border-gray1 border-opacity-30 my-5" />

        <div className="flex justify-center mt-4">
          <PillButton text="Done" onClick={() => {saveConfiguration }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer >
  );
};

export default AddGaugeWidgetPopup;
