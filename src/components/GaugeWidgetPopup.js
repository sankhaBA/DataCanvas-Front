import React, { useState } from "react";
import { FaTools, FaUikit } from "react-icons/fa";
import PopupContainer from "./PopupContainer";
import ButtonRectangle from "./ButtonRectangle";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import PillButton from "./PillButton"

const GaugeWidgetPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* PopupContainer is rendered conditionally based on the state of isPopupOpen */}
      {isPopupOpen && (
        <PopupContainer
          title="Configure Widget"
          Icon={FaTools}
          isOpen={isPopupOpen} 
          onClose={closePopup} 
          closeIconVisible={true}
        >
          {/* Content of the popup */}
          <div className="my-3">
            <span className="text-sm">Field Name</span>
            
          <SelectBox label="Select" options={["Temperature", "Option 2"]}  />
          <div style={{ paddingBottom: "15px" }}></div>
          <div className="flex items-center space-x-2">

            <input type="checkbox" className="w-4 h-4"
                    
                    onChange={()=> {}} />
            <label className="text-gray2 text-sm">Work as an input button</label>
          </div>
          <div style={{ paddingBottom: "30px" }}></div>

          <div className="flex justify-center space-x-4">
          <ButtonRectangle text="Done" Icon="Fatick" onClick={closePopup}/>
          </div>
          </div>
        </PopupContainer>
      )}
    </div>
  );
};

export default GaugeWidgetPopup;
