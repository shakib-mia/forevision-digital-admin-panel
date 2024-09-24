import React, { useContext, useState } from "react";
import InputField from "./../../components/InputField/InputField";
import Button from "../Button/Button";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import { AppContext } from "../../contexts/AppContext";

const CreateNewRecordLabel = ({ email, onClose }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  const { store } = useContext(AppContext);
  //   console.log(store);
  // const { recordLabels } = useContext(ProfileContext);
  // console.log(recordLabels);

  const handleRecordLabelSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: store.token,
      },
    };

    // setShowRecordLabelForm(false);
    const data = {
      "Sub-Label Name": e.target.recordLabelName.value,
      phoneNo: e.target.phoneNo.value,
      status: "Active",
      "Email ID": email,
      address: e.target.address.value,
      "Start Date": e.target.startDate.value,
      //   "End Date": e.target.endDate?.value || "",
      signatoryName: e.target.signatoryName.value,
    };

    // console.log(data);

    axios
      .post(backendUrl + "record-labels", data, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          //   window.location.reload();
          toast.success("Record Label Created Successfully");
          onClose();
        }
      })
      .catch((error) =>
        toast.error(error.response.data, {
          position: "bottom-center",
        })
      );

    // console.log(data);
  };

  const location = useLocation();

  return (
    <>
      <form
        className={`${
          location.pathname === "/home"
            ? "bg-grey-light p-4 rounded-2xl"
            : "bg-white p-4 rounded w-11/12 lg:w-1/2 h-fit overflow-auto relative"
        }`}
        onSubmit={handleRecordLabelSubmit}
      >
        <button
          className="text-interactive-light-destructive absolute top-2 right-2"
          type="button"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h5
          className={
            location.pathname === "/home"
              ? "text-heading-4-bold text-grey-dark mb-2"
              : "text-heading-5-bold text-center mt-4"
          }
        >
          Create A New Record Label
        </h5>

        <InputField
          type={"text"}
          placeholder={"Record Label Name"}
          label={"Name"}
          name={"recordLabelName"}
          // hideRequired={true}
          id={"record-label-name"}
          required={true}
        />

        <div className="flex gap-3 mt-3">
          <InputField
            type={"tel"}
            placeholder={"Enter your phone no. here"}
            label={"Phone No."}
            setSelectedCode={setSelectedCode}
            name={"phoneNo"}
            selectedCode={selectedCode}
            containerClassName={"w-1/2"}
            id={"phone-no"}
            required={true}
          />

          <InputField
            type={"email"}
            disabled={true}
            placeholder={"Enter your email address here"}
            name={"email"}
            id={"email"}
            label={"Email id"}
            value={email}
            containerClassName={"w-1/2"}
            required={true}
          />
        </div>

        <InputField
          type={"text"}
          placeholder={"Enter your address here"}
          id={"address"}
          label={"Address"}
          name={"address"}
          containerClassName={"mt-3"}
          hideRequired={true}
        />

        <div className="flex gap-3 mt-3">
          <InputField
            type={"date"}
            containerClassName={"w-1/2"}
            hideRequired={true}
            name={"startDate"}
            label={"Start Date"}
          />

          {/* {!isPerpetual && ( */}
          {/* <InputField
            type={"date"}
            containerClassName={"w-1/2"}
            name={"endDate"}
            hideRequired={true}
            label={"End Date"}
          /> */}
          {/* )} */}
          {/* <InputField
              type={"checkbox"}
              containerClassName={"mt-1"}
              label={"Perpetual"}
              id={"perpetual"}
              onChange={(e) => setIsPerpetual(e.target.checked)}
              hideRequired={true}
            /> */}
          <InputField
            type={"text"}
            placeholder={"Enter your signature here"}
            label={"Signatory Person Name"}
            name={"signatoryName"}
            id={"signature"}
            containerClassName={"w-1/2"}
            hideRequired={true}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type={"submit"}
            containerClassName={"mt-6 mx-auto"}
            // onClick={() => }
          >
            Add
          </Button>
        </div>
      </form>

      {/* <div className="bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0 z-[999999999]"></div> */}
    </>
  );
};

export default CreateNewRecordLabel;
