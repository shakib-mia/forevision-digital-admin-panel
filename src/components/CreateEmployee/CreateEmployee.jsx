import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { AppContext } from "../../contexts/AppContext";

const CreateEmployee = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { updated, setUpdated } = useContext(AppContext);

  // alert(updated);

  const handleCreateEmployee = (e) => {
    e.preventDefault();

    axios
      .post(backendUrl + "admin/create-employee", { name, role })
      .then(({ data }) => {
        setUpdated(!updated);
        e.target.reset();
      });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <h6 className="text-heading-6-bold">Create Employee</h6>
      </div>
      <form className="p-3" onSubmit={handleCreateEmployee}>
        <InputField
          type="text"
          name={"name"}
          placeholder={"Enter Employee Name"}
          containerClassName={"mb-4"}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          selectedValue={role}
          setSelectedValue={setRole}
          placeholder="Choose Role"
          options={["Content Manager", "User Manager", "Finance Manager"]}
        />

        <Button containerClassName={"mx-auto mt-4"} type={"submit"}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateEmployee;
