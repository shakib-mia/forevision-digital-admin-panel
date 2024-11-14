import React, { useContext } from "react";
import Sales from "../../components/Sales/Sales";
import { AppContext } from "../../contexts/AppContext";

const SalesPage = () => {
  const { store, setStore } = useContext(AppContext);
  const { role } = store;
  if (role === "admin") {
    return (
      <div className="container">
        <Sales />
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

export default SalesPage;
