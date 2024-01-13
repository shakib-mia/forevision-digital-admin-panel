import PropTypes from 'prop-types'

const InputField = (props) => {
    return <>
        {props.label && <label className='font-medium' htmlFor={props.id}>{props.label}</label>}
        <input {...props} className='w-full px-2 py-[12px] bg-white border border-interactive-light-focus rounded-[0.25rem] focus:outline-none' />
    </>;
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
}

export default InputField;