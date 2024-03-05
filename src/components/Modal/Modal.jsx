// import React from "react";
import PropTypes from "prop-types";

const Modal = ({ handleClose, children }) => {
  return (
    <div className="fixed top-0 left-0 backdrop-blur h-screen w-screen flex items-center justify-center text-left">
      <div className="bg-white w-1/2 h-1/2 shadow-[10px_10px_45px_#ccc] rounded-2xl relative text-black-deactivated overflow-y-auto p-2">
        <button
          className="absolute top-3 right-3 w-7 h-7 border-black-deactivated border-2 flex items-center justify-center rounded-full"
          onClick={handleClose}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
