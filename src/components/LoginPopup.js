import React, { useState, useEffect } from "react";
import { FaKey, FaGoogle, FaGithub } from "react-icons/fa";
import PopupContainer from "./PopupContainer";
import ButtonRectangle from "./ButtonRectangle";
import TextBox from "./TextBox";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAuth, setPersistence, browserSessionPersistence, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPopup = ({ isOpen, closeFunction, setAuthenticationResult, email }) => {

    const [loading, setLoading] = useState(false);

    // State for the email and password field
    const [password, setPassword] = useState('');

    if (isOpen) {
        var auth = getAuth();
        // Get the currently signed-in user
    }

    const handleGoogleLogin = () => {
        if (loading) return;
        setLoading(true);

        setAuthenticationResult(false);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                if (result.user.email !== email) {
                    toast.warning('The email address used to sign in does not match the email address used to log in');
                    setLoading(false);
                    setPassword('');
                    return;
                } else {
                    console.log('Login success using google');
                    setAuthenticationResult(true);
                    setLoading(false);
                    setPassword('');
                }
            }).catch((error) => {
                toast.warning('An error occurred signing in using Google');
                setLoading(false);
                setPassword('');
            });
    }


    const handleGithubLogin = () => {
        if (loading) return;
        setLoading(true);

        setAuthenticationResult(false);
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                if (result.user.email !== email) {
                    toast.warning('The email address used to sign in does not match the email address used to log in');
                    setLoading(false);
                    setPassword('');
                    return;
                } else {
                    console.log('Login success using github');
                    setAuthenticationResult(true);
                    setLoading(false);
                    setPassword('');
                }
            }).catch((error) => {
                toast.warning('An error occurred signing in using GitHub');
                setLoading(false);
                setPassword('');
            });
    }


    const handleLoginWithEmail = async () => {
        if (!password || password === '') {
            toast.warning('Please enter password.');
            return;
        }

        if (loading) return;
        setLoading(true);

        setAuthenticationResult(false);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Login success using email');
                setAuthenticationResult(true);
                setPassword('');
                setLoading(false);
            })
            .catch((error) => {
                toast.warning('Log in unsuccessful');
                setPassword('');
                setLoading(false);
            });
    }

    return (
        <PopupContainer
            isOpen={isOpen}
            onClose={() => { }}
            closeFunction={closeFunction}
            Icon={FaKey}
            title={'Confirm Identity'}
            closeIconVisible={true}
            width={'550px'}>
            <div className="flex flex-col justify-between items-center mt-4">
                <p className={`text-gray2 text-sm`}>{!loading ? 'You need to confirm your identity to proceed with this action' : 'Please wait...'}</p>

                {loading ? (
                    <div className={`flex flex-col justify-center items-center mt-5`}>
                        <ScaleLoader color={"#C0392B"} loading={true} size={30} />
                    </div>
                ) : (
                    <div className={`flex flex-col justify-center items-center`}>
                        <span className={`text-gray1 text-xs mt-4`}>Login Password</span>
                        <TextBox
                            type={'password'}
                            placeholder={'Enter your password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="flex justify-center items-center mt-4  space-x-4">
                            <div className="w-10 h-10 bg-black3 text-green border border-gray1 border-opacity-30 rounded-full flex justify-center items-center hover:bg-black hover:text-gray2 transition duration-300 ease-in-out"
                                onClick={() => { handleGoogleLogin() }}>
                                <FaGoogle className="text-lg" />
                            </div>

                            <div className="w-10 h-10 bg-black3 text-green border border-gray1 border-opacity-30 rounded-full flex justify-center items-center hover:bg-black hover:text-gray2 transition duration-300 ease-in-out"
                                onClick={() => { handleGithubLogin() }}>
                                <FaGithub className="text-lg" />
                            </div>
                        </div>
                        <div className={`mt-5`}>
                            <ButtonRectangle
                                text="Continue"
                                onClick={() => {
                                    handleLoginWithEmail();
                                }}
                                isPopup={true}
                                color={'red'} />
                        </div>
                    </div>
                )}
            </div>

        </PopupContainer>
    );
};

export default LoginPopup;