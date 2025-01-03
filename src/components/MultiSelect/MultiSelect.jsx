import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineCheck } from "react-icons/ai"; // Import the custom checkmark icon

const MultiSelect = (props) => {
  const { selectedItems, setSelectedItems } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isSelected = (item) => selectedItems.includes(item);

  return (
    <div className={props.containerClassName}>
      {props.label && (
        <label className="font-medium capitalize" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div
        className={`relative ${
          props.className
        } w-full px-2 py-[12px] bg-white border border-interactive-light-focus rounded-[0.25rem] ${
          isOpen ? "rounded-b-none" : ""
        } focus:outline-none`}
      >
        <div
          className="flex items-center justify-between cursor-pointer text-nowrap overflow-hidden"
          onClick={toggleDropdown}
        >
          <span>
            {selectedItems?.length > 0
              ? selectedItems.join(", ")
              : props.placeholder}
          </span>
        </div>
        {isOpen && (
          <ul className="absolute left-0 right-0 top-[100%] bg-white border border-interactive-light-focus rounded-t-none rounded-[0.25rem] max-h-40 overflow-auto z-10">
            {props.options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelection(option)}
                className={`flex items-center justify-between cursor-pointer px-2 py-1 hover:bg-grey-light `}
              >
                <span>{option}</span>
                {/* Custom Checkmark Icon */}
                {isSelected(option) && (
                  <AiOutlineCheck className="mr-2 text-green-600" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default MultiSelect;
