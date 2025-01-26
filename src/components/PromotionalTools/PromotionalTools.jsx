import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const PromotionalTools = () => {
  const [data, setData] = useState([]);
  const [detailsId, setDetailsId] = useState(-1);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get(backendUrl + "submit-form/promotional-tool")
      .then(({ data }) => setData(data))
      .catch((error) =>
        console.error("Failed to fetch promotional tools:", error)
      );
  }, [refetch]);

  const formatFieldName = (key) => {
    if (!key.includes("promotional_tool_")) return key;

    const fieldName = key.split("promotional_tool_")[1];
    return fieldName.includes("_") ? fieldName.split("_").join(" ") : fieldName;
  };

  const renderTableCell = (value) => {
    if (!value) return ""; // Handle null/undefined values

    const stringValue = String(value);
    return stringValue.startsWith("http") ? (
      <a href={stringValue} className="text-blue-600 hover:underline">
        {stringValue}
      </a>
    ) : (
      stringValue
    );
  };

  const selectedItem = detailsId > -1 ? data[detailsId] : null;

  const handleApprove = () => {
    data[detailsId].approved = true;
    console.log(data[detailsId]);
    // Add your API call here if needed
    const { _id, ...rest } = {
      id: "promotional-tool",
      ...data[detailsId],
      approved: true,
    };

    axios
      .put(backendUrl + "submit-form/promotional-tool/" + _id, rest)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Approved",
          text: "The promotional tool has been approved.",
        });
        setDetailsId(-1); // Close the modal
        setRefetch(!refetch);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit deny reason. Please try again.",
        });
        console.error(err);
      });
  };

  const handleDeny = async () => {
    const { value: denyReason } = await Swal.fire({
      title: "Deny Reason",
      input: "textarea",
      inputLabel: "Provide a reason for denial",
      inputPlaceholder: "Type your reason here...",
      inputAttributes: {
        "aria-label": "Type your reason here",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    });

    if (denyReason) {
      // Call API to send deny reason
      const { _id, ...rest } = {
        id: "promotional-tool",
        ...data[detailsId],
        denied: true,
        reason: denyReason,
      };

      axios
        .put(backendUrl + "submit-form/promotional-tool/" + _id, rest)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deny Reason Submitted",
            text: "The promotional tool has been denied.",
          });
          setDetailsId(-1); // Close the modal
          setRefetch(!refetch);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to submit deny reason. Please try again.",
          });
          console.error(err);
        });
    }
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Promotional Tool</p>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="py-4">ISRC</th>
            <th className="py-4">Email</th>
            <th className="py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, id) => (
            <tr
              key={item?._id || id}
              className={`text-center hover:bg-grey-light transition cursor-pointer`}
              onClick={() => setDetailsId(id)}
            >
              <td className="py-2">{item?.promotional_tool_isrc || "-"}</td>
              <td className="py-2">
                {item?.promotional_tool_upload_user_email ||
                  item.emailId ||
                  "-"}
              </td>
              <td className="py-2">
                {item.approved ? "Approved" : item.denied ? "Denied" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <Modal handleClose={() => setDetailsId(-1)}>
          <table className="text-black border w-full divide-y border-grey rounded">
            <tbody>
              {Object.entries(selectedItem).map(([key, value]) => {
                if (key === "_id") return null;

                return (
                  <tr key={key} className="divide-x">
                    <th className="capitalize py-2 px-4 text-left bg-gray-50">
                      {formatFieldName(key)}
                    </th>
                    <td className="p-2">{renderTableCell(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleApprove}
              action={"confirmation"}
              disabled={selectedItem.approved || selectedItem.denied}
            >
              Approve
            </Button>
            <Button
              onClick={handleDeny}
              action={"destructive"}
              disabled={selectedItem.approved || selectedItem.denied}
            >
              Deny
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PromotionalTools;
