import React from 'react';

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
