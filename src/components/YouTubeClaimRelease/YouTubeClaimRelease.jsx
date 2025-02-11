import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import Button from "../Button/Button";

const YouTubeClaimRelease = () => {
  const [data, setData] = useState([]);
  const [detailsId, setDetailsId] = useState(-1);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get(backendUrl + "submit-form/youtube-claim-release")
      .then(({ data }) => setData(data));
  }, [refetch]);

  const handleApprove = () => {
    data[detailsId].approved = true;
    // console.log(data[detailsId]);
    // Add your API call here if needed
    const { _id, ...rest } = {
      id: "youtube-claim-release",
      ...data[detailsId],
      approved: true,
    };

    axios
      .put(backendUrl + "submit-form/youtube-claim-release/" + _id, rest)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Approved",
          text: "The YouTube Claim Release Request has been approved.",
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
        id: "youtube-claim-release",
        ...data[detailsId],
        denied: true,
        reason: denyReason,
      };

      axios
        .put(backendUrl + "submit-form/youtube-claim-release/" + _id, rest)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deny Reason Submitted",
            text: "The YouTube Claim Release Request has been denied.",
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
        <p className="text-heading-6-bold">YouTube Claim Release</p>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="py-4">Song Name</th>
            <th className="py-4">Email</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, id) => (
            <tr
              key={item?._id}
              className={`text-center hover:bg-grey-light transition cursor-pointer`}
              onClick={() => setDetailsId(id)}
            >
              <td className="py-2">{item.youtube_claim_release_song_name}</td>
              <td className="py-2">{item.emailId}</td>
              <td className="py-2">
                {item.approved ? "Approved" : item.denied ? "Denied" : ""}
              </td>
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
                      {item.split("youtube_claim_release")[1]?.includes("_")
                        ? item
                            .split("youtube_claim_release_")[1]
                            .split("_")
                            .join(" ")
                        : item.split("youtube_claim_release_")[1]}
                    </th>
                    <td className="p-2">
                      {item !== "_id" &&
                      item !== "approved" &&
                      item !== "denied" &&
                      data[detailsId][item]?.includes("http") ? (
                        <a href={data[detailsId][item]}>
                          {data[detailsId][item]}
                        </a>
                      ) : (
                        data[detailsId][item]
                      )}
                    </td>
                  </tr>
                )
            )}
          </table>

          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={handleApprove} action={"confirmation"}>
              Approve
            </Button>
            <Button onClick={handleDeny} action={"destructive"}>
              Deny
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default YouTubeClaimRelease;
