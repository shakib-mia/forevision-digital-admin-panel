import { useState } from 'react';
import PropTypes from "prop-types"

const Button = ({ type, action, children }) => {
    const [focused, setFocused] = useState(false);
    // const action = action || "";

    return (
        <div className={`p-[4px] w-fit rounded-full border-[2px] ${focused ? `border-interactive-light${action ? `-${action}` : ""}` : 'border-transparent'}`}>
            <button
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type={type}
                className={`px-[20px] py-[12px] rounded-full bg-interactive-light${action ? `-${action}` : ""} hover:bg-interactive-light${action ? `-${action}` : ""}-hover focus:bg-interactive-light${action ? `-${action}` : ""}-focus text-white text-button uppercase`}
            >
                {children}
            </button>
        </div>
    );
};


Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.string,
    children: PropTypes.node
}

export default Button;