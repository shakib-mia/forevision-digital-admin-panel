// import React from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import Select from "../Select/Select";

const GenerateCouponCode = () => {
  const { store, setCouponInsertedId } = useContext(AppContext);
  const options = [1, 2, 3, 4, 5];
  const [selectedValue, setSelectedValue] = useState("");

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { token: store.token },
    };

    console.log({
      couponCode: e.target.coupon.value,
      discountPercentage: e.target["discount-percentage"].value,
      validFrom: e.target["valid-from"].value,
      validTill: e.target["valid-till"].value,
      email_id: e.target.email.value,
      plan: selectedValue,
    });

    axios
      .post(
        backendUrl + "coupon-codes",
        {
          couponCode: e.target.coupon.value,
          discountPercentage: e.target["discount-percentage"].value,
          validFrom: e.target["valid-from"].value,
          validTill: e.target["valid-till"].value,
          email_id: e.target.email.value,
          plan: selectedValue,
        },
        config
      )
      .then(({ data }) => {
        if (data.insertedId) {
          setCouponInsertedId(data.insertedId);
          e.target.reset();
        }
      });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      {/* header */}

      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Generate A Coupon Code</p>
        {/* <Arrow increased={true} /> */}
      </div>

      <form
        action=""
        onSubmit={handleCouponSubmit}
        className="p-3 mx-auto flex flex-col justify-center items-center"
      >
        <div className="grid grid-cols-2 gap-3">
          <InputField
            type="text"
            label="Coupon Code"
            name="coupon"
            id="coupon-code"
            placeholder={"Enter Your Coupon Code Here"}
            className={"mb-4 text-black-secondary"}
            containerClassName={"w-full"}
          />
          <InputField
            type="number"
            label="Discount Percentage"
            name="discount-percentage"
            placeholder={"Enter Discount Percentage Here"}
            className={"text-black-secondary"}
            containerClassName={"w-full"}
          />
          <InputField
            type="date"
            label="Valid From"
            name="valid-from"
            className={"text-black-secondary mb-4"}
            containerClassName={"w-full"}
          />
          <InputField
            type="date"
            label="Valid Till"
            name="valid-till"
            className={"text-black-secondary"}
            containerClassName={"w-full"}
          />

          <Select
            options={options}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            placeholder="Select a Plan"
            label="Plan"
            // name="plan"
          />

          <InputField
            placeholder={"Enter An Email Address"}
            name="email"
            type="email"
            label={"Email Address"}
          />
        </div>

        <Button
          type={"submit"}
          dynamicButtonClasses="w-fit"
          containerClassName="mt-5 text-center"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default GenerateCouponCode;