import React from "react";

const InsightCard = ({ title, subtitle, icon: Icon, onClick }) => {
    return (
        <div className={
            `w-full sm:w-[300px] h-[120px] sm:h-[140px] bg-black3 rounded-2xl my-1 sm:my-5 py-2 mx-5
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green`
        }
            onClick={onClick}>
            <div className="w-full h-full pl-6 flex flex-col">
                <div className="flex justify-end mr-3 mt-1 ">
                    <Icon className="text-green text-3xl" />
                </div>
                <div className="flex flex-col flex-1 justify-center pb-5">
                    <div className="text-gray2 text-3xl sm:text-4xl font-bold">{title}</div>
                    <div className="text-gray1 text-sm sm:text-lg">{subtitle}</div>
                </div>

            </div>
        </div>
    );
}
export default InsightCard;