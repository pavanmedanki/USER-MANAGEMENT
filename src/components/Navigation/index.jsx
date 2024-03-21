import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaCheck,
  FaBeer,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/about",
      name: "Cost Overview",
      icon: <FaUserAlt />,
    },
    {
      path: "/analytics",
      name: "Cost Analysis",
      icon: <FaRegChartBar />,
    },
    {
      path: "/comment",
      name: "Cost Optimization",
      icon: <FaCommentAlt />,
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div>
          <div
            className="top_section"
            style={{ justifyContent: "space-between" }}
          >
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Logo
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="aside_avatar">PM</div>
            <h3
              style={{
                display: isOpen ? "block" : "none",
                alignSelf: "center",
                color: "var(--hamberger-text)",
              }}
            >
              Pavan Medanki
            </h3>
          </div>
          {isOpen && (
            <div
              className="toggleView"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              <div className="flex my-2 ml-2">
                <span
                  // className={`theme dark  ${theme === "dark" ? "active" : ""}`}
                  // onClick={() => handleTheme("dark")}
                  // onKeyDown={() => handleTheme("dark")}
                  role="button"
                  tabIndex={-3}
                >
                  <FaCheck />
                  {/* {theme === "dark" && <FaCheck />}{" "} */}
                </span>
                <span
                  // className={`theme blue  ${theme === "blue" ? "active" : ""}`}
                  // onClick={() => handleTheme("blue")}
                  // onKeyDown={() => handleTheme("blue")}
                  role="button"
                  tabIndex={-4}
                >
                  <FaCheck />
                  {/* {theme === "blue" && <FaCheck />}{" "} */}
                </span>
                <span
                  // className={`theme light  ${
                  //   // theme === "light" ? "active" : ""
                  // }`}
                  // onClick={() => handleTheme("light")}
                  // onKeyDown={() => handleTheme("light")}
                  role="button"
                  tabIndex={-5}
                >
                  <FaCheck />
                  {/* {theme === "light" && <FaCheck />}{" "} */}
                </span>
              </div>
              <span
                className="logout"
                // onClick={() => handleLogout()}
                // onKeyDown={() => handleLogout()}
                role="button"
                tabIndex={-6}
                style={{ color: "var(--hamberger-text)" }}
              >
                <FaBeer size={28} className="pr-2" /> Logout
              </span>
            </div>
          )}
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
