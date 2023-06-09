import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'block' : 'hidden';

  return (
    <div 
      id="extralarge-modal" 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${showHideClassName}`}
    >
      <div className="relative w-full max-w-3xl max-h-[80%] m-4 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
        {/*Modal content here*/}
        <div className="overflow-auto">
          {children}
        </div>
        <div className="flex items-center p-2 space-x-2 border-t border-gray-200 dark:border-gray-600">
          <button onClick={handleClose} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;