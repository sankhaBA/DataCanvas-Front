import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Spinner from './../Spinner';


test('renders Spinner component when visible', async () => {
   
    const isVisible = true;
      
    await act(async () => {
      render(<Spinner isVisible={isVisible} />);
      
    });
  
    // Assert
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
  
  test('does not render Spinner component when not visible', async () => {
    
    const isVisible = false;
    
    await act(async () => {
      render(<Spinner isVisible={isVisible} />);
      
    });
  
    // Assert
    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).not.toBeInTheDocument();
  });
