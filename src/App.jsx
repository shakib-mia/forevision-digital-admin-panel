// import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { AppContext } from "./contexts/AppContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestPaymentDetails from "./pages/RequestPaymentDetails/RequestPaymentDetails";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import axios from "axios";
import { backendUrl } from "./constants";
import SongDetails from "./pages/SongDetails/SongDetails";
import "sweetalert2/src/sweetalert2.scss";

// import RequestPaymentDetails from "./pages/RequestPaymentDetails/RequestPaymentDetails";
// import axios from 'axios';
// import pLimit from 'p-limit'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/request-payment-details/:id",
      element: <RequestPaymentDetails />,
    },

    {
      path: "/payment-details/:id",
      element: <PaymentDetails />,
    },
    {
      path: "/song/:id",
      element: <SongDetails />,
    },
  ]);

  const [couponInsertedId, setCouponInsertedId] = useState("");
  const [store, setStore] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);
  useEffect(() => {
    axios.get(backendUrl + "history").then(({ data }) => setHistory(data));
  }, []);

  useEffect(() => {
    axios
      .get(backendUrl + "admin/check-role", {
        headers: {
          token: store.token,
        },
      })
      .then(({ data }) => {
        // console.log(data.role);
        // setRole(data.role);
        localStorage.setItem("role", data.role);
        setStore({ ...store, role: data.role });
      });
  }, [store.token]);

  useEffect(() => {
    axios
      .get(backendUrl + "platforms/all")
      .then(({ data }) => setStore({ ...store, platforms: data }));
  }, [store.token]);

  useEffect(() => {
    if (store.token && location.pathname !== "/login") {
      const config = {
        headers: {
          token: store.token,
        },
      };
      axios
        .get(backendUrl + "token-time", config)
        // .then(({ data }) => setTokenDetails(data))
        .catch((err) => {
          // console.log(err.response);
          if (err.response.status === 401) {
            setToken("");
            sessionStorage.removeItem("token");
            toast.error("Token has expired", {
              position: "bottom-center",
            });
            navigate("/login");
          }
        });
      axios
        .get(backendUrl + "record-labels", config)
        .then(({ data }) => setRecordLabels(data));
    }
  }, [store.token]);

  return (
    <AppContext.Provider
      value={{
        store,
        setStore,
        couponInsertedId,
        setCouponInsertedId,
        showModal,
        setShowModal,
        history,
      }}
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default App;
