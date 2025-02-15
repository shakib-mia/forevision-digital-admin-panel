import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import Select from "../Select/Select";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";

const DeleteRevenueExcel = () => {
  const { store } = useContext(AppContext);
  // const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [date, setDate] = useState("");

  const platforms = [
    {
      cat_name: "Apple Music",
    },
    {
      cat_name: "Resso",
    },
    {
      cat_name: "Spotify",
    },
    {
      cat_name: "Meta",
    },
    {
      cat_name: "TikTok",
    },
    {
      cat_name: "SnapChat",
    },
    {
      cat_name: "Amazon Music",
    },
    {
      cat_name: "AWA",
    },
    {
      cat_name: "IHeartRadio",
    },
    {
      cat_name: "jaxsta",
    },
    {
      cat_name: "kkbox",
    },
    {
      cat_name: "mixcloud",
    },
    {
      cat_name: "napster",
    },
    {
      cat_name: "netease",
    },
    {
      cat_name: "pandora",
    },
    {
      cat_name: "shazam",
    },
    {
      cat_name: "soundcloud",
    },
    {
      cat_name: "tidal",
    },
    {
      cat_name: "Triller",
    },
    {
      cat_name: "JioSaavn",
    },
    {
      cat_name: "Gaana",
    },
    {
      cat_name: "Hungama",
    },
    {
      cat_name: "Wynk Music",
    },
    {
      cat_name: "YouTube",
    },
    {
      cat_name: "YouTube New",
    },
    {
      cat_name: "BSNL",
    },
    {
      cat_name: "Airtel",
    },
    {
      cat_name: "Vi",
    },
    {
      cat_name: "JioTunes",
    },
    {
      cat_name: "Musixmatch",
    },
    {
      cat_name: "LyricFind",
    },
    {
      cat_name: "SIP",
    },
    {
      cat_name: "UK",
    },
  ];
  // console.log(store);
  // useEffect(() => {
  //   axios
  //     .get(backendUrl + "platforms/all")
  //     .then(({ data }) => setPlatforms(data));
  // }, [store.token]);

  const handleDeleteRevenue = (e) => {
    e.preventDefault();

    // console.log(selectedValue, date);
    axios
      .get(backendUrl + "delete-data/" + selectedPlatform + "/" + date)
      .then((res) => {
        if (res.data.acknowledge) {
          toast.success("Deleted Successfully");
        }
      });
  };

  // console.log(platforms.flatMap((item) => item.cat_name));
  // console.log(platforms);

  return (
    <div className="mt-6">
      <h6 className="font-medium text-grey-dark">Delete Revenue Excel</h6>

      <form
        className="mt-4 text-grey flex flex-col gap-3 justify-center"
        onSubmit={handleDeleteRevenue}
      >
        <Select
          placeholder="Select Platform Name"
          options={platforms ? platforms.flatMap((item) => item.cat_name) : []}
          selectedValue={selectedPlatform}
          song={true}
          setSelectedValue={setSelectedPlatform}
        />

        <InputField
          type="date"
          onChange={(e) =>
            setDate(e.target.value.split("-").slice(0, 2).join("-"))
          }
        />

        <Button
          type="submit"
          action={"destructive"}
          containerClassName="mx-auto"
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default DeleteRevenueExcel;
