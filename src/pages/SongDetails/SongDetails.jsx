import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import { useLocation } from "react-router-dom";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import Button from "./../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Swal from "sweetalert2";
import ReasonToReject from "../../components/ReasonToReject/ReasonToReject";
import InputSongDetails from "../../components/InputSongDetails/InputSongDetails";
import SentToStores from "../../components/SentToStores/SentToStores";
import ReasonToHold from "../../components/ReasonToHold/ReasonToHold";
import HandleTakedown from "../../components/HandleTakedown/HandleTakedown";
import ExternalMetadataDetails from "../../components/ExternalMetadataDetails/ExternalMetadataDetails";

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
    // console.log(selectedOption);
    if (selectedOption !== "Set Status") {
      tableData.status = selectedOption;
      const updated = { ...tableData };

      const handleSwal = (Component, title) => {
        let swalContent = document.createElement("div");
        ReactDOM.render(
          <Component
            platforms={tableData.selectedPlatforms}
            updated={updated}
            // album={album}
            // albumSelectedOption={albumSelectedOption}
            selectedOption={selectedOption}
          />,
          swalContent
        );

        Swal.fire({
          title: title,
          html: swalContent,
          showConfirmButton: false,
          customClass: {
            popup: "custom-swal-width",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            triggerFinalSwal(updated);
          }

          if (result.dismiss === Swal.DismissReason.backdrop) {
            setSelectedOption("Set Status");
          }
        });
      };

      // console.log(selectedOption);

      if (selectedOption === "streaming") {
        handleSwal(InputSongDetails, "Input Song details");
      } else if (selectedOption === "sent-to-stores") {
        handleSwal(SentToStores, "Input Song details");
      } else if (selectedOption === "on-hold") {
        handleSwal(ReasonToHold, "Enter Reason");
      } else if (selectedOption === "paid") {
        // handleSwal(HandlePaid, "Enter Transaction Id");
      } else if (selectedOption === "taken-down") {
        handleSwal(HandleTakedown, "Enter Reason for Taking Down");
      } else if (selectedOption === "copyright-infringed") {
        updated.status = "Copyright infringed";
        const { _id, ...rest } = updated;
        rest.status = "Copyright infringed";
        // console.log(_id, rest);

        axios
          .put(`${backendUrl}songs/${_id}`, rest, config)
          .then(({ data }) => {
            if (data.acknowledged) {
              axios
                .post(backendUrl + "send-song-status", rest)
                .then(({ data }) => {
                  if (data.acknowledged) {
                    Swal.close();
                  }
                });
            }
          });
      } else if (selectedOption === "rejected") {
        handleSwal(ReasonToReject, "Enter Reason for Song Rejection");

        // handleSwal(HandlePaid, "Enter Transaction Id");

        // updated.rejected = true;
        // const { _id, ...updatedData } = updated;
        // axios
        //   .put(`http://localhost:5100/songs/${_id}`, updatedData, config)
        //   .then(({ data }) => {
        //     if (data.acknowledged) {
        //       updatedData.status = "Rejected";
        //       axios
        //         .post(backendUrl + "send-song-status", updatedData)
        //         .then(({ data }) => {
        //           // if (data.acknowledged) {
        //           Swal.close();
        //           // }
        //         });
        //     }
        //   });
      } else {
        // Handle default case if necessary
      }

      // console.log(selectedOption);
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
            // Handle different parts and structure the artist names
            const artistNames = part?.artists
              ? part?.artists
                  .map(
                    (artist) =>
                      artist.name || (artist.langs ? artist.langs[0]?.name : "")
                  )
                  .filter((name) => name)
              : [];

            const getExternalMetadataDetails = (externalMetadata) => {
              if (!externalMetadata) return "";

              const getPlatformLink = (platform, id) => {
                const platformLinks = {
                  deezer: `https://www.deezer.com/track/${id}`,
                  spotify: `https://open.spotify.com/track/${id}`,
                  apple: `https://music.apple.com/us/album/${id}`,
                  youtube: `https://www.youtube.com/watch?v=${id}`,
                  soundcloud: `https://soundcloud.com/${id}`,
                };
                return platformLinks[platform.toLowerCase()] || "#";
              };

              const getArtistLink = (platform, artist) => {
                const platformArtistLinks = {
                  spotify: `https://open.spotify.com/artist/${artist.id}`,
                  deezer: `https://www.deezer.com/artist/${artist.id}`,
                  apple: `https://music.apple.com/us/artist/${artist.id}`,
                  youtube: `https://www.youtube.com/channel/${artist.id}`,
                  soundcloud: `https://soundcloud.com/${artist.id}`,
                };
                return platformArtistLinks[platform.toLowerCase()] || "#";
              };

              const getAlbumLink = (platform, albumId) => {
                const platformAlbumLinks = {
                  spotify: `https://open.spotify.com/album/${albumId}`,
                  deezer: `https://www.deezer.com/album/${albumId}`,
                  apple: `https://music.apple.com/us/album/${albumId}`,
                  youtube: `https://www.youtube.com/playlist?list=${albumId}`,
                  soundcloud: `https://soundcloud.com/albums/${albumId}`,
                };
                return platformAlbumLinks[platform.toLowerCase()] || "#";
              };

              return Object.entries(externalMetadata)
                .map(([platform, metadata]) => {
                  const platformName =
                    platform.charAt(0).toUpperCase() + platform.slice(1);

                  return `
                      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e1e1e1; border-radius: 8px;">
                        <div style="margin-bottom: 10px;">
                          <span style="font-weight: 600; color: #333;">
                            ${platformName} Track:
                          </span>
                          <a href="${getPlatformLink(
                            platform,
                            metadata?.track?.id || metadata?.vid
                          )}" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             style="color: #2563eb; text-decoration: underline;">
                            ${metadata?.track?.name || platformName || "N/A"}
                          </a>
                        </div>
              
                        <div style="margin-bottom: 10px;">
                          <span style="font-weight: 600; color: #333;">
                            ${platformName} Artists:
                          </span>
                          ${
                            metadata?.artists
                              ?.map(
                                (artist) => `
                                <a href="${getArtistLink(platform, artist)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   style="color: #2563eb; text-decoration: underline;">
                                  ${artist.name.trim()}</a>`
                              )
                              .join(", ") || "N/A"
                          }
                        </div>
              
                        <div>
                          <span style="font-weight: 600; color: #333;">
                            ${platformName} Album:
                          </span>
                          ${
                            metadata?.album?.id
                              ? `<a href="${getAlbumLink(
                                  platform,
                                  metadata?.album?.id
                                )}" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             style="color: #2563eb; text-decoration: underline;">
                            ${metadata?.album?.name}
                          </a>`
                              : "N/A"
                          }
                        </div>
                      </div>
                    `;
                })
                .join("");
            };

            return `
              <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
                <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">${title}</h4>
                <p><b style="color: #333;">Title:</b> ${
                  part?.title || "N/A"
                }</p>
                <p><b style="color: #333;">Type:</b> ${part?.type || "N/A"}</p>
                <p><b style="color: #333;">Artists:</b> ${
                  artistNames.map((artist) => `${artist}`).join(", ") || "N/A"
                }</p>
                <p><b style="color: #333;">Album:</b> ${
                  part?.album?.name || "N/A"
                }</p>
                <p><b style="color: #333;">Label:</b> ${
                  part?.label || "N/A"
                }</p>
                <p><b style="color: #333;">Release Date:</b> ${
                  part?.release_date || "N/A"
                }</p>
                <p style='margin: 10px 0;'>
                  <b style="color: #333;">Score:</b> 
                  <span style="background-color: ${
                    part?.score >= 0 && part?.score <= 40
                      ? "green"
                      : part?.score > 40 && part?.score <= 60
                      ? "orange"
                      : "red"
                  }; color: ${
              part?.score > 40 && part?.score <= 60 ? "#000" : "#fff"
            }; padding: 5px; border-radius: 5px;">
                    ${part?.score || "N/A"}
                  </span>
                </p>

                <p><b style="color: #333;">Duration (ms):</b> ${
                  part?.duration_ms || "N/A"
                }</p>
                <p><b style="color: #333;">Play Offset (ms):</b> ${
                  part?.play_offset_ms || "N/A"
                }</p>
                <p><b style="color: #333;">Sample End Time (ms):</b> ${
                  part?.sample_end_time_offset_ms || "N/A"
                }</p>
                <p><b style="color: #333;">Sample Begin Time (ms):</b> ${
                  part?.sample_begin_time_offset_ms || "N/A"
                }</p>
                <p><b style="color: #333;">Genres:</b> ${
                  part?.genres?.map((genre) => genre.name).join(", ") || "N/A"
                }</p>
                <p><b style="color: #333;">Language:</b> ${
                  part?.language || "N/A"
                }</p>
                ${
                  part?.langs
                    ? `<p><b style="color: #333;">Languages:</b> ${part?.langs
                        .map((lang) => `${lang.name} (${lang.code})`)
                        .join(", ")}</p>`
                    : ""
                }
              </div>
              ${getExternalMetadataDetails(part?.external_metadata)}
            `;
          };

          const externalMetadataDetails = (part, platform) => {
            const platformMetadata =
              part?.external_metadata?.[platform.toLowerCase()]?.track;
            const platformLink =
              part?.external_metadata?.[platform.toLowerCase()]?.track?.link;

            if (platformMetadata && platformLink) {
              return `
                <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
                  <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">${platform} Metadata</h4>
                  <p><b style="color: #333;">Track Name:</b> ${
                    platformMetadata.name || "N/A"
                  }</p>
                  <p><b style="color: #333;">Track Link:</b> <a href="${platformLink}" target="_blank" style="color: blue; text-decoration: underline;">Listen on ${platform}</a></p>
                </div>
              `;
            } else {
              return "";
            }
          };

          // const externalMetadataDetails = (part, platform) => {
          //   const platformMetadata =
          //     part?.external_metadata?.[platform.toLowerCase()]?.track;

          //   if (platformMetadata) {
          //     // Define the platform's URL template
          //     const platformLinks = {
          //       deezer: `https://www.deezer.com/track/${platformMetadata.id}`,
          //       spotify: `https://open.spotify.com/track/${platformMetadata.id}`,
          //       apple: `https://music.apple.com/us/album/${platformMetadata.id}`,
          //       youtube: `https://www.youtube.com/watch?v=${platformMetadata.id}`,
          //       soundcloud: `https://soundcloud.com/${platformMetadata.id}`,
          //     };

          //     // Return the metadata with clickable link for the track ID
          //     return `
          //       <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
          //         <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">${platform} Metadata</h4>
          //         <p><b style="color: #333;">Track Name:</b> ${
          //           platformMetadata.name || "N/A"
          //         }</p>
          //         <p><b style="color: #333;">Track ID:</b> <a href="${
          //           platformLinks[platform.toLowerCase()] || "#"
          //         }" target="_blank" style="color: blue; text-decoration: underline;">${
          //       platformMetadata.id || "N/A"
          //     }</a></p>
          //       </div>
          //     `;
          //   } else {
          //     return "";
          //   }
          // };

          // console.log(data);
          const durationText = data.data.duration
            ? (() => {
                const totalSeconds = Math.floor(data.data.duration);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                return `${hours > 0 ? `${hours} hrs ` : ""}${
                  minutes > 0
                    ? `${minutes < 10 ? 0 : ""}${minutes} minute${
                        minutes === 1 ? "" : "s"
                      } `
                    : ""
                }${seconds < 10 ? 0 : ""}${seconds} second${
                  seconds === 1 ? "" : "s"
                }`;
              })()
            : "N/A";

          const totalDurationHtml = `<p><b style="color: #333;">Total Duration:</b> ${durationText}</p>`;

          const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
              <h4 style="color: #4CAF50; font-size: 20px; margin-bottom: 10px;">Order Details</h4>
              <p><b style="color: #333;">Order ID:</b> ${
                data.data.orderId || "N/A"
              }</p>
              ${totalDurationHtml}
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
              ${formatDetails(
                data.data.firstPart || data.data.data.firstPart,
                "First Part Details"
              )}
              ${formatDetails(
                data.data.middlePart || data.data.data.middlePart,
                "Middle Part Details"
              )}
              ${formatDetails(
                data.data.lastPart || data.data.data.lastPart,
                "Last Part Details"
              )}
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

  const processUrl = (url) =>
    url.startsWith("https://") ? url : `https://${url}`;

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
                                    href={processUrl(artist.appleArtist)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Apple Music
                                  </a>
                                )}
                                {artist.facebookUrl && (
                                  <a
                                    href={processUrl(artist.facebookUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Facebook
                                  </a>
                                )}
                                {artist.instagramUrl && (
                                  <a
                                    href={processUrl(artist.instagramUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Instagram
                                  </a>
                                )}
                                {artist.spotifyUrl && (
                                  <a
                                    href={processUrl(artist.spotifyUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 px-2"
                                  >
                                    Spotify
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
                  ) : key === "artwork" ? (
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
