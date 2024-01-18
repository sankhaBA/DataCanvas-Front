// ScrollableContainer.js

import React from 'react';

function ScrollableContainer({ children }) {

  return (
    <div className="p-4 " >
      <div className="container mx-auto text-gray2" >
        {children}
      </div>
    </div>
  );
}

export default ScrollableContainer;
