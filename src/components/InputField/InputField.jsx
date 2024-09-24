import PropTypes from "prop-types";

const InputField = (props) => {
  return (
    <div className={props.containerClassName}>
      {props.label && (
        <label className="font-medium" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <input
        {...props}
        className={`${props.className} w-full px-2 py-[12px] bg-white border border-interactive-light-focus rounded-[0.25rem] focus:outline-none`}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default InputField;
