import PopupContainer from "./PopupContainer";
import RectangularCard from "./cards/RectangularCard";
import { FaSearch, FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ isOpen, closeFunction, results, keyword, projectID }) => {
    const navigate = useNavigate();

    const handleDeviceClick = (device) => {
        navigate('/devices', { state: { project_id: projectID } });
        closeFunction();
    }

    const handleDataTableClick = (table) => {
        navigate("/configtable", {
            state: { project_id: projectID, tbl_id: table.tbl_id },
        });
        closeFunction();
    }

    const handleWidgetClick = (widget) => {
        navigate('/dashboard', { state: { project_id: projectID } });
        closeFunction();
    }

    return (
        <PopupContainer
            isOpen={isOpen}
            onClose={() => { }}
            closeFunction={closeFunction}
            Icon={FaSearch}
            title={'Search Results for "' + keyword + '"'}
            closeIconVisible={true}
            width={'550px'}>
            {results.devices.length == 0 && results.datatables.length == 0 && results.widgets.length == 0 ? (
                <div className="h-40 flex justify-center items-center pe-4 sm:pe-8 ps-0 sm:ps-2 pb-4">
                    No results found
                </div>
            ) : (
                <div className="h-80 overflow-y-scroll overflow-x-hidden pe-4 sm:pe-8 ps-0 sm:ps-2 pb-4">
                    {results.devices.length != 0 && (
                        <div className="my-4">
                            <div className="text-gray2 text-lsm mb-2">
                                Devices
                            </div>
                            {results.devices.map((device, index) => (
                                <RectangularCard
                                    key={index}
                                    title={device.device_name}
                                    icon={FaAngleRight}
                                    onClick={() => { handleDeviceClick(device) }}
                                />
                            ))}
                        </div>
                    )}

                    {results.datatables.length != 0 && (
                        <div className="my-4">
                            <div className="text-gray2 text-lsm mb-2">
                                Data Tables
                            </div>
                            {results.datatables.map((table, index) => (
                                <RectangularCard
                                    key={index}
                                    title={table.tbl_name}
                                    icon={FaAngleRight}
                                    onClick={() => { handleDataTableClick(table) }}
                                />
                            ))}
                        </div>
                    )}

                    {results.widgets.length != 0 && (
                        <div className="my-4">
                            <div className="text-gray2 text-lsm mb-2">
                                Wdigets
                            </div>
                            {results.widgets.map((widget, index) => (
                                <RectangularCard
                                    key={index}
                                    title={widget.widget_name}
                                    icon={FaAngleRight}
                                    onClick={() => { handleWidgetClick(widget) }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </PopupContainer>
    );
}

export default SearchResults;