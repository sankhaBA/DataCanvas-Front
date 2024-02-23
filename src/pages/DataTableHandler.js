// Dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages for navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Components
import SidebarLayout from "../components/SidebarLayout";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";
import PopupContainer from "../components/PopupContainer";
   

const DataTableHandler = ()=> {

    // ---------- Get states from navigation location for retrieval of project_id ----------
    const { state } = useLocation();

    // ---------- Navigation hooks ----------
    const navigate = useNavigate()

    // ---------- Loading state for spinner ----------
    const [loading, setLoading] = useState(false); 

    // ---------- Table name for new addings ------
    const [newTableName, setNewTableName] = useState('');
    const [newTableNameDescription, setNewTableNameDescription] = useState('');

    //--Add Data table Modal--
    const [isAddDatatableOpen, setIsAddDatatableOpen] = useState(false);

    const toggleAddDatatableModal = () => {
        setIsAddDatatableOpen(!isAddDatatableOpen);
    };

    const [isDatatableAddingDoneOpen, setisDatatableAddingDoneOpen] = useState(false);

    const toggleDatatableAddingDoneModal = () => {
        if (isDatatableAddingDoneOpen) {
        loadDataTables();
        }
        setisDatatableAddingDoneOpen(!isDatatableAddingDoneOpen);
    };

    // ---------- Data Table states ----------
    const [dataTables, setDataTables] = useState([{
        data_table_id: 1,
        name: 'sensor-readings-table',
        createdAt: '2021-08-01, 00:00:00',
        updatedAt: '2021-08-01, 00:00:00',
        }, {
            data_table_id: 2,
            name: 'error-log',
            createdAt: '2021-08-01, 00:00:00',
            updatedAt: '2021-08-01, 00:00:00',
    }]);
    const [projectID, setProjectID] = useState(1);


    useEffect(() => {

        // ---------- Getting project_id from the location state and uypdating projectID state ----------
        try {
            setProjectID(state.project_id);
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }, []);


    useEffect(() => {
        console.log('Data Tables', dataTables);
        loadDataTables();
        }, [projectID]);
  


  // ---------- Create new table ----------      
    const handleTableAdding = async () => {
    
    if( newTableName === '' || newTableNameDescription === ''){ 
        toast.error('Please fill in all fields!');
        return;
    }
    // Post request to localhost:3001/api/data/tbl?project_id=<project_id> to post new data table
    try {
        const response = await axios.post('http://localhost:3001/api/data/tbl', {
            project_id: projectID,
            tbl_name: newTableName
        }, 
        {
            headers: {
                'authorization': localStorage.getItem('auth-token')
            }
        });

        if (response.status === 201) {
            console.log(response.data);
            toggleDatatableAddingDoneModal();
        }

    } catch (err) {
        switch (err.status) {
            case 400:
                toast.error('Bad request!');
                break;
            case 401:
                toast.error('Unauthorized access!');
                break;
            case 403:
                toast.error('Unauthorized access!');
                break;
            case 404:
                toast.error('Project not found!');
                break;
            default:
                toast.error('Something went wrong!');
                break;
        
        }
    }
    }



  // ---------- Load data tables from the backend ----------
  const loadDataTables = async () => {
    setLoading(true);
    // Get request to localhost:3001/api/data/tbl?project_id=<project_id> to get data tables
    try {
        const response = await axios.get(`http://localhost:3001/api/data/tbl?project_id=${projectID}`, {
            headers: {
                'authorization': localStorage.getItem('auth-token')
            }
        });

        if (response.status === 200) {
            console.log(response.data);

            let dataTablesArray = [];
            response.data.forEach((dataTable) => {
                
                const date = new Date(dataTable.updatedAt);
                const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' };
                const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

                let tableDetails = {
                    data_table_id: dataTable.tbl_id,
                    name: dataTable.tbl_name,
                    updatedAt: formattedDate,
                }
                dataTablesArray.push(tableDetails);
            });
            setDataTables(dataTablesArray);
            setLoading(false);
        }

    } catch (err) {
        switch (err.status) {
            case 400:
                toast.error('Bad request!');
                break;
            case 401:
                toast.error('Unauthorized access!');
                break;
            case 403:
                toast.error('Unauthorized access!');
                break;
            case 404:
                toast.error('Project not found!');
                break;
            default:
                toast.error('Something went wrong!');
                break;
        }
        setDataTables([]);
        setLoading(false);
    }
}



  return (
    <SidebarLayout active={0} addressText={'John Doe > UOM Weather Station > Data Table Handler'}>
    <div className={`flex flex-row justify-between px-7 sm:px-10 mt-12 sm:mt-10`}>
                    <span className={`text-lg`}>Data Tables</span>
                    {dataTables.length > 0 ? (
                        <div className={``}>
                            <PillButton text="Add Data Table" icon={FaPlusCircle} onClick={() => { }} />
                        </div>
                    ) : null}
    </div>
    
    <div className={`flex flex-col justify-center px-7 sm:px-10 mt-2`}>
                    {dataTables.length > 0 ? (
                        dataTables.map((table) => {
                            return (
                                <RectangularCard key={table.data_table_id} title={table.name} subtitle={`Last Update: ${table.updatedAt}`} icon={FaAngleRight} />
                            );
                        })
                    ) : (
                        <div className={`flex flex-row justify-center items-center mt-4`}>
                            <PillButton text="Add Your First Table" icon={FaPlusCircle} onClick={() => {toggleAddDatatableModal()}} />
                        </div>
                    )}
    </div>

    {dataTables.length > 0 ? (
                    <div className={`flex flex-row justify-center items-center mt-4`}>
                        <PillButton text="View All" icon={FaForward} onClick={() => { toggleAddDatatableModal()}} />
                    </div>
                ) : null}

    


    <ToastContainer
        position="bottom-center"
        closeFunction={toggleDatatableAddingDoneModal}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />


    <PopupContainer
            isOpen={isAddDatatableOpen}
            onClose={() => { }}
            closeFunction={toggleAddDatatableModal}
            Icon={FaPlusCircle}
            title={"Add New Table"}
            closeIconVisible={true}
        >
            <div className="flex flex-col justify-center mt-4">
              <label className="text-gray1 text-sm">Table Name</label>
              <TextBox
                text=""
                type="text"
                placeholder="Enter table name"
                maxLength={50}
                textAlign={"left"}
                onChange={(e)=>{setNewTableName(e.target.value)}}
                value={""}
              />
            </div>

            <div className="flex flex-col justify-center mt-4">
              <label className="text-gray1 text-sm">Table Description</label>
              <TextBox
                text=""
                type="text"
                placeholder="Enter table description"
                maxLength={50}
                textAlign={"left"}
                onChange={(e)=>{setNewTableNameDescription(e.target.value)}}
                value={""}
              />
            </div>

            <div className="flex justify-center mt-8">
                <PillButton
                text="Add Table"
                onClick={handleTableAdding}
                isPopup={true}
                icon={FaPlusCircle}
            />
            </div>
            
            
    </PopupContainer>


</SidebarLayout>
  )
}

export default DataTableHandler





 