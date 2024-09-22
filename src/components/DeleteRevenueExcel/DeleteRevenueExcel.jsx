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
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [date, setDate] = useState("");
  // console.log(store);
  useEffect(() => {
    axios
      .get(backendUrl + "platforms/all")
      .then(({ data }) => setPlatforms(data));
  }, [store.token]);

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

  // console.log(
  //   platforms.flatMap((item) => item.platforms).map((item) => item.cat_name)
  // );
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
          options={
            platforms
              ? platforms
                  .flatMap((item) => item.platforms)
                  .map((item) => item.cat_name)
              : []
          }
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
