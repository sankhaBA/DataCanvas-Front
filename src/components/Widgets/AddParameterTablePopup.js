import React, { useState, useEffect } from "react";
import { FaTools, FaCheck, FaPlusCircle, FaTrash } from "react-icons/fa";
import PopupContainer from "../PopupContainer";
import ButtonRectangle from "../input/ButtonRectangle";
import TextBox from "../input/TextBox";
import SelectBox from "../input/SelectBox";
import 'react-toastify/dist/ReactToastify.css';
import PillButton from "../input/PillButton";

const AddParameterTablePopup = ({ isOpen, closeFunction }) => {
      const SeriesCard = ({ text, onDelete }) => {
            return (
                  <div className="flex justify-between items-center bg-black3 p-3 rounded-lg text-gray2
              border border-gray1 border-opacity-60">
                        <div className="text-gray2 font-normal text-sm">{text}</div>
                        <FaTrash className="text-red hover:text-gray2 transition-all duration-300 ease-out cursor-pointer" onClick={onDelete} />
                  </div>
            )
      }

      return (
            <PopupContainer
                  isOpen={isOpen}
                  onClose={closeFunction}
                  Icon={FaTools}
                  title="Configure Widget - Weather Data Ratnapura"
                  closeFunction={closeFunction}

                  width="w-[950px]">

                  <div className="flex flex-col text-md text-gray1 my-2">Select fields to display</div>

                  <div class="grid grid-cols-3 gap-3 my-8">

                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">id</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">station</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">temperature</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">humidity</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">rainfall</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">wind speed</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">device</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4" />
                              <label className="text-sm ml-2">timestamp</label>
                        </div>

                  </div>

                  <div className="flex flex-col text-md text-gray1">Select records only if,</div>
                  <div className="w-48 flex flex-row justify-between my-2">
                        <div className="text-sm">Field Name</div>
                        <div className="text-sm">Value</div>
                  </div>
                  <div className="flex flex-row justify-between items-center space-x-2">
                        <div className="w-32">
                              <SelectBox value={0}
                                    onChange={(e) => { }}>
                                    <option value={0}>Field</option>

                              </SelectBox>
                        </div>
                        <div class="my-2">=</div>
                        <div className="w-32">
                              <TextBox placeholder="Value" />
                        </div>
                        <div className="">
                              <PillButton
                                    text="Add Condition"
                                    isPopup={true}
                                    icon={FaPlusCircle}
                              />
                        </div>
                  </div>
                  <div className="flex flex-col mt-4">
                        <SeriesCard text={'device = Elpitiya'} onClick={() => { }} />
                  </div>
                  <div className="flex flex-col items-center justify-center mt-4">
                        <PillButton
                              text="Done"
                              isPopup={true}
                              icon={FaCheck}
                        />
                  </div>


            </PopupContainer>
      );

}



export default AddParameterTablePopup;