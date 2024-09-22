import React from "react";
import Button from "../Button/Button";

const UserDetailsPopup = ({ user, onClose, setUserEmail }) => {
  console.log(user);
  user.accountBalance = user.lifetimeRevenue - user.lifetimeDisbursed;

  delete user._id;

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="bg-gray-100 p-3 rounded-md">
          {value.map((item, index) => (
            <span
              key={index}
              className="inline-block bg-white text-sm text-gray-800 px-2 py-1 rounded mr-2 mb-2"
            >
              {item}
            </span>
          ))}
        </div>
      );
    } else if (typeof value === "number") {
      return <p className="font-medium">₹ {value.toFixed(2)}</p>;
    } else {
      return (
        <p className="font-medium text-wrap">
          {value.includes(",") ? value.split(",").join(", ") : value}
        </p>
      );
    }
  };

  const renderField = (key, value) => {
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    return (
      <div key={key} className="mb-4">
        <p className="text-sm text-gray-600">{label}</p>
        {renderValue(value)}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-[99999999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl m-4 relative">
        <button
          onClick={onClose}
          className="text-interactive-light-destructive absolute top-3 right-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 pb-0 border-b border-grey-light">
          <h3 className="font-semibold text-grey-dark mb-4">User Details</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(user)?.map(([key, value]) =>
              renderField(key, value)
            )}
          </div>
        </div>

        <div className="border-t border-grey-light flex justify-center px-6 py-4 rounded-b-lg">
          <Button
            onClick={() => {
              setUserEmail(user.emailId);
              onClose();
            }}
          >
            Create a New Record Label
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
