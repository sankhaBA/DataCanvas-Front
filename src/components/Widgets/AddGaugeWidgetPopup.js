import React, { useState } from "react";
import { FaTools, FaCheck } from "react-icons/fa";
import PopupContainer from "../PopupContainer";
import TextBox from "../input/TextBox";
import SelectBox from "../input/SelectBox";
import PillButton from "../input/PillButton"

const AddGaugeWidgetPopup = ({
  isOpen,
  closeFunction,
  columns
}) => {

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

        <SelectBox label="Select" options={["Temperature", "Option 2"]} />
        <div style={{ paddingBottom: "15px" }}></div>

        <span className="text-sm">Maximum Value</span>
        <TextBox type="number" placeholder="Enter maximum value" />
        <div style={{ paddingBottom: "30px" }}></div>

        <div className="flex justify-center space-x-4">
          <PillButton text="Done" onClick={() => { }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer>
  );
};

export default AddGaugeWidgetPopup;
