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

function Settings(){
    return (

        
        <NonSidebarLayout>
         
          <div className=" text-white">
          <div className="overflow-y-auto h-screen absolute inset-0 bg-cover bg-center opacity-20 blur-sm "
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/projects_back_gray.png'})` }}></div>
            <div className="flex flex-col justify-center mx-40 my-4 bg-black3 p-10 rounded-lg">
            <div className="flex justify-center items-center"><div className="w-20 h-20 bg-cover rounded-full cursor-pointer flex justify-center items-center" 
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/sample_user.jpg)` }}></div></div>
            <h1 className="text-center my-2">John Doe</h1>
            <div className="text-green text-center my-2">johnd@gmail</div>

            
            <div className="text-m text-gray2 font-semibold mx-8 mt-8">General Settings</div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Your name</div>
                    </div>
                    <TextBox  type="text" placeholder="John Doe" maxLength={50} textAlign="left" width="w-2/3 md:w-1/4"  />
            </div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Email</div>
                    </div>
                    <TextBox  type="text" placeholder="johndoe123@gmail.com" maxLength={50} textAlign="left" width="w-2/3 md:w-1/4"  />
            </div>
            <div className="flex flex-row ml-8 mt-1">
                    <div className="flex flex-col w-1/4 md:w-1/6">
                        <div className="text-sm md:text-md text-gray1 font-semibold mt-2">Change Password</div>
                    </div>
                    <CriticalAction buttonText={"Change Password"} buttonColor={"red"}  onClick={() => { }} />
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
         
        </NonSidebarLayout>
        

    );
}
export default Settings;