import React, { useState, useEffect } from "react";
import { FaPlus, FaCheck, FaTrash, FaTools } from "react-icons/fa";
import PopupContainer from "../PopupContainer";
import PillButton from "../PillButton";
import TextBox from "../TextBox";
import SelectBox from "../SelectBox";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddChartWidgetPopup = ({ isOpen, closeFunction, tables = [] }) => {
  const [chartType, setChartTypes] = useState([
    { id: 1, name: "Column Chart" },
    { id: 2, name: "Bar Chart" },
    { id: 3, name: "Pie Chart" },
    { id: 4, name: "Line Chart" },
  ]);

  const [xParameter, setxParameter] = useState([
    //pass parameter
    { id: 1, name: "parameter1" },
    { id: 2, name: "parameter2" },
  ]);

  const [seriesName, setSeriesName] = useState("");
  const [yParameter, setYParameter] = useState("");
  const [combinedValue, setCombinedValue] = useState("");

  // THis card is used to list down series with the delete button
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
      closeFunction={closeFunction}
      onClose={() => { }}
      title={"Configure Widget - <Device>"}
      Icon={FaTools}
      closeIconVisible={true}
      width={"675px"}
    >
      <div className="flex flex-col space-y-5 mt-4">
        <div className="flex justify-between sm:space-x-6">
          <div className="flex-col">
            <label className="text-gray1 font-normal text-sm">
              X-Axis Parameter
            </label>
            <SelectBox value={""} onChange={() => { }}>
              <option value={0}>Parameter</option>
              {xParameter.map((xParameter) => {
                return (
                  <option key={xParameter.id} value={xParameter.id}>
                    {xParameter.name}
                  </option>
                );
              })}
            </SelectBox>
          </div>

          <div className="flex-col">
            <label className="text-gray1 font-normal text-sm">
              Variation Type
            </label>
            <SelectBox value={""} onChange={() => { }}>
              <option value={0}>Select Chart Type</option>
              {chartType.map((chart) => {
                return (
                  <option key={chart.id} value={chart.id}>
                    {chart.name}
                  </option>
                );
              })}
            </SelectBox>
          </div>
        </div>

        {/* ------------------Series------------------- */}
        <hr className="border-gray3 border-opacity-10" />
        <label className="text-gray1 font-normal text-sm  ">Series</label>

        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-gray2 font-normal text-sm">
              Series Name
            </label>
            <TextBox
              placeholder="Enter widget name"
              value={seriesName}
              onChange={(e) => setSeriesName(e.target.value)}
              maxLength={50}
              textAlign={"left"}
            />
          </div>
          <div className="flex flex-col sm:w-60">
            <label className="text-gray2 font-normal text-sm">
              Parameter Column
            </label>
            <SelectBox value={yParameter} onChange={(e) => setYParameter(e.target.value)}>
              <option value={0}>Parameter</option>
              {xParameter.map((xParameter) => {
                return (
                  <option key={xParameter.id} value={xParameter.id}>
                    {xParameter.name}
                  </option>
                );
              })}
            </SelectBox>
          </div>

        </div>
        <div className="flex justify-center">
          <PillButton text="Add Series" onClick={() => setCombinedValue(`${seriesName} ${yParameter}`)} icon={FaPlus} />
        </div>
        <div className="flex flex-col">
          <SeriesCard text={'Series 1 - Temperature'} onClick={() => { }} />
        </div>

        {/* Horizontal Rule */}
        <hr className="border-gray2 border-opacity-10" />

        <div className="flex justify-center mt-4">
          <PillButton text="Done" onClick={() => { }} icon={FaCheck} />
        </div>
      </div>
    </PopupContainer>
  );
};

// default props
AddChartWidgetPopup.defaultProps = {
  isOpen: false,
  closeFunction: () => { },
};

export default AddChartWidgetPopup;
