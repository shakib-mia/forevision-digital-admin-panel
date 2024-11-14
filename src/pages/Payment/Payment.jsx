import React from "react";
import YearlyPlans from "../../components/YearlyPlans/YearlyPlans";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import RequestPayment from "../../components/RequestPayment/RequestPayment";
import GeneratedCoupons from "../../components/GeneratedCoupons/GeneratedCoupons";
import GenerateCouponCode from "../../components/GenerateCouponCode/GenerateCouponCode";
import RefundRequests from "../../components/RefundRequests/RefundRequests";

const Payment = () => {
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
};

export default Payment;
