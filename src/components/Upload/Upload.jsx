import { useState } from "react";
import uploadIcon from "../../assets/icons/upload.svg";
import Button from "../Button/Button";
import PropTypes from "prop-types";

const Upload = ({ handleFileUpload }) => {
  const [file, setFile] = useState({});
  const [fileSize, setFileSize] = useState("");

  const handleUpload = (e) => {
    handleFileUpload(e);
    // console.log();
    const { size } = e.target.files[0];
    console.log(size);
    e.target.files[0].size / 1000 < 1024
      ? setFileSize(`${(e.target.files[0].size / 1000).toFixed(2)}KB`)
      : setFileSize(`${(e.target.files[0].size / (1000 * 1000)).toFixed(2)}MB`);

    setFile(e.target.files[0]);
  };

  return (
    <div className="p-4 border border-interactive-light-focus rounded-lg flex flex-col justify-center items-center gap-4 relative">
      <img src={uploadIcon} alt="" className="w-fit" />
      <input
        type="file"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleUpload}
        id="excelFile"
        accept=".xls,.xlsx"
      />

      <div className="w-full text-center">
        <p className="text-overline text-interactive-light">
          {file.name ? file.name : "Click To Upload"}
        </p>
        <p className="mt-2 mb-4 text-paragraph-2 text-black-secondary">
          {fileSize.length > 0 ? fileSize : ".XLSX Format Only"}
        </p>
        {/* {file !== null ? <p className="mt-2 mb-4 text-paragraph-2 text-black-secondary">{file.name}</p> : <></>} */}

        <Button
          outlined
          type="button"
          centered
          containerClassName="relative"
          onClick={() => document.getElementById("excelFile").click()}
        >
          Browse
        </Button>
      </div>
    </div>
  );
};

Upload.propTypes = {
  handleFileUpload: PropTypes.func,
};

export default Upload;
