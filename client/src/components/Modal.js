import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'block' : 'hidden';

  return (
    <div 
      id="extralarge-modal" 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${showHideClassName}`}
      style={{ overflowY: 'auto' }}
    >
      <div className="relative w-full max-w-7xl max-h-full m-4 bg-white rounded-lg shadow-lg overflow-auto dark:bg-gray-700">
        {/*Modal content here*/}
        {children}
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button onClick={handleClose} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;