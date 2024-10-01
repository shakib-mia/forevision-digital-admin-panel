import { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import Upload from "../Upload/Upload";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { read, utils } from "xlsx";
import { AppContext } from "../../contexts/AppContext";
import PropTypes from "prop-types";

const UploadSection = ({ setProgress, setProgressVisible }) => {
  const { store } = useContext(AppContext);
  const options = store.platforms;
  // console.log(store.platforms);
  // console.log(
  //   [
  //     ...options.flatMap((item) => item.platforms),
  //     { cat_name: "Amazon Music" },
  //     { cat_name: "Resso" },
  //     { cat_name: "SIP" },
  //   ].sort((a, b) => a.cat_name.localeCompare(b.cat_name))
  // );
  const [selectedValue, setSelectedValue] = useState("");
  const [uploadedJSON, setUploadedJSON] = useState([]);
  const navigate = useNavigate();
  // console.log(file.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProgressVisible(true);

    // setUploading(true);
    // setProgress(0)

    const time = new Date().getTime();

    // inserting date and platform in excel converted json
    const updatedJSON = uploadedJSON.map((item) => {
      const newItem = { ...item }; // Create a shallow copy

      newItem.platformName = selectedValue;
      newItem.uploadDate = e.target["date"].value
        .split("-")
        .slice(0, 2)
        .join("-");
      newItem.uploadTime = time;

      Object.keys(newItem).forEach((k) => {
        if (k.includes("__EMPTY")) {
          delete newItem[k];
        }
      });

      Object.keys(newItem).forEach((k) => {
        if (newItem[k].length === 0) {
          newItem[k] = "N/A";
        }
      });

      return newItem;
    });

    const batchSize = 100; // Adjust the batch size according to your needs

    // Calculate the total number of batches
    const totalBatches = Math.ceil(updatedJSON.length / batchSize);

    // Function to upload a batch and handle progress
    const uploadBatch = async (batch, batchNumber) => {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
        // onUploadProgress: progressEvent => {
        //     // Calculate the upload percentage
        //     const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //     // Update your progress bar here using the calculated percentage
        //     console.log(`Batch ${batchNumber} - Upload Progress: ${progressPercentage}%`);
        // }
      };

      try {
        const { data } = await axios.post(
          backendUrl + "revenue-upload",
          batch,
          config
        );

        if (data.acknowledged) {
          setProgress((batchNumber * 100) / totalBatches);
          if ((batchNumber * 100) / totalBatches === 100) {
            setTimeout(() => setProgressVisible(false), 1000);

            toast.success("File Uploaded Successfully", {
              position: "bottom-center",
            });
          }
        }
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          navigate("/login");
        }
        // console.error(`Batch ${batchNumber} - ${error.response.data}`);
      }
    };

    // Upload batches with progress
    for (let i = 0; i < totalBatches; i++) {
      const startIndex = i * batchSize;
      const endIndex = Math.min((i + 1) * batchSize, updatedJSON.length);
      const batch = updatedJSON.slice(startIndex, endIndex);
      await uploadBatch(batch, i + 1); // Pass batch number for logging

      if (i === totalBatches - 1) {
        // console.log("Last iteration of the loop");
        setTimeout(() => {
          // setUploading(false);
          // toast.success("File successfully uploaded")
        }, 1000);
        // Additional code specific to the last iteration can be added here
      }
    }
  };

  function hasAllFields(obj, requiredFields) {
    return requiredFields.every((field) =>
      Object.prototype.hasOwnProperty.call(obj, field)
    );
  }

  const readExcel = (file) => {
    const reader = new FileReader();

    // Fields to Match
    const fields = [
      "Date",
      "Time",
      "product",
      "isrc",
      "upc",
      "vendor",
      "catalogue id",
      "composer",
      "Lyricist",
      "track_artist",
      "song_name",
      "album",
      "Language",
      "Content ID",
      "label",
      "country",
      "file_name",
      "months",
      "total",
      "royality",
      "platform tds",
      "after tds revenue",
      "forevision cut",
      "final revenue",
    ];

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "binary", raw: false });
      const jsonData = {};
      workbook.SheetNames.forEach((sheetName) => {
        // Set defval option to an empty string to handle empty cells
        const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName], {
          defval: "",
        });
        jsonData[sheetName] = sheetData;
      });

      const dataKey = Object.keys(jsonData)[0];
      setUploadedJSON(jsonData[dataKey]);

      // console.log(uploadedJSON);

      if (hasAllFields(jsonData[dataKey][0], fields)) {
        // console.log();

        setUploadedJSON(jsonData[dataKey]);
      } else {
        // toast.error("Format Didn't match")
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // setFile(file.name)
    // console.log(file);
    if (file) {
      readExcel(file);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pr-7">
      {/* <input type="date" name="date" className="w-full block border border-interactive-light-focus py-3 px-4 rounded-[0.25rem] text-interactive-light-focus text-paragraph-2 focus:outline-none cursor-pointer" /> */}
      <InputField type="date" name="date" />
      <Select
        placeholder="Select Platform Name"
        options={
          options
            ? [
                ...options.flatMap((item) => item.platforms),
                { cat_name: "Amazon Music" },
                { cat_name: "Resso" },
                { cat_name: "SIP" },
                { cat_name: "Vodafone" },
                { cat_name: "Idea" },
              ]
                .sort((a, b) => a.cat_name.localeCompare(b.cat_name))
                .map((item) =>
                  item?.cat_name === "YouTube Content ID"
                    ? "YouTube"
                    : item?.cat_name === "YouTube Music"
                    ? "YouTube New"
                    : item?.cat_name
                )
            : []
        }
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <Upload handleFileUpload={handleFileUpload} />
      <Button centered>upload</Button>
    </form>
  );
};

UploadSection.propTypes = {
  setProgress: PropTypes.func,
  setProgressVisible: PropTypes.func,
};

export default UploadSection;
