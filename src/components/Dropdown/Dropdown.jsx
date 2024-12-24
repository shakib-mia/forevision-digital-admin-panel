import React, { useState } from "react";

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(options);
  const handleOptionClick = (option) => {
    onSelectedChange(option);
    setIsOpen(false);
    // setPopupSong(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="w-full px-5 py-5 bg-white border border-grey rounded cursor-pointer capitalize"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-grey rounded mt-1 shadow-xl text-black">
          {options.map(({ value, label, color }) => (
            <li
              key={value}
              className={`px-5 py-3 cursor-pointer hover:bg-grey-light capitalize${
                color ? " " + color : ""
              }`}
              onClick={() => handleOptionClick(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
