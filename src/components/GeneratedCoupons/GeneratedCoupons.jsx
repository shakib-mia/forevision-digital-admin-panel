import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const GeneratedCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const { store, couponInsertedId } = useContext(AppContext);
  const [updated, setUpdated] = useState(false);
  //   console.log(couponInsertedId);
  const config = {
    headers: { token: store.token },
  };

  useEffect(() => {
    // console.log(couponInserted/Id);

    axios
      .get(backendUrl + "coupon-codes", config)
      .then(({ data }) => setCoupons(data));
  }, [couponInsertedId, store.token, updated]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading Swal
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while the deletion is in progress.",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Perform delete operation
        axios
          .delete(backendUrl + "coupon-codes/" + id, config)
          .then((data) => {
            if (data.data.deletedCount) {
              setUpdated(!updated);

              // Update Swal to success
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              // Handle failure case
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the file. Please try again.",
                icon: "error",
              });
            }
          })
          .catch(() => {
            // Handle error case
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting the file.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Coupons Generated</p>
      </div>

      {/* <div className="flex "> */}
      <div className="w-full grid grid-cols-5 p-4 text-center font-medium text-interactive-light">
        <p>Coupon Code</p>
        <p>Plan Name</p>
        <p>Discount</p>
        <p>Valid From</p>
        <p>Valid Till</p>
        <p></p>
      </div>
      {/* </div> */}

      {coupons.map((item) => (
        <div className="grid grid-cols-5 p-4 text-center" key={item._id}>
          <p>{item.couponCode}</p>
          <p>{item.plan}</p>
          <p>{item.discountPercentage}%</p>
          <p>{item.validFrom}</p>
          <div className="flex gap-4">
            <p>{item.validTill}</p>
            <div className="text-center">
              <RiDeleteBin6Line
                className="text-interactive-light-destructive mx-auto cursor-pointer"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneratedCoupons;
