import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { MdFileDownload } from "react-icons/md";

const Agreements = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "upload-agreements")
      .then(({ data }) => setAgreements(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover ">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Agreements</p>
      </div>

      <div className="grid grid-cols-3 text-center mb-4 py-2">
        <p>Email ID</p>
        <p>ISRC</p>
        <p></p>
      </div>

      {agreements.map((item) => (
        <div className="grid grid-cols-3 p-3 text-center">
          <p>{item.emailId}</p>
          <p>{item.isrc || "-"}</p>
          <p>
            <a href={item.agreementUrl} target="_blank" rel="noreferrer">
              <MdFileDownload />
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Agreements;
