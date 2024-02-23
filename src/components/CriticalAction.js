import React from "react";
import ButtonRectangle from "./ButtonRectangle";

const CriticalAction = ({ title, subtitle, buttonText, onClick }) => {
    return (
        <div className={
            `w-full my-1 sm:my-2 cursor-pointe px-2
        relative overflow-hidden
        transition duration-300 hover:border-green hover:border-opacity-50 hover:text-green`
        }
            onClick={onClick}>
            {/* Single row should be there. In left side, title and subtitle should be there one after the other vertically. In right side section, there is a button */}

            {/* Content for the title and subtitle */}
            <div className="flex flex-col justify-center">
                <div className="text-md text-gray2 max-w-full truncate">{title}</div>
                <div className="w-full h-full flex justify-between">
                    <div className="text-gray1 text-sm font-sm overflow-hidden mt-1">
                        {subtitle}
                    </div>
                    <ButtonRectangle text={buttonText} onClick={() => { }} isPopup={false} color='red' />
                </div>
                {/* Horizontal Rule */}
                <div className="w-full h-0.5 bg-gray3 bg-opacity-80 mt-2"></div>
            </div>
            {/* Button */}


        </div>
    );
}

export default CriticalAction;