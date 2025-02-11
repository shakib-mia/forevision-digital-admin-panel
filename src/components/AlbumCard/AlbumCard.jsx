import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import { MdCurrencyRupee } from "react-icons/md";
import * as XLSX from "xlsx";
import Dropdown from "../Dropdown/Dropdown";
import InputSongDetails from "../InputSongDetails/InputSongDetails";
import SentToStores from "../SentToStores/SentToStores";
import ReasonToHold from "../ReasonToHold/ReasonToHold";
import HandleTakedown from "../HandleTakedown/HandleTakedown";
import ReasonToReject from "../ReasonToReject/ReasonToReject";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";
import visualizeData from "../../utils/visualizeData";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";

const AlbumCard = ({ album }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [popupSong, setPopupSong] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Set Status");
  const [albumSelectedOption, setAlbumSelectedOption] = useState("Set Status");
  const [item, setItem] = useState({});
  const [checking, setChecking] = useState(false);
  const [popupIdx, setPopupIdx] = useState(-1);
  const { selectedPlatforms, userEmail, _id, songs, ...rest } = album;

  // console.log();
  // ;

  const options = [
    {
      value: "Sent to Stores",
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
    {
      value: "rejected",
      label: "Rejected",
      color: "text-interactive-light-destructive",
    },
    {
      value: "paid",
      label: "Mark As Paid",
      color: "text-interactive-light",
    },

    {
      value: "on-hold",
      label: "Hold",
      color: "text-grey-dark",
    },
  ];

  const closeModal = () => setPopupSong(null);

  // Function to download album data in Excel
  const downloadAlbumAsExcel = () => {
    // Transform data to fit Excel format
    const rows = album.songs.map((song) => {
      const artistDetails = song.artists
        .map((artist) => `${artist.name} (${artist.role})`)
        .join("\n\n");

      return {
        "Song Name": song.songName,
        ISRC: song.isrc,
        Genre: song.genre,
        Mood: song.mood,
        Language: song.language,
        Description: song.description,
        "Parental Advisory": song.parentalAdvisory ? "Yes" : "No",
        Instrumental: song.instrumental ? "Yes" : "No",
        "Caller Tune 1 (mm:ss)": `${song.startMinutes}:${song.startSeconds
          .toString()
          .padStart(2, "0")}`,
        "Caller Tune 2 (mm:ss)": `${song.startMinutes2}:${song.startSeconds2
          .toString()
          .padStart(2, "0")}`,
        "Artists & URLs": artistDetails,
        "Song URL": song.songUrl,
      };
    });

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Album Songs");

    // Export the workbook
    XLSX.writeFile(workbook, `${album.albumTitle}_Songs.xlsx`);
  };

  useEffect(() => {
    // console.log(selectedOption);
    if (selectedOption !== "Set Status") {
      item.status = selectedOption;
      const updated = { ...item };

      const handleSwal = (Component, title) => {
        let swalContent = document.createElement("div");
        ReactDOM.render(
          <Component
            platforms={item.selectedPlatforms}
            updated={updated}
            album={album}
            albumSelectedOption={albumSelectedOption}
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
      } else if (selectedOption === "Sent to Stores") {
        handleSwal(SentToStores, "Input Song details");
      } else if (selectedOption === "on-hold") {
        handleSwal(ReasonToHold, "Enter Reason");
      } else if (selectedOption === "paid") {
        handleSwal(HandlePaid, "Enter Transaction Id");
      } else if (selectedOption === "taken-down") {
        handleSwal(HandleTakedown, "Enter Reason for Taking Down");
      } else if (selectedOption === "copyright-infringed") {
        updated.status = "Copyright infringed";
        const { ...updatedData } = updated;
        updatedData.status = "Copyright infringed";

        axios
          .put(`${backendUrl}songs/${album._id}`, album, config)
          .then(({ data }) => {
            if (data.acknowledged) {
              axios
                .post(backendUrl + "send-song-status", updatedData)
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

  useEffect(() => {
    if (albumSelectedOption !== "Set Status") {
      item.status = albumSelectedOption;
      const updated = { ...item };

      const handleSwal = (Component, title) => {
        // console.log(album);
        let swalContent = document.createElement("div");
        ReactDOM.render(
          <Component
            platforms={item.selectedPlatforms}
            updated={updated}
            album={album}
            albumSelectedOption={albumSelectedOption}
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
            setAlbumSelectedOption("Set Status");
          }
        });
      };

      // console.log(albumSelectedOption);

      if (albumSelectedOption === "streaming") {
        handleSwal(InputSongDetails, "Input Song details");
      } else if (albumSelectedOption === "Sent to Stores") {
        handleSwal(SentToStores, "Input Song details");
      } else if (albumSelectedOption === "on-hold") {
        handleSwal(ReasonToHold, "Enter Reason");
      } else if (albumSelectedOption === "paid") {
        handleSwal(HandlePaid, "Enter Transaction Id");
      } else if (albumSelectedOption === "taken-down") {
        handleSwal(HandleTakedown, "Enter Reason for Taking Down");
      } else if (albumSelectedOption === "copyright-infringed") {
        updated.status = "Copyright infringed";
        const { ...updatedData } = updated;
        updatedData.status = "Copyright infringed";

        axios
          .put(`${backendUrl}songs/${album._id}`, album, config)
          .then(({ data }) => {
            if (data.acknowledged) {
              axios
                .post(backendUrl + "send-song-status", updatedData)
                .then(({ data }) => {
                  if (data.acknowledged) {
                    Swal.close();
                  }
                });
            }
          });
      } else if (albumSelectedOption === "rejected") {
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

      // console.log(albumSelectedOption);
    }
  }, [albumSelectedOption]);

  const checkAudioFile = (popupIdx, orderId) => {
    // console.log(popupIdx, orderId);
    setChecking(true);
    axios
      .get(backendUrl + `check-audio-file/${orderId}/${popupIdx}`)
      .then(({ data }) => visualizeData(data))
      .finally(() => setChecking(false));
  };

  return (
    <div className="p-4 bg-white">
      {/* Album Header */}
      <div className="flex items-center gap-4">
        <div className="w-64 h-6w-64 relative group rounded-lg overflow-hidden">
          <a
            href={album.artWork}
            target="_blank"
            rel="noreferrer"
            className="relative"
          >
            {/* <span className="inline-flex justify-center items-center text-white text-heading-2 w-full h-full bg-black-primary bg-opacity-20 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition">
              <LuArrowUpRightFromCircle />
            </span> */}
            <img
              src={album.artwork}
              alt={album.albumTitle}
              className="w-full h-full object-cover"
            />
          </a>
        </div>
        <div className="flex-1">
          <h2 className="text-heading-5-bold text-primary">
            {album.albumTitle}
          </h2>
          {/* <p className="text-sm text-grey-dark">Type: {album.albumType}</p>
          <p className="text-sm text-grey-dark">UPC: {album.UPC}</p>
          <p className="text-sm text-success">
            Platforms: {album?.selectedPlatforms?.length}
          </p>

          <p className="text-sm text-success">Order ID: {album?.orderId}</p>
          <p className="text-sm text-success">
            Payment ID: {album?.payment_id}
          </p> */}

          {Object.entries(rest).map(([key, value]) => (
            <p>
              {camelCaseToNormalText(key)}: {value}
            </p>
          ))}

          <p className="text-sm text-success">
            Platforms: {album?.selectedPlatforms?.join(", ")}
          </p>

          <div className="text-lg font-bold text-secondary">
            <MdCurrencyRupee className="inline-block" />
            {(album.price / 100).toFixed(2)}
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={downloadAlbumAsExcel}
              className="px-4 py-2 text-white bg-warning hover:bg-warning-light hover:text-black transition rounded-md flex items-center gap-1"
            >
              <aside>Download Album as Excel</aside> <IoMdDownload />
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
            >
              {collapsed ? "Show Songs" : "Hide Songs"}
            </button>

            <div className="w-1/2">
              <Dropdown
                options={options}
                selected={
                  album.price === 99900 ? albumSelectedOption : selectedOption
                }
                onSelectedChange={
                  album.price === 99900
                    ? setAlbumSelectedOption
                    : setAlbumSelectedOption
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download Excel Button */}

      {/* Toggle Songs */}
      <div className="mt-4">
        {/* Song List */}
        {!collapsed && (
          <div className="mt-4 border-t pt-4 space-y-2">
            {album.songs.map((song, index) => (
              <div key={index} className="bg-grey-light p-4 rounded">
                <h3 className="text-heading-6-bold text-interactive-light">
                  {song.songName}{" "}
                  <span className="text-paragraph-2">({song.status})</span>
                </h3>
                <p className="text-sm text-grey">Genre: {song.genre}</p>
                <p className="text-sm text-grey">Mood: {song.mood}</p>
                <button
                  onClick={() => {
                    setPopupSong(song);
                    setItem(song);
                    setPopupIdx(index);
                  }}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  View Full Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {popupSong && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
          id="album-details-modal"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-grey-light rounded-full w-8 h-8 flex items-center justify-center hover:bg-grey-dark"
            >
              ✕
            </button>
            <h3 className="text-heading-5-bold text-primary">
              {popupSong.songName || "N/A"}
            </h3>
            <p className="text-sm text-grey">ISRC: {popupSong.isrc || "N/A"}</p>
            <p className="text-sm text-grey">
              Genre: {popupSong.genre || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Sub-Genre: {popupSong.subGenre || "N/A"}
            </p>
            <p className="text-sm text-grey">Mood: {popupSong.mood || "N/A"}</p>
            <p className="text-sm text-grey">
              Language: {popupSong.language || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Description: {popupSong.description || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Release Date: {popupSong.releaseDate || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Live Date: {popupSong.liveDate || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Status: {popupSong.status || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Parental Advisory: {popupSong.parentalAdvisory ? "Yes" : "No"}
            </p>
            <p className="text-sm text-grey">
              Instrumental: {popupSong.instrumental ? "Yes" : "No"}
            </p>
            <p className="text-sm text-grey">
              Reason: {popupSong.reason || "N/A"}
            </p>
            <p className="text-sm text-grey">
              User Email: {popupSong.userEmail || "N/A"}
            </p>
            <p className="text-sm text-grey">
              Go Live Time: {popupSong.time || "N/A"}
            </p>

            <h4 className="mt-4 text-heading-6-bold text-primary">Artists:</h4>
            <ul className="text-sm text-grey list-disc list-inside">
              {popupSong.artists?.length
                ? popupSong.artists.map((artist, index) => (
                    <li key={index}>
                      {artist.name} ({artist.role})
                    </li>
                  ))
                : "No artists available"}
            </ul>

            <div className="flex gap-2 items-center">
              <audio controls className="my-4 w-full">
                <source src={popupSong.songUrl || ""} type="audio/mp3" />
                Your browser does not support the audio tag.
              </audio>

              <Button
                disabled={checking}
                onClick={() => checkAudioFile(popupIdx, album?.orderId)}
              >
                {checking
                  ? "Checking..."
                  : // : tableData.checked
                    // ? "Already Checked"
                    "Check Audio File"}
              </Button>
            </div>

            <Dropdown
              options={options}
              selected={selectedOption}
              onSelectedChange={setSelectedOption}
              setPopupSong={setPopupSong}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
