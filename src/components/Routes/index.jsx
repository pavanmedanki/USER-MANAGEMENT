import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AlarmIcon,
  Collaboration,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FiLogOut,
  GiHamburgerMenu,
  ItsmIcon,
  LogoLightTheme,
  XplorerIcon,
} from "../../Assets/Icons";
import { Route, Routes } from "react-router-dom";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import AssetXplorer from "../AssetXplorer";
import ApplicationScorecard from "../Application";
import ITSM from "../ITSM/indx";

const json = [
  { icons: <ItsmIcon />, title: "ITSM", path: "/dashboard/user" },
  {
    icons: <AlarmIcon />,
    title: "Asset Xplorer",
    path: "/dashboard/user/assetXplorer",
  },
  {
    icons: <XplorerIcon />,
    title: "Application ScoreCard",
    path: "/dashboard/user/application",
  },
  {
    icons: <Collaboration />,
    title: "Collaboration",
    path: "/dashboard/user/collaboration",
  },
];

export const defaultAsideToggleObj = atom({
  key: "asideMenu",
  default: {
    value: false,
  },
});

const NavBar = ({ userRole, handleLogouts, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [theme, setTheme] = React.useState("blue");
  const isMenuOpen = useRecoilValue(defaultAsideToggleObj);
  const updateIsMenuOpen = useSetRecoilState(defaultAsideToggleObj);
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location?.pathname, "location");

  const toggle = () => setIsOpen(!isOpen);
  const handleItemClick = (path) => {
    setActiveItem(path);
    setIsOpen(false);
  };

  const handleTheme = (applyTheme) => {
    setTheme(applyTheme);
    localStorage.setItem("theme", applyTheme);
    document.documentElement.setAttribute("data-theme", applyTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
    handleLogouts();
    navigate("/");
  };

  const toggleLeftMenu = () => {
    updateIsMenuOpen({ value: !isMenuOpen?.value });
    setIsToggleOpen(false);
  };

  React.useEffect(() => {
    const ctheme = localStorage.getItem("theme") || theme;
    handleTheme(ctheme);
  });

  return (
    <div className="flex w-full h-full">
      <div
        style={{
          width: isOpen ? "250px" : "60px",
          position: "absolute",
          zIndex: isOpen ? "10000" : "9999",
          height: "100vh",
          backgroundColor: "var(--bg-color)",
          border: "1px solid var(--sidebar-border)",
        }}
        className="flex-initial"
      >
        <div
          className="top_section flex flex-col gap-2"
          style={{
            height: isToggleOpen ? "190px" : "100px",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            className="bars flex flex-row gap-5"
            onClick={() => toggleLeftMenu()}
            onKeyDown={() => toggleLeftMenu()}
          >
            <GiHamburgerMenu onClick={toggle} size={35} />

            <span
              style={{
                display: isOpen ? "block" : "none",
                alignSelf: "center",
                // width: "50px",
                color: "var(--hamberger-text)",
              }}
            >
              {/* <LogoLightTheme size={15} /> */}
              Logo
            </span>
          </div>

          {userRole && (
            <div className="flex flex-row gap-5">
              <div className="aside_avatar">
                {userRole?.firstname?.charAt(0)}
                {userRole?.lastname?.charAt(0)}
              </div>
              <h1
                style={{
                  display: isOpen ? "block" : "none",
                  alignSelf: "center",
                  color: "var(--hamberger-text)",
                }}
              >
                {userRole.firstname} {userRole.lastname}
              </h1>
              <span
                className="ml-auto mini cursor-pointer flex"
                style={{
                  alignSelf: "center",
                  color: "var(--hamberger-text)",
                  display: isOpen ? "block" : "none",
                }}
                onClick={() => setIsToggleOpen(!isToggleOpen)}
                onKeyDown={() => setIsToggleOpen(!isToggleOpen)}
                role="button"
                tabIndex={-2}
              >
                {isToggleOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
          )}
          {isMenuOpen?.value && isToggleOpen && (
            <div
              className="toggleView"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              <div className="flex my-2 ml-2">
                <span
                  className={`theme dark  ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleTheme("dark")}
                  onKeyDown={() => handleTheme("dark")}
                  role="button"
                  tabIndex={-3}
                >
                  {theme === "dark" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme blue  ${theme === "blue" ? "active" : ""}`}
                  onClick={() => handleTheme("blue")}
                  onKeyDown={() => handleTheme("blue")}
                  role="button"
                  tabIndex={-4}
                >
                  {theme === "blue" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme light  ${
                    theme === "light" ? "active" : ""
                  }`}
                  onClick={() => handleTheme("light")}
                  onKeyDown={() => handleTheme("light")}
                  role="button"
                  tabIndex={-5}
                >
                  {theme === "light" && <FaCheck />}{" "}
                </span>
              </div>
              <span
                className="logout"
                onClick={() => handleLogout()}
                onKeyDown={() => handleLogout()}
                role="button"
                tabIndex={-6}
                style={{ color: "var(--hamberger-text)" }}
              >
                <FiLogOut size={28} className="pr-2" /> Logout
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "var(--sidebar-bg-color)",
            display: "flex",
            flexDirection: "column",
            height: isToggleOpen ? "calc(100% - 190px)" : "calc(100% - 100px)",
          }}
        >
          {json.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
              onClick={() => handleItemClick(item.path)}
            >
              <div
                className="icon"
                style={{ display: "flex", alignItems: "center" }}
              >
                {item.icons}
              </div>
              <div
                style={{
                  display: isOpen ? "block" : "none",
                }}
                className="link_text"
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div
        style={{
          width: "calc(100% - 60px)",
          position: "fixed",
          marginLeft: "60px",
          height: "calc(100% - 100px)",
        }}
      >
        <div className="flex w-full h-full">{children}</div>
      </div>
      {/* </div> */}
      {/* <div style={{ width: "95%", position: "fixed", marginLeft: "5%" }}>
        <Routes>
          <Route path="/dashboard/user" element={<ITSM />} />
          <Route
            path="/dashboard/user/assetXplorer"
            element={<AssetXplorer />}
          />
          <Route
            path="/dashboard/user/application"
            element={<ApplicationScorecard />}
          />
          <Route
            path="/dashboard/user/collaboration"
            element={<Collaboration />}
          />
        </Routes>
      </div> */}
      {/* <div
        style={{
          width: isOpen ? "350px" : "60px",
          border: "1px solid var(--sidebar-border)",
        }}
        className="sidebar"
      >
        <div className="top_section flex flex-col gap-2">
          <div
            style={{ cursor: "pointer" }}
            className="bars flex flex-row gap-5"
            onClick={() => toggleLeftMenu()}
            onKeyDown={() => toggleLeftMenu()}
          >
            <GiHamburgerMenu onClick={toggle} size={35} />
            <h1
              style={{
                display: isOpen ? "block" : "none",
                alignSelf: "center",
              }}
              className="logo"
            >
              Logo
            </h1>
          </div>

          {userRole && (
            <div className="flex flex-row gap-5">
              <div className="aside_avatar">
                {userRole?.firstname?.charAt(0)}
                {userRole?.lastname?.charAt(0)}
              </div>
              <h1
                style={{
                  display: isOpen ? "block" : "none",
                  alignSelf: "center",
                  color: "var(--hamberger-text)",
                }}
              >
                {userRole.firstname} {userRole.lastname}
              </h1>
              <span
                className="ml-auto mini cursor-pointer flex"
                style={{ alignItems: "center", color: "var(--hamberger-text)" }}
                onClick={() => setIsToggleOpen(!isToggleOpen)}
                onKeyDown={() => setIsToggleOpen(!isToggleOpen)}
                role="button"
                tabIndex={-2}
              >
                {isToggleOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
          )}
          {isMenuOpen?.value && isToggleOpen && (
            <div
              className="toggleView"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              <div className="flex my-2 ml-2">
                <span
                  className={`theme dark  ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleTheme("dark")}
                  onKeyDown={() => handleTheme("dark")}
                  role="button"
                  tabIndex={-3}
                >
                  {theme === "dark" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme blue  ${theme === "blue" ? "active" : ""}`}
                  onClick={() => handleTheme("blue")}
                  onKeyDown={() => handleTheme("blue")}
                  role="button"
                  tabIndex={-4}
                >
                  {theme === "blue" && <FaCheck />}{" "}
                </span>
                <span
                  className={`theme light  ${
                    theme === "light" ? "active" : ""
                  }`}
                  onClick={() => handleTheme("light")}
                  onKeyDown={() => handleTheme("light")}
                  role="button"
                  tabIndex={-5}
                >
                  {theme === "light" && <FaCheck />}{" "}
                </span>
              </div>
              <span
                className="logout"
                onClick={() => handleLogout()}
                onKeyDown={() => handleLogout()}
                role="button"
                tabIndex={-6}
                style={{ color: "var(--hamberger-text)" }}
              >
                <FiLogOut size={28} className="pr-2" /> Logout
              </span>
            </div>
          )}
        </div>

        {json.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={() => handleItemClick(item.path)}
          >
            <div
              className="icon"
              style={{ display: "flex", alignItems: "center" }}
            >
              {item.icons}
            </div>
            <div
              style={{
                display: isOpen ? "block" : "none",
              }}
              className="link_text"
            >
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
      <div>
        <ITSM />
      </div> */}
    </div>
  );
};

export default NavBar;
