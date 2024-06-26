import React from "react";
import ButtonRectangle from "./input/ButtonRectangle";

const CriticalAction = ({ title, subtitle, buttonText, buttonColor, onClick }) => {
    return (
        <div className={
            `w-full my-1 sm:my-2 cursor-pointe px-2
        relative overflow-hidden
        transition duration-300 hover:border-green hover:border-opacity-50 hover:text-green`
        }
            onClick={onClick}>
            <div className="flex flex-col justify-center">
                <div className="w-full h-full flex justify-between items-center">
                    <div className="">
                        <div className="text-md text-gray2 max-w-full truncate">{title}</div>
                        <div className="text-gray1 text-sm font-sm overflow-hidden mt-1">
                            {subtitle}
                        </div>
                    </div>
                    <div className={`w-auto`}>
                        <ButtonRectangle text={buttonText} onClick={() => { }} isPopup={false} color={buttonColor} width={'full'} />
                    </div>
                </div>
                <div className="w-full h-0.5 bg-gray1 bg-opacity-20 mt-1"></div>
            </div>
        </div>
    );
}

// Defailt props
CriticalAction.defaultProps = {
    buttonColor: "red",
    onClick: () => { }
}

export default CriticalAction;