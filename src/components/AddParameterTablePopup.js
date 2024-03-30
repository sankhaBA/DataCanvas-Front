import React, { useState, useEffect } from "react";
import { FaTools, FaCheck, FaWindowClose, FaAngleDown,FaPlusCircle } from "react-icons/fa";
import PopupContainer from "./PopupContainer";
import ButtonRectangle from "./ButtonRectangle";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import PillButton from "./PillButton";
import RectangularRowCard from "./RectangularCard";

const AddParameterTablePopup = ({ isOpen, closeFunction, setLoading }) => {


      return (
            <PopupContainer
                  isOpen={isOpen}
                  onClose={closeFunction}
                  Icon={FaTools}
                  title="Configure Widget - Weather Data Ratnapura"
                  closeFunction={closeFunction}
                  
                  width="w-[900px]">

                  <div className="flex flex-col text-md text-gray1 my-2">Select fields to display</div>

                  <div class="grid grid-cols-3 gap-3 my-8">

                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">id</label>
                         </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                               <label className="text-sm ml-2">station</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">temperature</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">humidity</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">rainfall</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">wind speed</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">device</label>
                        </div>
                        <div className="w-2/3 flex">
                              <input type="checkbox" className="w-4 h-4"/>
                              <label className="text-sm ml-2">timestamp</label>
                        </div>
                        
                  </div>

                  <div className="flex flex-col text-md text-gray1">Select records only if,</div>
                  <div className="w-48 flex flex-row justify-between my-2">
                        <div className="text-sm">Field Name</div>
                        <div className="text-sm">Value</div>
                  </div>
                  <div className="flex flex-row my-2"> 
                        <div className="flex flex-col items-center justify-center">
                              <PillButton text="Field" isPopup={true} icon={FaAngleDown}/> 
                        </div>
                        <div>=</div>   
                        <div className="flex items-center justify-between">
                              <ButtonRectangle text="Rathnapura" onClick={() => { }}/>  
                        </div>
                        <div className="flex">
                        <PillButton
                              text="Add Condition"
                              isPopup={true}
                              icon={FaPlusCircle}
                        />
                  </div>

                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                        <RectangularRowCard
                              title="station = UOM ITFac station"
                              icon={FaWindowClose}
                        />
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