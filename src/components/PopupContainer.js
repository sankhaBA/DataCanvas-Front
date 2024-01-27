import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaWindowClose } from "react-icons/fa";


const PopupContainer = ({ children, isOpen, onClose, Icon, title, closeFunction, closeIconVisible }) => {

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className=" fixed z-50 inset-0 overflow-y-auto flex flex-row items-center justify-center backdrop-blur-xs">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-30"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-30"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>


                <div className=" w-80 sm:w-[450px] fixed inset-0 flex items-center justify-center mx-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-50"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel as="div" className="w-full relative z-50 bg-black3 bg-opacity-20 backdrop-blur-sm border border-gray1 border-opacity-60 rounded-xl pt-5 px-7 pb-5 text-gray2">

                            {/* Popup title and icon */}
                            <div className="font-bold mb-3 flex items-center justify-between">
                                <span className='flex items-center  space-x-3'>
                                    <Icon className="text-2xl text-green" />
                                    <span>{title}</span>
                                </span>
                                {closeIconVisible ? (
                                    <button className="text-gray2 hover:text-green transition duration-300 ease-in-out" onClick={closeFunction}>
                                        <FaWindowClose className="text-xl" />
                                    </button>
                                ) :  null}


                            </div>

                            {children}

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition >
    )
}

// Specifies the default values for props:
PopupContainer.defaultProps = {
    closeIconVisible: false,
};

export default PopupContainer;