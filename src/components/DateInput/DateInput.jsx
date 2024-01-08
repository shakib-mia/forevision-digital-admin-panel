// import React from 'react';

function DateInput() {
    const openDatePicker = () => {
        // document.getElementById('dateInput').click();
        document.querySelector('input[type="date" i]').click();
    };

    return (
        <>
            <label htmlFor="dateInput" onClick={openDatePicker} style={{ cursor: 'pointer' }}>
                <div className=''>date</div>
            </label>
            <input type="date" name="selectedDate" id="dateInput" />
        </>
    );
}

export default DateInput;
