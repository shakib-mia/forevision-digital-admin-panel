import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { MdFileDownload } from "react-icons/md";

const RecordLabelFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "upload-record-labels")
      .then(({ data }) => setFiles(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover ">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Record Label Files</p>
      </div>

      <div className="grid grid-cols-2 text-center mb-4 py-2">
        <p>Email ID</p>
        <p></p>
      </div>

      {files.map((item) => (
        <div className="grid grid-cols-2 p-3 text-center">
          <p>{item.emailId}</p>
          {/* <p>{item.isrc || "-"}</p> */}
          <p className="text-center">
            <a href={item.recordLabelPdf} target="_blank" rel="noreferrer">
              <MdFileDownload />
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecordLabelFiles;
