// import React from 'react';
import { useContext, useState } from "react";
import formImage from "./../../assets/images/form-image.webp";
import Form from "../../components/Form/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";

const Login = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("Admin");
  const { store, setStore } = useContext(AppContext);

  const fields =
    method === "Admin"
      ? [
          {
            placeholder: "Enter E-mail",
            name: "email",
            type: "email",
          },
          {
            placeholder: "Enter Password",
            name: "admin-password",
            type: "password",
          },
        ]
      : [
          {
            placeholder: "Enter Employee Code",
            name: "employee-code",
            type: "text",
          },
          {
            placeholder: "Enter Password",
            name: "employee-password",
            type: "password",
          },
        ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "Admin") {
      axios
        .post(backendUrl + "login", {
          email: e.target.email.value,
          password: e.target["admin-password"].value,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.token) {
            navigate("/");
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);
            setStore({ ...store, token: data.token, role: "admin" });
          }
        })
        .catch((error) => toast.error(error.response.data.message));
    } else {
      axios
        .post(backendUrl + "employee-login", {
          employeeCode: e.target["employee-code"].value,
          employeePassword: e.target["employee-password"].value,
        })
        .then(({ data }) => {
          if (data.token) {
            navigate("/");
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("name", data.name);
            setStore({ ...store, ...data });
          }
        })
        .catch((error) =>
          toast.error(error.response.data.message, {
            position: "bottom-center",
          })
        );
    }
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 items-center gap-[12rem]">
        <aside className="flex flex-col items-center">
          <div>
            <h3 className="text-grey">WELCOME BACK !</h3>
            <h6 className="text-interactive-dark-active mt-1 pb-1 border-b-[3px] inline-block border-white mb-4">
              Please verify your identity to proceed !
            </h6>
          </div>
          <img src={formImage} alt="" className="-ml-20" />
        </aside>

        <div
          className="bg-white rounded-2xl p-10 text-center h-full"
          style={{
            boxShadow:
              "0px 10px 15px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h5 className="text-heading-5-bold text-grey">
            I am an ForeVision Digital
          </h5>

          <div className="flex gap-4 text-heading-5-bold justify-center mt-3 text-grey">
            <button
              onClick={() => setMethod("Admin")}
              className={
                method === "Admin"
                  ? "text-interactive-dark-focus border-b-[3px] border-interactive-dark-focus"
                  : ""
              }
            >
              Admin
            </button>
            <button
              onClick={() => setMethod("Employee")}
              className={
                method === "Employee"
                  ? "text-interactive-dark-focus border-b-[3px] border-interactive-dark-focus"
                  : ""
              }
            >
              Employee
            </button>
          </div>

          <Form
            fields={fields}
            onSubmit={handleSubmit}
            containerClassName="mt-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
