// import React from "react";
import PropTypes from "prop-types";

const Modal = ({ handleClose, children, className }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/50 h-screen w-screen flex items-center justify-center z-[999] transition-all duration-300 ease-out"
      onClick={handleClose}
    >
      <div
        className={`bg-white w-11/12 md:w-2/3 lg:w-1/2 max-h-[85vh] shadow-lg rounded-2xl relative overflow-y-auto p-6 transition-transform transform-gpu scale-95 opacity-0 animate-modal-fade-in ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 text-interactive-light-destructive text-heading-4 right-4 w-8 h-8 border-gray-400 hover:bg-gray-100 transition-colors duration-200 ease-in-out flex items-center justify-center rounded-full text-lg text-gray-600"
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
