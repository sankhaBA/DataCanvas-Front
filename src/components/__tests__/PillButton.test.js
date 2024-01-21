import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PillButton from './../PillButton';
import "@testing-library/jest-dom";

test('renders pill button component with default props',()=>{
    const onClickMock = jest.fn();

    const {getByText} = render(<PillButton text="Click me" onClick={onClickMock}/>);

    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-black3');
}
);
test('calls onClick prop when button is clicked', () => {
    // Arrange
    const onClickMock = jest.fn();
    const { getByText } = render(<PillButton text="Click me" onClick={onClickMock} />);
  
    // Act
    fireEvent.click(getByText('Click me'));
  
    // Assert
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });