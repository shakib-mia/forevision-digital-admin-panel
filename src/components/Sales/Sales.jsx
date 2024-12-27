import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { backendUrl } from "../../constants";

const Sales = () => {
  const [data, setData] = useState([]);
  const [monthlyCount, setMonthlyCount] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "plans/monthly-sales")
      .then(({ data }) => setData(data));

    axios
      .get(backendUrl + "plans/monthly-sales-by-count")
      .then(({ data }) => setMonthlyCount(data));
  }, []);

  return (
    <>
      <h3 className="text-heading-3-bold text-center mb-4 text-grey-dark">
        Monthly Revenue
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ForevisionSocial" stackId="a" fill="#8884d8" />
          <Bar dataKey="ForevisionCRBTPlus" stackId="a" fill="#82ca9d" />
          <Bar dataKey="ForevisionPro" stackId="a" fill="#ffc658" />
          <Bar dataKey="ForevisionCRBT" stackId="a" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="text-heading-3-bold text-center mt-10 mb-4 text-grey-dark">
        Monthly Sales
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyCount}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ForevisionSocial" fill="#8884d8" />
          <Bar dataKey="ForevisionCRBTPlus" fill="#82ca9d" />
          <Bar dataKey="ForevisionPro" fill="#ffc658" />
          <Bar dataKey="ForevisionCRBT" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Sales;
