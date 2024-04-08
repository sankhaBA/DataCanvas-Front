import React, { useState } from "react";
import { toast } from 'react-toastify';
import AddWidgetPopup from "./AddWidgetPopup";
import AddChartWidgetPopup from "./AddChartWidgetPopup";
import AddParameterTablePopup from "./AddParameterTablePopup";
import AddToggleWidgetPopup from "./AddToggleWidgetPopup";
import AddGaugeWidgetPopup from "./AddGaugeWidgetPopup";
import axios from "axios";

const AddWidgetContainer = ({
    isOpen,
    closeFunction,
    tables = [],
    setLoading,
    devices
}) => {
    /*
        * State to manage the visibility of various popups
        * 1: Add Widget Popup
        * 2: Add Chart Widget Popup
        * 3: Add Parameter Table Popup
        * 4: Add Toggle Widget Popup
        * 5: Add Gauge Widget Popup
    */
    const [visiblePopup, setVisiblePopup] = useState(1);
    const togglePopup = async () => {
        if (widgetType == 0 || dataset == 0 || widgetName.trim == '') {
            toast.error('Please fill all the fields');
            return;
        }

        let columnLoadingResult = await loadColumns(dataset);
        if (!columnLoadingResult) {
            closePopup();
            return;
        }

        setVisiblePopup(Number(widgetType) + 1);
    }
    /*
        * Function to close the popup
        * This function will; unmount component and reset all states to default
    */
    const closePopup = () => {
        setVisiblePopup(1);
        setWidgetName('');
        setWidgetType(0);
        setDataset(0);
        closeFunction();
    }

    // ---------- States for widget name, widget type and dataset ----------
    const [widgetName, setWidgetName] = useState('');
    const [widgetType, setWidgetType] = useState(0);
    const [dataset, setDataset] = useState(0);

    // ---------- State to store configuration of the selected widget after configuring ----------
    const [configuration, setConfiguration] = useState({});

    // ---------- State to store columns of the selected dataset ----------
    const [columns, setColumns] = useState([]);

    const loadColumns = (tbl_id) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            const token = localStorage.getItem('auth-token');
            axios.get(`http://localhost:3001/api/data/clm?tbl_id=` + tbl_id, {
                headers: {
                    'authorization': token
                }
            })
                .then(res => {
                    res.data.sort((a, b) => (a.clm_id > b.clm_id) ? 1 : -1);
                    setColumns(res.data);
                    setLoading(false);
                    resolve(true);
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                    switch (err.response.status) {
                        case 401 || 403:
                            toast.error('Unauthorized access! Please login again');
                            break;
                        default:
                            console.log('Error in getting table column details');
                            toast.error('Error in getting table column details');
                            break;
                    }
                    reject(false);
                });
        });
    }

    return (
        <>
            {visiblePopup == 1 ? (
                <AddWidgetPopup
                    isOpen={isOpen}
                    closeFunction={closePopup}
                    tables={tables}
                    widgetName={widgetName}
                    setWidgetName={setWidgetName}
                    widgetType={widgetType}
                    setWidgetType={setWidgetType}
                    dataset={dataset}
                    setDataset={setDataset}
                    nextFunction={togglePopup}
                />
            ) : (visiblePopup == 2 ? (
                <AddChartWidgetPopup
                    isOpen={isOpen}
                    closeFunction={closePopup}
                    columns={columns}
                    devices={devices}
                    configuration={configuration}
                    setConfiguration={setConfiguration}
                />
            ) : (visiblePopup == 3 ? (
                <AddParameterTablePopup
                    isOpen={isOpen}
                    closeFunction={closePopup}
                    columns={columns}
                    devices={devices}
                    configuration={configuration}
                    setConfiguration={setConfiguration}
                />
            ) : (visiblePopup == 4 ? (
                <AddToggleWidgetPopup
                    isOpen={isOpen}
                    closeFunction={closePopup}
                    columns={columns}
                    devices={devices}
                    configuration={configuration}
                    setConfiguration={setConfiguration}
                />
            ) : (visiblePopup == 5 ? (
                <AddGaugeWidgetPopup
                    isOpen={isOpen}
                    closeFunction={closePopup}
                    columns={columns}
                    devices={devices}
                    configuration={configuration}
                    setConfiguration={setConfiguration}
                />
            ) : null)))
            )}
        </>
    )
}

// default props
AddWidgetContainer.defaultProps = {
    isOpen: false,
    closeFunction: () => { }
}

export default AddWidgetContainer;