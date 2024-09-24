import { useState } from "react";
import PropTypes from "prop-types";

const Button = ({
  type,
  action,
  children,
  outlined,
  centered,
  containerClassName,
  onClick,
  loading,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);
  // const action = action || "";
  // console.log(action.length);
  const dynamicBorderColor = focused
    ? `border-interactive-light${
        action && action.length > 0 ? `-${action}` : ""
      }`
    : "border-transparent";

  const dynamicButtonClasses = disabled
    ? "bg-interactive-light-confirmation-disabled"
    : outlined
    ? action === "confirmation"
      ? "border border-interactive-light-confirmation text-interactive-light-confirmation hover:bg-interactive-light-confirmation-disabled focus:bg-interactive-light-confirmation-disabled"
      : action === "destructive"
      ? "border border-interactive-light-destructive text-interactive-light-destructive hover:bg-interactive-light-destructive-disabled focus:bg-interactive-light-destructive-disabled"
      : "border border-interactive-light text-interactive-light hover:bg-interactive-light-disabled focus:bg-interactive-light-disabled"
    : action === "confirmation"
    ? "bg-interactive-light-confirmation hover:bg-interactive-light-confirmation-hover focus:bg-interactive-light-confirmation-focus text-white"
    : action === "destructive"
    ? "bg-interactive-light-destructive hover:bg-interactive-light-destructive-hover focus:bg-interactive-light-destructive-focus text-white"
    : "bg-interactive-light hover:bg-interactive-light-hover focus:bg-interactive-light-focus text-white";

  // const handleClick = (e) => {
  //   onClick();

  //   e.target.blur();
  // };

  return (
    <div
      className={`p-[4px] w-fit rounded-full border-[2px] ${dynamicBorderColor} ${containerClassName} ${
        loading ? "opacity-60" : ""
      } ${centered ? "mx-auto" : ""}`}
    >
      <button
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`px-[20px] py-[12px] disabled:cursor-not-allowed rounded-full ${dynamicButtonClasses} text-button uppercase`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.string,
  children: PropTypes.node,
  outlined: PropTypes.bool,
  centered: PropTypes.bool,
  containerClassName: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
