// import React from 'react';
import { useState } from "react";
import formImage from "./../../assets/images/form-image.webp"
import Form from "../../components/Form/Form";


const Login = () => {
    const [method, setMethod] = useState("Admin");

    const fields = method === 'Admin' ? [
        {
            placeholder: "Enter E-mail",
            name: 'email'
        },
        {
            placeholder: "Enter Password",
            name: 'admin-password'
        }

    ] : [
        {
            placeholder: "Enter Employee Code",
            name: 'employee-code'
        },
        {
            placeholder: "Enter Password",
            name: 'employee-password'
        }

    ];

    const handleSubmit = e => {
        e.preventDefault();
        console.log(fields);
    }

    return (
        <div className='container h-screen flex items-center justify-center'>
            <div className="grid grid-cols-2 gap-[12rem]">
                <aside>
                    <h3 className="text-grey">WELCOME BACK !</h3>
                    <h6 className="text-interactive-dark-active mt-1 pb-1 border-b-[3px] inline-block border-white mb-4">Please verify your identity to proceed !</h6>
                    <img src={formImage} alt="" />
                </aside>

                <div className="bg-white rounded-2xl p-6 text-center" style={{ boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)' }}>
                    <h5 className="text-heading-5-bold text-grey">
                        I am an ForeVision Digital
                    </h5>

                    <div className="flex gap-4 text-heading-5-bold justify-center mt-3 text-grey">
                        <button onClick={() => setMethod("Admin")} className={method === 'Admin' ? 'text-interactive-dark-focus border-b-[3px] border-interactive-dark-focus' : ''}>Admin</button>
                        <button onClick={() => setMethod("Employee")} className={method === 'Employee' ? 'text-interactive-dark-focus border-b-[3px] border-interactive-dark-focus' : ''}>Employee</button>
                    </div>


                    <Form fields={fields} onSubmit={handleSubmit} containerClassName="mt-[100px]" />
                </div>
            </div>
        </div>
    );
};

export default Login;