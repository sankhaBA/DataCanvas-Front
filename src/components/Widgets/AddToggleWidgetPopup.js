import React, { useState} from "react";
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
  const [selectedColumn,setSelectedColumn] = useState(0);
  const [selectedDevice,setSelectedDevice] = useState(-1);
  const [writeEnabled,setWriteEnabled] = useState(false);
  const saveConfiguration = () =>{
    if(selectedColumn==0 || selectedDevice==-1){
      toast.error("Please fill all the fields");
      return;
    }
    if(selectedDevice==0){
      selectedDevice=null;
    }

    
    setConfiguration({
      clm_id: selectedColumn,
      write_enabled: writeEnabled,
      device_id: selectedDevice  
    })

    closeFunction;
  }

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
          <SelectBox value={''} onChange={(e) => {setSelectedColumn(e.target.value) }}>
            <option value={0}>Select Field</option>
          </SelectBox>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" className="w-4 h-4"
            checked={''}
            onChange={(e) => { setWriteEnabled(e.target.value)}} />
          <label className="text-gray2 text-sm">Work as an input button</label>
        </div>

        <div className="mt-4">
          <span className="text-sm mt-4">Device</span>
          <SelectBox value={''} onChange={(e) => { setSelectedDevice(e.target.value)}}>
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

        <div className="flex justify-center space-x-4">
          <PillButton text="Done" onClick={() => {saveConfiguration }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer>
  );
};

export default AddToggleWidgetPopup;
