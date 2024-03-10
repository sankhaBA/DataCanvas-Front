//dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages for navigation

import { Link, useLocation, useNavigate } from "react-router-dom";

//components
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";
import ScrollableContainer from "../components/ScrollableContainer";
import NonSidebarLayout from "../components/NonSidebarLayout";
import CriticalAction from "../components/CriticalAction";
import { MdTrackChanges } from "react-icons/md";
import PillButton from "../components/PillButton";
import { FaUpload } from 'react-icons/fa';
function UserSettings(){

    // navigation hooks
    const navigate = useNavigate();
    

    // loading state variables
    
    const [loading, setLoading] = useState(false);

    //user state details
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
    // Set loading to true before the data is fetched
        setLoading(true);
    
    // Construct the URL with the email parameter
    const email = localStorage.getItem('email');
    const url = `http://localhost:3001/api/user/?email=${email}`;
    
    // Make the GET request to retrieve the user details
    axios.get(url)
        .then((response) => {
            // Check if the user is found
            if (response.status === 200) {
                setUser(response.data);
                setName(response.data.user_name); // Assuming user_name is the correct field name
                setEmail(response.data.email);
            } else {
                // Handle other status codes
                console.error('Error fetching user data:', response.status);
                toast.error('Error fetching user data');
            }
        })
        .catch(error => {
            // Handle the error
            console.error('Error fetching user data:', error);
            toast.error('Error fetching user data');
        })  
        .finally(() => {
            setLoading(false);
        });

    }, []);

    //handle changes

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
     // Handle form submission
     const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        // Make the PUT request to update the user details
        const requestBody = {
            email: email,
            user_name: name,
        }

        axios.put('http://localhost:3001/api/user', requestBody) 
            .then(response => {
                setUser(response.data);
                
                toast.success('User details updated successfully');

            })
            .catch(error => {
                console.error('Error updating user data:', error);
                toast.error('Error updating user data');
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
           
    };

    
    
    return ( 
       
         
        <NonSidebarLayout>
        <div className=" text-white">
        {/* <div class="overflow-y-auto h-screen absolute inset-0 bg-cover bg-center opacity-20 blur-sm" style={{backgroundImage: `url('/img/projects_back_gray.png')`}}> </div> */}

            <div className="flex flex-col justify-center mx-40 my-4 bg-black3 p-10 rounded-lg">
            <div className="flex justify-center items-center"><div className="w-20 h-20 bg-cover rounded-full cursor-pointer flex justify-center items-center" 
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/sample_user.jpg)` }}></div></div> 
            <h1 className="text-center my-2">{name}</h1>
            <div className="text-green text-center my-2">{email}</div>
            
            
            <div className="text-m text-gray2 font-semibold mx-8 mt-8">General Settings</div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Your name</div>
                    </div>
                    <TextBox  type="text"  value={name}
                    placeholder="John Doe" maxLength={50} textAlign="left" 
                    width="w-2/3 md:w-1/4" onChange={handleNameChange}    />
            </div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Email</div>
                    </div>
                    <TextBox type="text" placeholder="johndoe123@gmail.com" value={email} 
                    maxLength={50} textAlign="left" width="w-2/3 md:w-1/4" onChange={handleEmailChange} />
                   
                     
            </div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Change Password</div>
                    </div>
                    <CriticalAction buttonText={"Change Password"} buttonColor={"red"}  onClick={() => { }} />
            </div>
            <div className="flex justify-center mt-4">
               
            <PillButton text="Save Changes"onClick={handleSubmit} isPopup={true}    icon={FaUpload}/>
            
            </div>



            <div className="border-t border-gray1 border-opacity-80 mx-8 my-8 mr-8"></div>
            <div className="text-m text-gray2 font-semibold mx-8 mt-8">Critical Settings</div>

            <div className="flex flex-col mx-6 mt-4">
                <CriticalAction title="Delete your account" subtitle="This will delete all your data and your login credentials. You need to sign up and configure from scratch to use the platform again" buttonText={"Delete Account"} buttonColor={"red"} onClick={() => { }} />
                <CriticalAction title="Privacy Policy" subtitle="All your data are protected and verified through a strong privacy policy" buttonText={"Set Policy"} buttonColor={"green"} onClick={() => { }} />
            </div>
            <div className="mt-8"></div>
         </div>
         </div>
         <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
              {/* Spinner */}
              <Spinner isVisible={loading} />
         
        
        </NonSidebarLayout>
        
        

    );
}
export default UserSettings;