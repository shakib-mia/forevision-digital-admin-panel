// import React from 'react';

import { useState } from "react";
import icon from "./../../assets/icons/play.svg"
import PropTypes from "prop-types";
import arrow from "../../assets/icons/chevron.svg"

const Select = ({ placeholder, options, selectedValue, setSelectedValue }) => {
    const [showOptions, setShowOptions] = useState(false);
    const handleSelect = (item) => {
        setSelectedValue(item);
        setShowOptions(false)
    }

    return (
        <div className="relative cursor-pointer">
            <div className={`flex gap-2 text-left px-4 py-3 border border-interactive-light-focus rounded-[0.25rem] ${showOptions && 'rounded-b-none'}`} onClick={() => setShowOptions(!showOptions)}>
                <img src={icon} alt="" />
                <p className="text-paragraph-2 text-black-secondary w-full">{selectedValue || placeholder}</p>
                <img src={arrow} alt="" className={`transition ${showOptions ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            {showOptions && <ul className="border border-interactive-light-focus rounded-t-none rounded-[0.25rem] border-t-0 absolute w-full bg-white z-50 shadow-lg h-48 overflow-y-auto">
                {options.map(item => <li className="px-4 py-3 hover:bg-grey-light" onClick={() => handleSelect(item)} key={item}>{item}</li>)}
            </ul>}
        </div>
    );
};


Select.propTypes = {
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedValue: PropTypes.string.isRequired,
    setSelectedValue: PropTypes.func.isRequired
}

export default Select;