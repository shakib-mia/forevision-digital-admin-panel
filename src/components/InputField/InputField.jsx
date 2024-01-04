import PropTypes from 'prop-types'

const InputField = ({ type, placeholder }) => {
    return <input type={type} placeholder={placeholder} className='w-full px-2 py-[12px] bg-surface-white-surface-1 border border-surface-white-line focus:outline-none' />;
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

export default InputField;