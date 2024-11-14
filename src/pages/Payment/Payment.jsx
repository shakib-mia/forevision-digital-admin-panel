import React, { useContext } from "react";
import YearlyPlans from "../../components/YearlyPlans/YearlyPlans";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import RequestPayment from "../../components/RequestPayment/RequestPayment";
import GeneratedCoupons from "../../components/GeneratedCoupons/GeneratedCoupons";
import GenerateCouponCode from "../../components/GenerateCouponCode/GenerateCouponCode";
import RefundRequests from "../../components/RefundRequests/RefundRequests";
import { AppContext } from "../../contexts/AppContext";

const Payment = () => {
  const { store, setStore } = useContext(AppContext);
  const { role } = store;
  if (role === "admin" || role === "Finance Manager") {
    return (
      <div className="container">
        <div className="grid grid-cols-1 gap-4">
          <YearlyPlans />
          {/* <br /> */}
          {/* <br /> */}
          <PaymentHistory />
          <RequestPayment />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GenerateCouponCode />
            <GeneratedCoupons />
          </div>
          <RefundRequests />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center absolute top-0 left-0">
        <h1 className="text-heading-2-bold text-center">403 Forbidden</h1>
      </div>
    );
  }
};

export default Payment;
