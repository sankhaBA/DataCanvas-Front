import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HashLoader } from "react-spinners";

const Spinner = ({ isVisible }) => {

    return (
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog as="div" open={isVisible} onClose={() => { }} className=" fixed z-50 inset-0 overflow-y-auto flex flex-row items-center justify-center backdrop-blur-sm">
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

                <HashLoader data-testid="spinner" color={"#3ECF8E"} loading={true} size={50} />

            </Dialog>
        </Transition >
    )
}

// Specifies the default values for props:
Spinner.defaultProps = {

};

export default Spinner;