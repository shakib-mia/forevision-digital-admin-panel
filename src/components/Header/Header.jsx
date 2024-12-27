// import React from 'react';
import totalSongs from "../../assets/icons/total-songs.jpg";
// import greenArrow from '../../assets/icons/green-arrow.svg';
import totalUsers from "../../assets/icons/total-users.jpg";
import totalRevenue from "../../assets/icons/total-revenue.png";
import dueRevenue from "../../assets/icons/due-revenue.jpg";
import HeaderData from "../HeaderData/HeaderData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../constants";
import { AppContext } from "../../contexts/AppContext";
import { FaMusic, FaUserCircle } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";

const Header = () => {
  const { store } = useContext(AppContext);
  const [data, setData] = useState({});
  const config = {
    headers: {
      token: store.token,
    },
  };

  useEffect(() => {
    axios
      .get(backendUrl + "dashboard", config)
      .then(({ data }) => setData(data));
  }, []);

  const headerData = [
    {
      heading: "Total Songs",
      icon: (
        <div className="w-14 h-14 rounded-full bg-interactive-light text-white flex justify-center items-center text-heading-6">
          <FaMusic />
        </div>
      ),
      count: data.isrcCount || 0,
      progress: "+300 this month",
      increased: true,
    },
    {
      heading: "Total Users",
      icon: (
        <div className="w-14 h-14 rounded-full bg-interactive-dark-destructive text-white flex justify-center items-center text-heading-6">
          <FaUserCircle />
        </div>
      ),
      count: data.usersCount || 0,
      progress: "-30 this month ",
      increased: false,
    },
    {
      count: data.finalRevenue?.toFixed(2) || 0,
      heading: "Total Revenue",
      icon: (
        <div className="w-14 h-14 rounded-full bg-interactive-light-confirmation text-white flex justify-center items-center text-heading-6">
          <LuIndianRupee />
        </div>
      ),
      progress: "+30,1245 this month ",
      increased: true,
    },
    {
      count: isNaN(
        (data.finalRevenue?.toFixed(2) - data.totalPaid?.toFixed(2))?.toFixed(2)
      )
        ? 0
        : (data.finalRevenue?.toFixed(2) - data.totalPaid?.toFixed(2))?.toFixed(
            2
          ) || 0,
      heading: "Due revenue",
      icon: (
        <div className="w-14 h-14 rounded-full bg-interactive-light text-white flex justify-center items-center text-heading-6">
          <LuIndianRupee />
        </div>
      ),
      progress: "-37580 this month ",
      increased: false,
    },
    {
      count: data.totalPaid?.toFixed(2) || 0,
      heading: "Total Disbursed",
      icon: (
        <div className="w-14 h-14 rounded-full bg-interactive-light-destructive text-white flex justify-center items-center text-heading-6">
          <LuIndianRupee />
        </div>
      ),
      progress: "-37580 this month ",
      increased: false,
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-[20px] custom-shadow">
      <div className="py-3 px-6">
        <h6 className="text-grey text-heading-6">Performance </h6>
      </div>

      <div className="p-10 grid grid-cols-5 text-grey border-y border-grey-light">
        {headerData.map((item, key) => (
          <HeaderData {...item} key={key} />
        ))}
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default Header;
