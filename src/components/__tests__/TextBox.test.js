import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import TextBox from "./../TextBox";
import "@testing-library/jest-dom";

test('renders TextBox component with default props',() => {
     // Render the TextBox component with default props
    const {getByPlaceholderText} = render(<TextBox/>);
    
    // Expect the input element to be in the document
    const inputElement = getByPlaceholderText('');
    expect(inputElement).toBeInTheDocument();
});
test('renders TextBox component with custom props', () => {
    // Render the TextBox component with custom props
    const { getByPlaceholderText } = render(
      <TextBox
        placeholder="placeholder1"
        maxLength={10}
        textAlign="left"
      />
    );
});



