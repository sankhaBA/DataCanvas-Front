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
          value={''}
          onChange={(e) => { }}>
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
            value={''}
            onChange={(e) => { }} />
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
          <SelectBox value={''} onChange={(e) => { }}>
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
          <PillButton text="Done" onClick={() => { }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer >
  );
};

export default AddGaugeWidgetPopup;
