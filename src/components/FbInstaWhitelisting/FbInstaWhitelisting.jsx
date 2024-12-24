import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import axios from "axios";
import Modal from "../Modal/Modal";

const FbInstaWhitelisting = () => {
  const [data, setData] = useState([]);
  const [detailsId, setDetailsId] = useState(-1);

  useEffect(() => {
    axios
      .get(backendUrl + "submit-form/fb-insta-whitelisting")
      .then(({ data }) => setData(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">
          Request for Facebook Instagram Whitelisting
        </p>
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
              className="text-center hover:bg-grey-light transition cursor-pointer"
              onClick={() => setDetailsId(id)}
            >
              <td className="py-2">
                {item.rfacebook_insta_whitelisting_uname}
              </td>
              <td className="py-2">
                {item.rfacebook_insta_whitelisting_uemail}
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
                      {item
                        .split("rfacebook_insta_whitelisting")[1]
                        ?.includes("_")
                        ? item
                            .split("rfacebook_insta_whitelisting_")[1]
                            .split("_")
                            .join(" ")
                        : item.split("rfacebook_insta_whitelisting_")[1]}
                    </th>
                    <td className="p-2">
                      {data[detailsId][item].includes("http") ? (
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
        </Modal>
      )}
    </div>
  );
};

export default FbInstaWhitelisting;
