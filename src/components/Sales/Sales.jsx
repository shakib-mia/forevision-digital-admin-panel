import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     month: "2024-10",
//     ForevisionSocial: 0,
//     ForevisionCRBTPlus: 139800,
//     ForevisionPro: 0,
//     ForevisionCRBT: 0,
//   },
//   // Add more data here
// ];

const Sales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.forevisiondigital.in/plans/monthly-sales")
      .then(({ data }) => setData(data));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ForevisionSocial" stackId="a" fill="#8884d8" />
        <Bar dataKey="ForevisionCRBTPlus" stackId="a" fill="#82ca9d" />
        <Bar dataKey="ForevisionPro" stackId="a" fill="#ffc658" />
        <Bar dataKey="ForevisionCRBT" stackId="a" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Sales;
