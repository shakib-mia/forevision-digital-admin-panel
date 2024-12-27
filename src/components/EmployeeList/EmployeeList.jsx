import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../../contexts/AppContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { updated, setUpdated } = useContext(AppContext);

  useEffect(() => {
    axios.get(backendUrl + "admin").then(({ data }) => setEmployees(data));
  }, [updated]);

  const handleDelete = (id) => {
    axios.delete(backendUrl + "admin/" + id).then(({ data }) => {
      if (data.acknowledged) {
        setUpdated(!updated);
      }
    });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <h6 className="text-heading-6-bold">Employees</h6>
      </div>

      <div className="grid grid-cols-4 text-center mb-4 py-2">
        <p>Name</p>
        <p>Role</p>
        <p>Employee Code</p>
        <p>Password</p>
      </div>

      {employees.map(({ name, role, employeeCode, password, _id }) => (
        <div className="grid grid-cols-4 text-center relative">
          <p>{name}</p>
          <p>{role}</p>
          <p>{employeeCode}</p>
          <p>{password}</p>
          <button
            className="absolute right-4 top-0 bottom-0 my-auto text-interactive-light-destructive"
            onClick={() => handleDelete(_id)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
