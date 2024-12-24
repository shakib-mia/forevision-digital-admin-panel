import React, { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.jpg";

const Navbar = () => {
  const { store, setStore } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setStore({});

    navigate("/login");
  };

  const listItems = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Songs",
      path: "/songs",
    },
    {
      text: "Payments",
      path: "/payments",
    },
    {
      text: "Sales",
      path: "/sales",
    },
    {
      text: "Forms",
      path: "/forms",
    },
  ];

  return (
    <nav className="bg-black text-white shadow-lg py-2 fixed top-0 left-0 w-screen z-50">
      <div className="container">
        <div className="flex justify-between">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>

          {store.role === "admin" && (
            <ul className="flex gap-10 items-center">
              {listItems.map(({ path, text }, key) => (
                <li>
                  <NavLink to={path}>{text}</NavLink>
                </li>
              ))}
            </ul>
          )}

          <button
            className="text-interactive-light-destructive text-heading-4"
            onClick={handleLogout}
          >
            <AiOutlineLogout />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
