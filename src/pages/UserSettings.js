//dependencies
import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";


//pages for navigation

import { Link, useLocation, useNavigate } from "react-router-dom";

//components
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import axios from "axios";
import NonSidebarLayout from "../components/NonSidebarLayout";
import CriticalAction from "../components/CriticalAction";
import PillButton from "../components/PillButton";
import LoginPopup from "../components/LoginPopup";




function UserSettings() {

    // navigation hooks
    const navigate = useNavigate();


    // loading state variables

    const [loading, setLoading] = useState(false);

    // ---------- Login for proceed with critical actions
    const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [authenticationResult, setAuthenticationResult] = useState(false);

    useEffect(() => {
        if (authenticationResult) {
            setIsLoginPopupVisible(false);
            if (actionType == 1) {
                toast.success('Action Confirmed, Deleting Account! We are sorry to see you go!');
                // handleDeleteAccount();
            }
            else if (actionType == 2) {
                toast.success('login Sucessful! You will be redirected to change email!');
                // handleChangeEmail();
            }

        }
    }, [authenticationResult]);


    //user state details
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    useEffect(() => {
        loadUserDetails();
    }, []);

    //handle changes

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success('Password reset email sent successfully. Check your Mailbox.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error('Error sending password reset email:', errorCode, errorMessage);
        });
    }

    // Load user details
    const loadUserDetails = () => {

        const handlePasswordReset = () => {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Password reset email sent successfully. Check your Mailbox.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error('Error sending password reset email:', errorCode, errorMessage);
            });
        }

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
                }
            })
            .catch(error => {
                // Handle the error
                switch (error.response.status) {
                    case 400:
                        toast.error('Bad request');
                        break;
                    case 401 || 403:
                        toast.error('Unauthorized');
                        navigate('/login');
                        break;
                    case 404:
                        toast.error('User not found');
                        navigate('/login');
                        break;
                    default:
                        console.error('Error fetching user data:', error);
                        toast.error('Error fetching user data');
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
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
                toast.success('User details updated successfully');
            })
            .catch(error => {
                // Handle the error
                switch (error.response.status) {
                    case 400:
                        toast.error('Bad request');
                        break;
                    case 401 || 403:
                        toast.error('Unauthorized');
                        navigate('/login');
                        break;
                    case 404:
                        toast.error('User not found');
                        navigate('/login');
                        break;
                    default:
                        console.error('Error updating user data:', error);
                        toast.error('Error updating user data');
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });

    };



    return (


        <NonSidebarLayout>
            <div className=" text-white mb-20">
                {/* <div class="overflow-y-auto h-screen absolute inset-0 bg-cover bg-center opacity-20 blur-sm" style={{backgroundImage: `url('/img/projects_back_gray.png')`}}> </div> */}

                <div className="flex flex-col justify-center mx-1 sm:mx-4 lg:mx-40 my-4 bg-black3 px-2 md:px-20 rounded-xl">
                    <div className="flex justify-center items-center"><div className="w-40 h-40 bg-cover rounded-full cursor-pointer flex justify-center items-center mt-12"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/sample_user.jpg)` }}></div></div>
                    <h1 className="text-center my-2 text-xl">{name}</h1>
                    <div className="text-green text-center my-1">{email}</div>


                    <div className="text-m text-gray2 font-semibold mt-8">General Settings</div>
                    <div className="flex flex-row mt-1">
                        <div className="flex flex-col w-1/4 md:w-1/6">
                            <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Your name</div>
                        </div>
                        <TextBox type="text" value={name}
                            placeholder="John Doe" maxLength={50} textAlign="left"
                            width="w-full" onChange={handleNameChange} />
                    </div>
                    <div className="flex flex-row mt-1">
                        <div className="flex flex-col w-1/4 md:w-1/6">
                            <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Email</div>
                        </div>
                        <TextBox type="text" placeholder="johndoe123@gmail.com" value={email}
                            maxLength={50} textAlign="left" width="w-full" onChange={handleEmailChange} />
                    </div>
                    <div className="flex flex-row mt-4 sm:mt-2">
                        <CriticalAction buttonText={"Change Password"} title={"Change Password"} subtitle={"Change the password of your user account"} buttonColor={"red"} onClick={() => {handlePasswordReset()}} />
                    </div>
                    <div className="flex justify-center mt-8">

                        <PillButton text="Save Changes" onClick={handleSubmit} isPopup={true} icon={FaUpload} />

                    </div>



                    <div className="border-t border-gray1 border-opacity-80 my-8"></div>
                    <div className="text-m text-gray2 font-semibold mt-4">Critical Settings</div>

                    <div className="flex flex-col mt-4">
                        <CriticalAction title="Delete your account" subtitle="Delete everything from DataCanvas including your account" buttonText={"Delete Account"} buttonColor={"red"} onClick={() => { 
                            setActionType(1);
                            setIsLoginPopupVisible(true)
                        }} />
                        <CriticalAction title="Privacy Policy" subtitle="All your data are protected and verified through a strong privacy policy" buttonText={"View Policy"} buttonColor={"green"} onClick={() => { }} />
                    </div>
                    <div className="mt-8"></div>
                </div>
            </div>

            {/* Popup container for login authentication popup */}
            <LoginPopup
            
                isOpen={isLoginPopupVisible}
                closeFunction={() => setIsLoginPopupVisible(false)}
                setAuthenticationResult={(e) => setAuthenticationResult(e)}
                email={localStorage.getItem('email')} 
            />

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