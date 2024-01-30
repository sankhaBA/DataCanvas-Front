import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ConfigTableCard = ({ columnName, dataType, defaultValue, isAutoIncrement, isNullAllowed, isUnique, onClick }) => {
    return (
        <div className={
            `w-full bg-black3 rounded-lg my-1 sm:my-1 cursor-pointer text-gray2
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green hover:border-opacity-50 hover:text-green`
        }
            onClick={onClick}>
            <div className="w-full h-full py-2 pl-6 pr-4 flex flex-row justify-between items-center ">

                <div className={`flex flex-row justify-start items-center space-x-20`}>

                    {/* Field Name Section */}
                    <div className="text-md w-32 truncate text-gray2 max-w-full truncate mr-3 ">
                        <div className="flex flex-col justify-between items-start">
                            <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                Field Name
                            </div>
                            <div className="text-gray2 text-sm">
                                {columnName}
                            </div>
                        </div>
                    </div>

                    {/* Data Type Section */}
                    <div className="text-md text-gray2 max-w-full truncate mr-3 ">
                        <div className="flex flex-col justify-between items-start">
                            <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                Data Type
                            </div>
                            <div className="text-gray2 text-sm">
                                {dataType}
                            </div>
                        </div>
                    </div>

                    {/* Default Value Section */}
                    <div className="text-md text-gray2 max-w-full truncate mr-3 ">
                        <div className="flex flex-col justify-between items-start">
                            <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                Default Value
                            </div>
                            <div className="text-gray2 text-sm">
                                {defaultValue}
                            </div>
                        </div>
                    </div>

                    {/* Auto Increment Section - In second row, there should be a checkbox with the caption Auto Increment */}
                    {isAutoIncrement && (
                        <div className="text-md text-gray2 max-w-full truncate mr-3 ">
                            <div className="flex flex-col justify-between items-start">
                                <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                    Auto Increment
                                </div>
                                <div className={`flex items-center`}>
                                    <input
                                        type="checkbox"
                                        checked={isAutoIncrement}
                                        onChange={() => { }}
                                        disabled
                                        className="h-4 w-4"
                                    />
                                    <span className="text-gray2 ml-2 text-sm">Auto Increment</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Null Allowed Section - In second row, there should be a checkbox with the caption Null Allowed */}
                    {isNullAllowed && (
                        <div className="text-md text-gray2 max-w-full truncate mr-3 ">
                            <div className="flex flex-col justify-between items-start">
                                <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                    Null Allowed
                                </div>
                                <div className={`flex items-center`}>
                                    <input
                                        type="checkbox"
                                        checked={isNullAllowed}
                                        onChange={() => { }}
                                        disabled
                                        className="h-4 w-4"
                                    />
                                    <span className="text-gray2 ml-2 text-sm">Null Allowed</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Unique Section - In second row, there should be a checkbox with the caption Unique */}
                    {isUnique && (
                        <div className="text-md text-gray2 max-w-full truncate mr-3 ">
                            <div className="flex flex-col justify-between items-start">
                                <div className="text-gray1 text-xs font-sm overflow-hidden hidden sm:block">
                                    Unique
                                </div>
                                <div className={`flex items-center`}>
                                    <input
                                        type="checkbox"
                                        checked={isUnique}
                                        onChange={() => { }}
                                        disabled
                                        className="h-4 w-4"
                                    />
                                    <span className="text-gray2 ml-2 text-sm">Unique</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`flex flex-row justify-start items-center space-x-12`}>
                    {/* Edit Section */}
                    <div className={`flex flex-row justify-between items-center space-x-2 cursor-pointer text-green  transition-all duration-300 hover:text-gray2`}>
                        <FaPencilAlt className="text-sm" />
                        <span className="text-xs">Edit</span>
                    </div>

                    {/* Delete Section */}
                    <div className={`flex flex-row justify-between items-center space-x-2 cursor-pointer text-red  transition-all duration-300 hover:text-gray2`}>
                        <FaTrash className="text-sm" />
                        <span className="text-xs">Delete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigTableCard;