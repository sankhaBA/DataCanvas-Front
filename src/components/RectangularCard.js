import React from "react";

const RectangularRowCard = ({ title, subtitle, icon, onClick }) => {
    return (
        <div className={
            `w-full sm: h-[50px] bg-black3 rounded-2xl my-1 mt-1 sm:my-5
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green`
        }
        onClick={onClick}>
            <div className="w-full h-full pt-2 pl-6 flex flex-col justify-between">

                {/* Content for the title and subtitle */}
                <div className="flex justify-between items-center">
                    <div className="text-2xl text-white font-medium max-w-full truncate mr-3 ">{title}</div>
                    <div className="pr-10 text-gray2 text-opacity-50 text-sm font-sm max-h-[50px] overflow-hidden mr-3 " style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>
                        {subtitle}
                    </div>
                    <div className="absolute right-3 text-lg text-gray2 font-medium max-w-full truncate mr-3">{icon}</div>
                </div>


            </div>
        </div>
    );
}

export default RectangularRowCard;