import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";

const PitchForEditorialPlaylist = () => {
  const [data, setData] = useState([]);
  const [detailsId, setDetailsId] = useState(-1);
  const [detailedData, setDetailedData] = useState({});

  useEffect(() => {
    axios
      .get(backendUrl + "submit-form/pitch-for-editorial-playlist")
      .then(({ data }) => setData(data));
  }, []);

  // console.log(data[detailsId]);
  useEffect(() => {
    if (detailsId > -1) {
      delete data[detailsId][""];
      setDetailedData(data[detailsId]);
    }
  }, [detailsId]);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Pitch For Editorial Playlist</p>
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
              className="text-center hover:bg-grey-light transition cursor-pointer"
              onClick={() => setDetailsId(id)}
            >
              <td className="py-2">{item.pitch_name}</td>
              <td className="py-2">{item.pitch_email}</td>
              {/* <td className="py-2">{item.pitch_isrc}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {detailsId > -1 && (
        <Modal handleClose={() => setDetailsId(-1)}>
          <table className="text-black border w-full divide-y border-grey rounded">
            {Object.keys(detailedData).map(
              (item) =>
                item !== "_id" && (
                  <tr className="divide-x">
                    <th className="capitalize py-2">
                      {(item.split("pitch_")[1]?.includes("_")
                        ? item.split("pitch_")[1].split("_").join(" ")
                        : item.split("pitch_")[1]
                      )?.includes("phone")
                        ? "Phone Number"
                        : item.split("pitch_")[1]?.includes("_")
                        ? item.split("pitch_")[1].split("_").join(" ")
                        : item.split("pitch_")[1]}
                    </th>
                    <td className="p-2">{detailedData[item]}</td>
                  </tr>
                )
            )}
          </table>
        </Modal>
      )}
    </div>
  );
};

export default PitchForEditorialPlaylist;
