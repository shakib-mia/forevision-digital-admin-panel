import { BsBoxArrowUpRight } from "react-icons/bs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import { camelCaseToNormalText } from "./../../utils/camelCaseToNormalText";

const Kyc = () => {
  const [kycList, setKycList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    axios.get(backendUrl + "kyc").then(({ data }) => setKycList(data));
  }, []);

  //   kycList.map((item) => {
  //     delete item.accepted;
  //     delete item.aadharCard;

  //     Object.values(item).map((item) => console.log(item));
  //   });

  //   const newobject
  // console.log(kycList);
  // kycList.map((itm) => Object.entries(itm).map((i) => console.log(i)));

  return (
    <div className="bg-white h-full rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">KYC Filled By Users</p>
      </div>
      <div className="p-3">
        <ul className="grid grid-cols-3 text-center">
          <li>Name</li>
          <li>Email Id</li>
          <li>Phone No.</li>
          {/* <li>Address</li>
          <li>Country</li>
          <li>Pin Code</li>
          <li>State</li>
          <li>Street Address</li> */}
        </ul>

        {kycList.map((item, key) => (
          <ul className="grid grid-cols-3 text-center text-wrap gap-4 relative py-4">
            <li>{item.name}</li>
            <li>{item.emailId}</li>
            <li>{item.phoneNo}</li>
            <BsBoxArrowUpRight
              className="absolute right-0 top-0 bottom-0 my-auto cursor-pointer"
              onClick={() => setSelectedItem(item)}
            />
          </ul>
        ))}
      </div>

      {selectedItem.name && (
        <Modal className={"w-5/6"} handleClose={() => setSelectedItem({})}>
          <ul className="grid grid-cols-9 text-center">
            {Object.keys(selectedItem).map(
              (item) => item !== "_id" && <li>{camelCaseToNormalText(item)}</li>
            )}
          </ul>

          <ul>
            <li className="grid grid-cols-9">
              {Object.values(selectedItem).map(
                (it) =>
                  typeof it !== "boolean" && (
                    <li className="text-center text-wrap">
                      {it.includes("http") ? <a href={it}>Open</a> : it}
                    </li>
                  )
              )}
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Kyc;
