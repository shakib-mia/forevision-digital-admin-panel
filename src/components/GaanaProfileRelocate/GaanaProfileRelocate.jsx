import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const GaanaProfileRelocate = () => {
  const [data, setData] = useState([]);
  const [detailsId, setDetailsId] = useState(-1);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get(backendUrl + "submit-form/gaana-fresh-profile")
      .then(({ data }) => setData(data));
  }, [refetch]);

  //// console.log(data[detailsId]);

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleApprove = () => {
    data[detailsId].approved = true;
    // console.log(data[detailsId]);
    // Add your API call here if needed
    const { _id, ...rest } = {
      id: "gaana-fresh-profile",
      ...data[detailsId],
      approved: true,
    };

    axios
      .put(backendUrl + "submit-form/gaana-fresh-profile/" + _id, rest)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Approved",
          text: "The Gaana Fresh Profile Request has been approved.",
        });
        setRefetch(!refetch);
        setDetailsId(-1); // Close the modal
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
        id: "gaana-fresh-profile",
        ...data[detailsId],
        denied: true,
        reason: denyReason,
      };

      axios
        .put(backendUrl + "submit-form/gaana-fresh-profile/" + _id, rest)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deny Reason Submitted",
            text: "The Gaana Fresh Profile Request has been denied.",
          });
          setRefetch(!refetch);
          setDetailsId(-1); // Close the modal
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
        <p className="text-heading-6-bold">
          Gaana Profile Relocate/Fresh Profile
        </p>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="py-4">Name</th>
            <th className="py-4">Email</th>
            {/* <th className="py-4">ISRC</th> */}
          </tr>
        </thead>

        <tbody>
          {data.map((item, id) => (
            <tr
              key={item?._id}
              className={`text-center hover:bg-grey-light transition cursor-pointer`}
              onClick={() => setDetailsId(id)}
            >
              <td className="py-2">
                {item.gaana_fresh_profile_name ||
                  item.gaana_fresh_profile_artist_name}
              </td>
              <td className="py-2">
                {item.gaana_fresh_profile_email || item.emailId}
              </td>
              {/* <td className="py-2">{item.gaana_fresh_profile_isrc}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {detailsId > -1 && (
        <Modal handleClose={() => setDetailsId(-1)}>
          <table className="text-black border w-full divide-y border-grey rounded">
            {Object.keys(data[detailsId]).map(
              (item) =>
                item !== "_id" && (
                  <tr className="divide-x">
                    <th className="capitalize py-2">
                      {item.split("gaana_fresh_profile_")[1]?.includes("_")
                        ? item
                            .split("gaana_fresh_profile_")[1]
                            .split("_")
                            .join(" ")
                        : item.split("gaana_fresh_profile_")[1]}
                    </th>
                    <td className="p-2">{data[detailsId][item]}</td>
                  </tr>
                )
            )}
          </table>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleApprove}
              action={"confirmation"}
              disabled={data[detailsId].approved || data[detailsId].denied}
            >
              Approve
            </Button>
            <Button
              onClick={handleDeny}
              action={"destructive"}
              disabled={data[detailsId].approved || data[detailsId].denied}
            >
              Deny
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GaanaProfileRelocate;
