import React, { } from "react";
import { FaTools, FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import PopupContainer from "../PopupContainer";
import SelectBox from "../input/SelectBox";
import PillButton from "../input/PillButton"

const AddToggleWidgetPopup = ({
  isOpen,
  closeFunction,
  columns,
  devices,
  configuration,
  setConfiguration,
}) => {
  return (
    <PopupContainer
      title="Configure Widget - Toggle Switch"
      Icon={FaTools}
      isOpen={isOpen}
      onClose={() => { }}
      closeFunction={closeFunction}
      closeIconVisible={true}
    >
      {/* Content of the popup */}
      <div className="my-3">
        <div className="mt-4">
          <span className="text-sm">Field Name</span>
          <SelectBox value={''} onChange={(e) => { }}>
            <option value={0}>Select Field</option>
          </SelectBox>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" className="w-4 h-4"
            checked={''}
            onChange={() => { }} />
          <label className="text-gray2 text-sm">Work as an input button</label>
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Device</span>
          <SelectBox value={''} onChange={(e) => { }}>
            <option value={0}>Select Device</option>

          </SelectBox>
        </div>

        <hr className="border-gray1 border-opacity-30 my-5" />

        <div className="flex justify-center space-x-4">
          <PillButton text="Done" onClick={() => { }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer>
  );
};

export default AddToggleWidgetPopup;
