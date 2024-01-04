// import React from 'react';
import PropTypes from 'prop-types'
import Button from '../Button/Button';

const Form = ({ fields, containerClassName, onSubmit }) => {
    return (
        <form className={`${containerClassName} flex flex-col items-center gap-5`} onSubmit={onSubmit}>
            {fields.map(({ placeholder, type }) => <>
                <input type={type} placeholder={placeholder} className='w-full px-2 py-[12px] bg-surface-white-surface-1 border border-surface-white-line focus:outline-none' />
            </>)}

            <Button type="submit">
                Login
            </Button>
        </form>
    );
};

Form.propTypes = {
    fields: PropTypes.array.isRequired,
    containerClassName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
}

export default Form;