// import React from 'react';
import { AiOutlineLogout } from "react-icons/ai";
// import DateInput from "../../components/DateInput/DateInput";
// import Arrow from "../../components/Arrow/Arrow";
// import DisbursePayment from "../../components/DisbursePayment/DisbursePayment";
// import { useState } from "react";
import GenerateCouponCode from "../../components/GenerateCouponCode/GenerateCouponCode";
import Header from "../../components/Header/Header";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import RequestPayment from "../../components/RequestPayment/RequestPayment";
import TopPerformer from "../../components/TopPerformer/TopPerformer";
import UploadAndActivity from "../../components/UploadAndActivity/UploadAndActivity";
import GeneratedCoupons from "../../components/GeneratedCoupons/GeneratedCoupons";
import Songs from "../../components/Songs/Songs";
import RefundRequests from "../../components/RefundRequests/RefundRequests";
import SongUpdateRequest from "../../components/SongUpdateRequest/SongUpdateRequest";
import RecordLabelRequests from "../../components/RecordLabelRequests/RecordLabelRequests";
import Kyc from "../../components/Kyc/Kyc";
import YearlyPlans from "../../components/YearlyPlans/YearlyPlans";
import SearchSongByISRC from "../../components/SearchSongByISRC/SearchSongByISRC";
import TakedownRequests from "../../components/TakedownRequests/TakedownRequests";
import CreateEmployee from "../../components/CreateEmployee/CreateEmployee";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Agreements from "../../components/Agreements/Agreements";
import RecordLabelFiles from "../../components/RecordLabelFiles/RecordLabelFiles";
// import { useContext } from "react";
// import { AppContext } from "../../contexts/AppContext";

const Home = () => {
  // const { showModal } = useContext(AppContext);
  const { store, setStore } = useContext(AppContext);
  // console.log(store);
  // const [role, setRole] = useState("");
  const { role } = store;
  const navigate = useNavigate();

  console.log(role);

  const handleLogout = () => {
    setStore({});

    navigate("/login");
  };

  return (
    <div className={`container relative`}>
      <button
        className="text-interactive-light-destructive absolute right-4 top-4 text-heading-6"
        onClick={handleLogout}
      >
        <AiOutlineLogout />
      </button>

      {role === "admin" && <Header />}

      {/* <div className="flex gap-4 mt-4">
        {(role === "User Manager" || role === "admin") && <TopPerformer />}

        {(role === "Content Manager" ||
          role === "User Manager" ||
          role === "admin") && <UploadAndActivity />}
      </div> */}
      {role === "admin" && (
        <div className="mt-4 flex gap-4">
          <TopPerformer />
          <UploadAndActivity />
        </div>
      )}

      {/* {(role === "Finance Manager" || role === "admin") && ( */}
      <>
        {role === "admin" && (
          <div className="flex my-4 gap-4">
            <RequestPayment />
            <PaymentHistory />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <GenerateCouponCode />
          <GeneratedCoupons />
        </div>
      </>
      {/* )} */}

      {/* {(role === "Content Manager" || role === "admin") && ( */}
      <div className="mt-4">
        <Songs />
      </div>
      {/* )} */}

      {/* {(role === "Content Manager" || role === "admin") && ( */}
      <div className="mt-4 flex gap-4">
        <div className="w-2/3">
          <SongUpdateRequest />
        </div>
        <div className="w-1/3">
          <RecordLabelRequests />
        </div>
      </div>
      {/* )} */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Kyc />
        <YearlyPlans />
      </div>

      {/* {(role === "Content Manager" || role === "admin") && ( */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <SearchSongByISRC />
        <TakedownRequests />
      </div>
      {/* )} */}

      {/* {(role === "Finance Manager" || role === "admin") && ( */}
      <div className="mt-4">
        <RefundRequests />
      </div>
      {/* )} */}

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Agreements />
        <RecordLabelFiles />
      </div>
      {/* )} */}

      {/* {role === "admin" && ( */}
      <div className="mb-24 mt-4 grid grid-cols-2 gap-4">
        <CreateEmployee />
        <EmployeeList />
      </div>
      {/* )} */}
    </div>
  );
};

export default Home;
