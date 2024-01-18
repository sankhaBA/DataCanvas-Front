import React from "react";

const ProjectCard = ({ title, subtitle, footer, onClick }) => {
  return (
    <div
      className={
        `w-full sm:w-[300px] h-[200px] bg-black3 rounded-3xl my-1 sm:my-5
        border border-gray1 border-opacity-60 relative overflow-hidden
        transition duration-300 hover:border-green`
      }
      onClick={onClick}
    >
      <div className="w-full h-full pt-4 pl-6 flex flex-col">
        {/* Content for the main box (title) */}
        <div className="text-lg text-gray2 font-medium mb-1 max-w-full truncate mr-3">{title}</div>

        {/* Content for the subtitle */}
        <div className="text-gray2 text-opacity-60 text-sm font-light mb-2 max-h-[50px] overflow-hidden mr-3" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>
          {subtitle}
        </div>

        {/* Content for the footer */}
        <div className="text-neutral-600 text-xs font-semibold absolute bottom-4 left-6 w-full">{footer}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
