// import React from "react";
import PropTypes from "prop-types";

const Modal = ({ handleClose, children, className }) => {
  return (
    <div
      className="fixed top-4 left-0 backdrop-blur-sm h-screen w-screen flex items-center justify-center text-left z-[999]"
      onClick={handleClose}
    >
      <div
        className={`bg-white w-2/3 h-2/3 shadow-[0px_0px_35px_#ccc] rounded-2xl relative text-black-deactivated overflow-y-auto p-2 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 w-7 h-7 border-black-deactivated border-2 flex items-center justify-center rounded-full"
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
