// TopBackground.js

import React from 'react';

function TopBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black">
      <div className="h-1/2 relative bg-black3 rounded-b-3xl">
        <div
          className="absolute inset-0 bg-black3 rounded-b-3xl"
        />
        <img
          src={process.env.PUBLIC_URL + '/img/projects_back_gray.png'}
          alt="Background"
          className="w-full h-full object-cover blur-sm rounded-b-3xl opacity-20"
        />
      </div>
    </div>
  );
}

export default TopBackground;
