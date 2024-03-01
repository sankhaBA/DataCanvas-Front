//dependencies
import React, { useState, useEffect } from "react";
import { FaMicrochip, FaDatabase, FaClock, FaPlusCircle, FaAngleRight, FaForward } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages for navigation

import { Link, useLocation, useNavigate } from "react-router-dom";

//components
import SidebarLayout from "../components/SidebarLayout";
import ButtonRectangle from "../components/ButtonRectangle";
import PillButton from "../components/PillButton";
import TextBox from "../components/TextBox";
import Spinner from "../components/Spinner";
import InsightCard from "../components/InsightCard";
import RectangularCard from "../components/RectangularCard";
import axios from "axios";

function Settings(){
    return (
        <SidebarLayout>
          {/* <div className="flex flex-col w-full h-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row items-center">
                        <FaDatabase className="text-2xl text-green mr-4" />
                        <span className="text-xl text-gray2 font-bold font-poppins">Settings</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <ButtonRectangle text="Add New" icon={FaPlusCircle} />
                    </div>
                </div>
                <div className="flex flex-row w-full mt-8">
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center">
                                <span className="text-lg text-gray2 font-bold font-poppins">Device Settings</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
                            </div>
                            <div className="flex flex-row items-center mt-4">
                                <span className="text-lg text-gray2 font-bold font-poppins">Data Tables</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
                            </div>
                            <div className="flex flex-row items-center mt-4">
                                <span className="text-lg text-gray2 font-bold font-poppins">User Settings</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center">
                                <span className="text-lg text-gray2 font-bold font-poppins">Device Settings</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
                            </div>
                            <div className="flex flex-row items-center mt-4">
                                <span className="text-lg text-gray2 font-bold font-poppins">Data Tables</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
                            </div>
                            <div className="flex flex-row items-center mt-4">
                                <span className="text-lg text-gray2 font-bold font-poppins">User Settings</span>
                                <FaAngleRight className="text-xl text-green ml-4" />
        </div>
        </div>
            </div>
            </div>
          </div> */}
          <div className=" text-white">
          <div className="overflow-y-auto h-screen absolute inset-0 bg-cover bg-center opacity-20 blur-sm "
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/projects_back_gray.png'})` }}></div>


            

        

<div className="flex flex-col justify-center mx-40 my-4 bg-black3 p-10 rounded-lg">
    <div className="flex justify-center items-center"><div className="w-20 h-20 bg-cover rounded-full cursor-pointer flex justify-center items-center" 
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/sample_user.jpg)` }}></div></div>
    <h1 className="text-center my-2">John Doe</h1>
    <div className="text-green text-center my-2">johnd@gmail</div>

    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 whitespace-nowrap text-gray1">
        <div className="font-bold text-white">General Settings</div><div></div><div></div><div></div>
        
            <div className="flex items-center">
                <label className="mr-2 whitespace-nowrap" for>Your Name</label>
                <TextBox text="" type="text" />
            </div>
            <div className="flex items-center">
                <label className="mr-2">Email</label>
                <TextBox text="" type="text" />
            </div>
        
        <div className="my-1">
            <label className="flex items-center">Change Password</label>
            <ButtonRectangle text="Change" icon={FaForward} />
        </div>
    </div>

    <div className="text-gray1 mt-4">
        <span className="font-bold text-white">Critical Settings</span>
        <div className="flex flex-row my-1">
            <span className="mr-2">Delete your account</span>
            <label>This will delete all your data and your login credentials. You need to sign up and configure from scratch to use the platform again</label>
            <ButtonRectangle text="Delete account" />
        </div>
        <div className="flex flex-row my-1">
            <span className="mr-2">Delete your account</span>
            <label>All your data are protected and verified through a strong privacy policy</label>
            <ButtonRectangle text="Delete account" />
        </div>
    </div>

    <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
      <div class="flex items-center">  
        <label class="text-white font-bold mb-1 md:mb-0 mr-2 whitespace-nowrap" for="inline-full-name">General Settings</label>
      </div>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div>

      <div class="flex items-center"> 
        <label class="text-gray-500 font-bold mb-1 md:mb-0 whitespace-nowrap mr-2" for="inline-password">First Name</label>
      </div>
      <div class="flex items-center col-span-3">
        <ButtonRectangle text="Change password" icon={FaForward} />
      </div>
        <div></div><div></div><div></div><div></div><div></div><div></div>
      
      
    </div>


</div>
</div>




<div class="grid grid-cols-4 md:grid-cols-8 gap-3"> 
      <div className="flex items-center">
        <label className="text-white">Your Name</label>
      </div>
</div>

         
        </SidebarLayout>

    );
}
export default Settings;