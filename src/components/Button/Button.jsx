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
  // console.log(disabled);
  const [focused, setFocused] = useState(false);
  // const action = action || "";
  // console.log(action.length);
  const dynamicBorderColor = focused
    ? `border-interactive-light${
        action && action.length > 0 ? `-${action}` : ""
      }`
    : "border-transparent";

  const dynamicButtonClasses = disabled
    ? action === "confirmation"
      ? "bg-interactive-light-confirmation-disabled text-white ring-interactive-light-confirmation"
      : action === "destructive"
      ? "bg-interactive-light-destructive-disabled text-white ring-interactive-light-destructive-focus"
      : "bg-interactive-light-disabled text-white"
    : outlined
    ? action === "confirmation"
      ? "border border-interactive-light-confirmation text-interactive-light-confirmation hover:bg-interactive-light-confirmation-hover focus:bg-interactive-light-confirmation-disabled ring-interactive-light-confirmation"
      : action === "destructive"
      ? "border border-interactive-light-destructive text-interactive-light-destructive hover:bg-interactive-light-destructive-disabled focus:bg-interactive-light-destructive-disabled ring-interactive-light-destructive"
      : "border border-interactive-light text-interactive-light hover:bg-interactive-light-disabled focus:bg-interactive-light-disabled ring-interactive-light-focus"
    : action === "confirmation"
    ? "bg-interactive-light-confirmation hover:bg-interactive-light-confirmation-hover focus:bg-interactive-light-confirmation-focus text-white ring-interactive-light-confirmation"
    : action === "destructive"
    ? "bg-interactive-light-destructive hover:bg-interactive-light-destructive-hover focus:bg-interactive-light-destructive-focus text-white ring-interactive-light-destructive-focus"
    : "bg-interactive-light hover:bg-interactive-light-hover focus:bg-interactive-light-focus focus:ring-interactive-light text-white";

  // const handleClick = (e) => {
  //   onClick();

  //   e.target.blur();
  // };

  return (
    <div
      className={`p-[4px] w-fit rounded-full transition ${dynamicBorderColor} ${containerClassName} ${
        loading ? "opacity-60" : ""
      } ${centered ? "mx-auto" : ""}`}
    >
      <button
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`px-[20px] py-[12px] text-nowrap disabled:cursor-not-allowed rounded-full ${dynamicButtonClasses} text-button uppercase transition focus:ring-2 ring-offset-2`}
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
