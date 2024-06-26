import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ButtonRectangle from './input/ButtonRectangle';

const Pagination = ({ recordCount, limit, setOffset, offset, loadAllData }) => {
    const [upperBound, setUpperBound] = useState(limit + offset);
    const [lowerBound, setLowerBound] = useState(offset);

    useEffect(() => {
        loadAllData();
    }, [offset]);

    useEffect(() => {
        if (recordCount < (limit + offset)) {
            setUpperBound(recordCount);
        } else {
            setUpperBound(limit + offset);
        }
    }, [recordCount, offset]);

    const handleNext = () => {
        setOffset(upperBound);
        setLowerBound(upperBound);
        if (upperBound + limit > recordCount) {
            setUpperBound(recordCount);
        } else {
            setUpperBound(upperBound + limit);
        }
    }

    const handlePrevious = () => {
        setOffset(lowerBound - limit);
        setUpperBound(lowerBound);
        setLowerBound(lowerBound - limit);
    }

    return (
        <div className="flex items-center justify-between bg-black px-7 sm:px-10 py-3">
            <div className="flex flex-1 justify-between sm:hidden">
                {(lowerBound != 0) ? <ButtonRectangle onClick={handlePrevious} text="Previous" /> : null}
                {(upperBound != recordCount) ? <ButtonRectangle onClick={handleNext} text="Next" /> : null}

            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray1">
                        Showing <span className="font-medium"> {lowerBound} </span>
                        to
                        <span className="font-medium"> {upperBound} </span>
                        of
                        <span className="font-medium"> {recordCount} </span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex space-x-2 rounded-md shadow-sm" aria-label="Pagination">
                        {(lowerBound != 0) ? (
                            <div
                                className="relative w-24 cursor-pointer inline-flex justify-center items-center rounded-md px-2 py-1 text-green ring-1 ring-inset ring-green hover:text-gray2 hover:ring-gray2 transition-all duration-300 ease-in-out focus:z-20 focus:outline-offset-0"
                                onClick={handlePrevious}
                            >
                                <FaAngleLeft className="text-sm me-1" aria-hidden="true" />
                                <span className="text-xs">Previous</span>
                            </div>
                        ) : null}
                        {(upperBound != recordCount) ? (
                            <div
                                className="relative w-24 cursor-pointer inline-flex justify-center items-center rounded-md px-2 py-1 text-green ring-1 ring-inset ring-green hover:text-gray2 hover:ring-gray2 transition-all duration-300 ease-in-out focus:z-20 focus:outline-offset-0"
                                onClick={handleNext}
                            >
                                <span className="text-xs">Next</span>
                                <FaAngleRight className="text-sm ms-1" aria-hidden="true" />
                            </div>
                        ) : null}

                    </nav>
                </div>
            </div>
        </div>
    );
};


export default Pagination;
