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
  // ------------- States for storing the widget configuration -------------
  const [fieldName, setFieldName] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [gaugeType, setGaugeType] = useState(0);
  const [device, setDevice] = useState(0);

  // ------------- Function to save the widget configuration -------------
  const saveConfiguration = () => {
    if (fieldName == 0 || maxValue == '' || gaugeType == 0 || device == 0) {
      toast.error('Please fill all the fields');
      return;
    }

    setConfiguration({
      fieldName: fieldName,
      maxValue: maxValue,
      gaugeType: gaugeType,
      device: device
    });
  }

  return (
    <PopupContainer
      title="Configure Widget"
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
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}>
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
            onChange={(e) => setMaxValue(e.target.value)} />
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Gauge Type</span>
          <SelectBox value={gaugeType}
            onChange={(e) => setGaugeType(e.target.value)}>
            <option value={0}>Select Gauge Type</option>
            <option value={1}>Radial (Speedometer)</option>
            <option value={2}>Linear (Progress Bar)</option>
          </SelectBox>
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Device</span>
          <SelectBox value={device} onChange={(e) => setDevice(e.target.value)}>
            <option value={0}>Select Device</option>
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
          <PillButton text="Done" onClick={saveConfiguration} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer >
  );
};

export default AddGaugeWidgetPopup;
