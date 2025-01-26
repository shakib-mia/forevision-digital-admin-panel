// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import { useLocation } from "react-router-dom";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import Button from "./../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Swal from "sweetalert2";

const SongDetails = () => {
  const location = useLocation();
  const [tableData, setTableData] = useState({});
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [checking, setChecking] = useState(false);

  const options = [
    {
      value: "sent-to-stores",
      label: "Sent to Stores",
      color: "text-interactive-light-confirmation",
    },
    { value: "streaming", label: "Streaming", color: "text-interactive-light" },
    {
      value: "copyright-infringed",
      label: "Copyright Infringed",
      color: "text-interactive-dark-destructive-active",
    },
    {
      value: "taken-down",
      label: "Taken Down",
      color: "text-interactive-light-destructive",
    },
  ];

  useEffect(() => {
    axios
      .get(
        backendUrl + "upload-song/by-id/" + location.pathname.split("/")[2],
        config
      )
      .then(({ data }) => setTableData(data));
  }, []);

  useEffect(() => {
    if (selectedOption !== "Select an option") {
      // console.log(selectedOption);
      // console.log(tableData);
      // clg
    } else {
      console.log("default");
    }
  }, [selectedOption]);

  const checkAudioFile = (value, type = "main") => {
    setChecking(true);

    axios
      .post(backendUrl + "check-audio-file/" + tableData.orderId, {
        songUrl: value,
      })
      .then(({ data }) => {
        if (data.success) {
          const formatDetails = (part, title) => {
            // Flexible handling for different data structures
            const artistNames = part?.artists
              ? part?.artists
                  .map(
                    (artist) =>
                      artist.name || (artist.langs ? artist.langs[0]?.name : "")
                  )
                  .filter((name) => name)
              : [];

            return `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">${title}</h4>
              <p><b style="color: #333;">Title:</b> ${part?.title || "N/A"}</p>
              <p><b style="color: #333;">Type:</b> ${part?.type || "N/A"}</p>
              <p><b style="color: #333;">Artists:</b> ${
                artistNames.join(", ") || "N/A"
              }</p>
              <p><b style="color: #333;">Album:</b> ${
                part?.album?.name || "N/A"
              }</p>
              <p><b style="color: #333;">Label:</b> ${part?.label || "N/A"}</p>
              <p><b style="color: #333;">Release Date:</b> ${
                part?.release_date || "N/A"
              }</p>
              <p><b style="color: #333;">Score:</b> ${part?.score || "N/A"}</p>
              <p><b style="color: #333;">Duration (ms):</b> ${
                part?.duration_ms || "N/A"
              }</p>
              <p><b style="color: #333;">Play Offset (ms):</b> ${
                part?.play_offset_ms || "N/A"
              }</p>
              ${
                part?.langs
                  ? `
              <p><b style="color: #333;">Languages:</b> ${part?.langs
                .map((lang) => `${lang.name} (${lang.code})`)
                .join(", ")}</p>`
                  : ""
              }
            </div>
            `;
          };

          const externalMetadataDetails = (part, platform) => {
            const platformMetadata =
              part?.external_metadata?.[platform.toLowerCase()]?.track;
            return platformMetadata
              ? `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">${platform} Metadata</h4>
              <p><b style="color: #333;">Track Name:</b> ${
                platformMetadata.name || "N/A"
              }</p>
              <p><b style="color: #333;">Track ID:</b> ${
                platformMetadata.id || "N/A"
              }</p>
            </div>
            `
              : "";
          };

          const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">Order Details</h4>
              <p><b style="color: #333;">Order ID:</b> ${
                data.orderId || "N/A"
              }</p>
              <p><b style="color: #333;">Total Duration:</b> ${
                data.duration ? data.duration.toFixed(2) + " seconds" : "N/A"
              }</p>
            </div>
        
            ${
              data.timestamps
                ? `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">Timestamps</h4>
              <p><b style="color: #333;">Start:</b> Time: ${data.timestamps.start.time}, Duration: ${data.timestamps.start.duration}</p>
              <p><b style="color: #333;">Middle:</b> Time: ${data.timestamps.middle.time}, Duration: ${data.timestamps.middle.duration}</p>
              <p><b style="color: #333;">End:</b> Time: ${data.timestamps.end.time}, Duration: ${data.timestamps.end.duration}</p>
            </div>`
                : ""
            }
        
            ${
              data.data
                ? `
              ${formatDetails(data.data.firstPart, "First Part Details")}
              ${formatDetails(data.data.middlePart, "Middle Part Details")}
              ${formatDetails(data.data.lastPart, "Last Part Details")}
            `
                : ""
            }
        
            ${
              data.songMetadata
                ? `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">Song Metadata Status</h4>
              <p><b style="color: #333;">Status Message:</b> ${
                data.songMetadata.status?.msg || "N/A"
              }</p>
              <p><b style="color: #333;">Status Code:</b> ${
                data.songMetadata.status?.code || "N/A"
              }</p>
              <p><b style="color: #333;">Version:</b> ${
                data.songMetadata.status?.version || "N/A"
              }</p>
            </div>`
                : ""
            }
          </div>
          `;

          Swal.fire({
            title: "Music Metadata Details",
            html: htmlContent,
            icon: "info",
            width: 700,
            confirmButtonText: "Close",
            customClass: {
              container: "swal-container",
              title: "swal-title",
              popup: "swal-popup",
            },
          });
        } else {
          Swal.fire({
            title: "No Data Found",
            text: "The song is not available in our database.",
            icon: "warning",
            confirmButtonText: "Close",
          });
        }
        setChecking(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "An error occurred while checking the audio file.",
          icon: "error",
          confirmButtonText: "Close",
        });
        setChecking(false);
      });
  };

  return (
    <div className="w-3/4 mx-auto my-5 rounded-2xl bg-white shadow-[0px_0px_35px_#ccc] px-7">
      <div className="container mx-auto p-4">
        <h1 className="text-heading-1-bold font-bold mb-4 text-grey-dark text-center">
          Album Details
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <tbody>
            {Object.entries(tableData).map(([key, value]) => (
              <tr key={key} className="border border-grey divide-x divide-grey">
                <td className="px-4 py-2 font-medium text-gray-700">
                  {key
                    ? camelCaseToNormalText(
                        key === "accepted"
                          ? "t&cAccepted"
                          : key === "requested"
                          ? "refundRequested"
                          : key === "reason"
                          ? "reasonForRefund"
                          : key === "songUrl"
                          ? "song"
                          : key
                      )
                    : camelCaseToNormalText(key)}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {key === "artists" ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((artist, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2">{artist.name}</td>
                            <td className="px-4 py-2">{artist.role}</td>
                            <td className="px-4 py-2">
                              <div className="flex divide-x">
                                {artist.appleArtist && (
                                  <a
                                    href={artist.appleArtist}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Apple Music
                                  </a>
                                )}
                                {artist.facebookUrl && (
                                  <a
                                    href={artist.facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Facebook
                                  </a>
                                )}
                                {artist.instagramUrl && (
                                  <a
                                    href={artist.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Instagram
                                  </a>
                                )}

                                {artist.spotifyUrl && (
                                  <a
                                    href={artist.spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    spotify
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : Array.isArray(value) ? (
                    value.map((item, index) => (
                      <div key={index} className="py-1">
                        <span>{item}</span>
                      </div>
                    ))
                  ) : key === "artWork" ? (
                    <img
                      src={value}
                      alt="Album Artwork"
                      className="max-w-xs h-auto"
                    />
                  ) : key === "songUrl" ? (
                    <div className="flex gap-2 items-center">
                      <audio controls className="w-full">
                        <source src={value} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <Button
                        disabled={checking}
                        onClick={() => checkAudioFile(value)}
                      >
                        {checking
                          ? "Checking..."
                          : // : tableData.checked
                            // ? "Already Checked"
                            "Check Audio File"}
                      </Button>
                    </div>
                  ) : (
                    <span>{value.toString()}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {tableData.payment_id?.length && (
          <div className="flex justify-center mt-10">
            <Button action={"confirmation"} onClick={handleMakeLive}>
              Make Live
            </Button>
          </div>
        )} */}

        <h4 className="mt-8">Actions</h4>
        {/* <select className="w-full px-5 py-5">
          <option
            className="text-interactive-light-confirmation"
            value="sent-to-stores"
          >
            Sent to Stores
          </option>
          <option className="text-interactive-light" value="streaming">
            streaming
          </option>
          <option
            className="text-interactive-dark-destructive-active"
            value="copyright-infringed"
          >
            copyright-infringed
          </option>
          <option
            className="text-interactive-light-destructive"
            value="taken-down"
          >
            taken-down
          </option>
        </select> */}

        {/* <div className="relative inline-block w-full">
          <select className="w-full px-5 py-5 appearance-none">
            <option value="sent-to-stores">Sent to Stores</option>
            <option value="streaming">streaming</option>
            <option value="copyright-infringed">copyright-infringed</option>
            <option value="taken-down">taken-down</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div> */}

        <Dropdown
          options={options}
          selected={selectedOption}
          onSelectedChange={setSelectedOption}
        />
      </div>
    </div>
  );
};

export default SongDetails;
