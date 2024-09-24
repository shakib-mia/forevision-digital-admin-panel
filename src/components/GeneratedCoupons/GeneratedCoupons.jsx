import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { backendUrl } from "../../constants";

const GeneratedCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const { store, couponInsertedId } = useContext(AppContext);
  //   console.log(couponInsertedId);

  useEffect(() => {
    const config = {
      headers: { token: store.token },
    };
    // console.log(couponInserted/Id);

    axios
      .get(backendUrl + "coupon-codes", config)
      .then(({ data }) => setCoupons(data));
  }, [couponInsertedId, store.token]);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Coupons Generated</p>
      </div>

      {/* <div className="flex "> */}
      <div className="w-full grid grid-cols-4 p-4 text-center font-medium text-interactive-light">
        <p>Coupon Code</p>
        <p>Discount</p>
        <p>Valid From</p>
        <p>Valid Till</p>
      </div>
      {/* </div> */}

      {coupons.map((item) => (
        <div className="grid grid-cols-4 p-4 text-center" key={item._id}>
          <p>{item.couponCode}</p>
          <p>{item.discountPercentage}%</p>
          <p>{item.validFrom}</p>
          <p>{item.validTill}</p>
        </div>
      ))}
    </div>
  );
};

export default GeneratedCoupons;
