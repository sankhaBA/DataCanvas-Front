// Dependencies
import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaCheck, FaKey } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages for navigation
import { useNavigate, useLocation } from "react-router-dom";

// Components
import SidebarLayout from "../components/SidebarLayout";
import SquareCard from "../components/SquareCard";
import Spinner from "../components/Spinner";
import TextBox from "../components/TextBox";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import axios from "axios";
import PopupContainer from "../components/PopupContainer";

const Device = () => {
  //------ Navigations -------
  const navigate = useNavigate();

  //-------- States ---------
  const [loading, setLoading] = useState(false);

  //--Add Device Modal--
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const toggleAddDeviceModal = () => {
    setIsAddDeviceOpen(!isAddDeviceOpen);
  };

  const [isDeviceAddingDoneOpen, setIsDeviceAddingDoneOpen] = useState(false);

  const toggleDeviceAddingDoneModal = () => {
    if (isDeviceAddingDoneOpen) {
      getAllDevices();
    }
    setIsDeviceAddingDoneOpen(!isDeviceAddingDoneOpen);
  };

  //--Device Update Modal--
  const [isDeviceUpdateOpen, setIsDeviceUpdateOpen] = useState(false);

  const toggleDeviceUpdateModal = () => {
    setIsDeviceUpdateOpen(!isDeviceUpdateOpen);
  };

  //----Device States----
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState(""); // For text box of Add Device
  const [newDeviceDescription, setNewDeviceDescription] = useState(""); // For text box of Add Device

  //--Get states from navigation location for retrieval of project_id--
  const { state } = useLocation();

  const [projectID, setProjectID] = useState(-1);

  useEffect(() => {
    try {
      console.log("Device-state", state.project_id);
      setProjectID(state.project_id);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (projectID !== -1) {
      getAllDevices();
    }
  }, [projectID]);

  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const handleDeviceSelection = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  //--Get device Fingerprint
  const [fingerprint, setFingerprint] = useState("");

  const handleDeviceNameChange = (name) => {
    setNewDeviceName(name.target.value);
  };

  const handleDeviceDescriptionChange = (discription) => {
    setNewDeviceDescription(discription.target.value);
  };

  //--Api call for adding device--
  const handleDeviceAdding = async () => {
    if (newDeviceName === "" || newDeviceDescription === "") {
      toast.error("Device name and description cannot be empty!");
      return;
    }

    setLoading(true);

    // post request to localhost:3001/api/device
    try {
      const response = await axios.post(
        "http://localhost:3001/api/device",
        {
          device_name: newDeviceName,
          description: newDeviceDescription,
          project_id: projectID,
        },
        {
          headers: {
            authorization: localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.status === 200) {
        setFingerprint(response.data.fingerprint);
        console.log(response.data);
        setDevices([...devices, response.data]);
        toggleAddDeviceModal();
        toggleDeviceAddingDoneModal();
      }
    } catch (err) {
      switch (err.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 401:
          toast.error("Unauthorized access!");
          break;
        case 403:
          toast.error("Unauthorized access!");
          break;
        case 404:
          toast.error("Project not found!");
          break;
        default:
          toast.error("Something went wrong!");
          break;
      }
    } finally {
      setNewDeviceDescription("");
      setNewDeviceName("");
      setLoading(false);
    }
  };

  //--API call for deleting device
  const handleDeviceDelete = async (device_id) => {
    setLoading(true);
    // delete request to localhost:3001/api/device
    console.log(localStorage.getItem("auth-token"));
    try {
      const response = await axios.delete(`http://localhost:3001/api/device`, {
        headers: {
          authorization: localStorage.getItem("auth-token"),
        },
        data: { device_id: device_id },
      });

      if (response.status === 200) {
        console.log(response.data);
        // Remove the deleted device from the devices array
        let newDevices = devices.filter(
          (device) => device.device_id !== device_id
        );
        setDevices(newDevices);
      }
    } catch (err) {
      switch (err.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 401:
          toast.error("Unauthorized access!");
          break;
        case 403:
          toast.error("Unauthorized access!");
          break;
        case 404:
          toast.error("Project not found!");
          break;
        default:
          toast.error("Something went wrong!");
          break;
      }
    }
    setLoading(false);
  };

  //----API call for updating device
  const handleDeviceUpdate = async (device_id) => {
    if (newDeviceName === "" || newDeviceDescription === "") {
      toast.error("Device name and description cannot be empty!");
      return;
    }
    setLoading(true);
    // put request to localhost:3001/api/device
    try {
      const response = await axios.put(
        `http://localhost:3001/api/device`,
        {
          device_id: device_id,
          device_name: newDeviceName,
          description: newDeviceDescription,
        },

        {
          headers: {
            authorization: localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        toggleDeviceUpdateModal();
        console.log("Device ID being updated:", device_id);
        const updatedDevices = devices.map((device) => {
          console.log("Current device ID:", device.device_id);
          if (device.device_id === device_id) {
            console.log("Match found, updating device");
            return {
              ...device,
              device_name: newDeviceName,
              description: newDeviceDescription,
            };
          } else {
            return device;
          }
        });
        console.log("Updated devices:", updatedDevices);
        setDevices(updatedDevices);
        getAllDevices();
      }
    } catch (err) {
      switch (err.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 401:
          toast.error("Unauthorized access!");
          break;
        case 403:
          toast.error("Unauthorized access!");
          break;
        case 404:
          toast.error("Project not found!");
          break;
        default:
          toast.error("Something went wrong!");
          break;
      }
    } finally {
      setNewDeviceDescription("");
      setNewDeviceName("");
      setLoading(false);
    }
  };

  // API call for getting all devices for project
  const getAllDevices = async () => {
    setLoading(true);
    // get request to localhost:3001/api/device?project_id=<projectID>
    try {
      const response = await axios.get(
        `http://localhost:3001/api/device?project_id=${projectID}`,
        {
          headers: {
            authorization: localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        let devicesArray = [];
        response.data.forEach((device) => {
          // Specify the locale as 'si-LK' for Sri Lanka
          const date = new Date(device.updatedAt);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "GMT",
          };
          const formattedDate = new Intl.DateTimeFormat(
            "en-GB",
            options
          ).format(date);

          let deviceDetails = {
            device_id: device.device_id,
            device_name: device.device_name,
            description: device.description,
            footer: formattedDate,
          };
          devicesArray.push(deviceDetails);
        });

        setDevices(devicesArray);
        setLoading(false);
      }
    } catch (err) {
      switch (err.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 401:
          toast.error("Unauthorized access!");
          break;
        case 403:
          toast.error("Unauthorized access!");
          break;
        case 404:
          toast.error("Project not found!");
          break;
        default:
          toast.error("Something went wrong!");
          break;
      }
      setDevices([]);
      setLoading(false);
    }
  };

  return (
    <SidebarLayout
      active={2}
      addressText={"John Doe > UOM Weather Station > Devices"}
    >
      <div
        className="flex justify-between items-center mb-5"
        style={{ paddingLeft: "7%", paddingRight: "7%" }}
      >
        <div className="text-xl text-gray2 font-semibold">Your Devices</div>
        <div className="flex">
          <ButtonRectangle text="Add Device" onClick={toggleAddDeviceModal} />
        </div>
      </div>
      <div className="flex-wrap flex justify-center mb-28">
        {devices.map((device) => (
          <SquareCard
            isIconShown
            key={device.device_id}
            title={device.device_name}
            subtitle={device.description}
            footer={"Last Update:" + device.footer}
            mx="mx-2"
            onDelete={() => handleDeviceDelete(device.device_id)}
            onUpdate={() => {
              toggleDeviceUpdateModal();
              handleDeviceSelection(device.device_id);
            }}
            onClick={() => {
              navigate("/devices", {
                state: { device_id: device.device_id },
              });
            }}
          />
        ))}
      </div>

      {/* Add Device Modal */}
      <PopupContainer
        isOpen={isAddDeviceOpen}
        onClose={() => {}}
        closeFunction={toggleAddDeviceModal}
        Icon={FaPlusCircle}
        title={"Add New Device"}
        closeIconVisible={true}
      >
        <div className="flex flex-col justify-center mt-4">
          <label className="text-gray1 text-sm">Device Name</label>
          <TextBox
            text=""
            type="text"
            placeholder="Device Name"
            maxLength={50}
            textAlign={"left"}
            onChange={handleDeviceNameChange}
          />
        </div>
        <div className="flex flex-col justify-center mt-4">
          <label className="text-gray1 text-sm">Device Description</label>
          <TextBox
            text=""
            type="text"
            placeholder="Device Description"
            maxLength={100}
            textAlign={"left"}
            onChange={handleDeviceDescriptionChange}
          />
        </div>
        <div className="flex justify-center mt-8">
          <PillButton
            text="Add Device"
            onClick={handleDeviceAdding}
            isPopup={true}
            icon={FaPlusCircle}
          />
        </div>
      </PopupContainer>

      {/* Device Adding Done Modal - Show Device Fingerprint*/}
      <PopupContainer
        isOpen={isDeviceAddingDoneOpen}
        onClose={() => {}}
        closeFunction={toggleDeviceAddingDoneModal}
        Icon={MdRouter}
        title={"Device Added Successfully"}
        closeIconVisible={true}
      >
        <div className="flex flex-col justify-center items-center mt-3">
          <div className="flex    mt-1">
            <FaKey className="text-green" />
            <label className="text-gray1 text-sm ml-2">
              Device Fingerprint
            </label>
          </div>
          <input
            type="text"
            value={fingerprint}
            className="w-full bg-black3 border border-gray2 border-opacity-30 rounded-full text-center px-4 py-1 mt-2 text-gray2"
            readOnly
          />
          {/* <span className="text-gray2 text-xs text-center mt-2">
            This project ID should be included in data send requests
          </span> */}
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <PillButton
            text="Done"
            onClick={toggleDeviceAddingDoneModal}
            isPopup={true}
            icon={FaCheck}
          />
        </div>
      </PopupContainer>

      {/* Update Device Modal */}
      <PopupContainer
        isOpen={isDeviceUpdateOpen}
        onClose={() => {}}
        closeFunction={toggleDeviceUpdateModal}
        Icon={MdRouter}
        title={"Update Device"}
        closeIconVisible={true}
      >
        <div className="flex flex-col justify-center mt-4">
          <label className="text-gray1 text-sm">Device Name</label>
          <TextBox
            text=""
            type="text"
            placeholder="Device Name"
            maxLength={50}
            textAlign={"left"}
            onChange={handleDeviceNameChange}
          />
        </div>
        <div className="flex flex-col justify-center mt-4">
          <label className="text-gray1 text-sm">Device Description</label>
          <TextBox
            text=""
            type="text"
            placeholder="Device Description"
            maxLength={100}
            textAlign={"left"}
            onChange={handleDeviceDescriptionChange}
          />
        </div>
        <div className="flex justify-center mt-8">
          <PillButton
            text="Update Device"
            onClick={() => handleDeviceUpdate(selectedDeviceId)}
            isPopup={true}
            icon={MdRouter}
          />
        </div>
      </PopupContainer>

      {/* Spinner */}
      <Spinner isVisible={loading} />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SidebarLayout>
  );
};

export default Device;
