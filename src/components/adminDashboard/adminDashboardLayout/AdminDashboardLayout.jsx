import React, { useEffect, useState } from "react";
import DashBoardRoute from "../../Routes/DashBoardRoute";
import SideBar from "./SideBar";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {}, []);
  function handleResize() {
    if (window.innerWidth < 900) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutHandler = () => {
    const postData = {
      refresh: localStorage?.removeItem("refresh_jung"),
      access: localStorage?.removeItem("access_jung"),
    };
    axiosInstance
      .post("/auth/logout/", postData)
      .then((res) => {
        localStorage.clear();
        window.location.href="/";
      })
      .catch((err) => {
        navigate("/");
      });
  };

  return (
    <>
      <div className="bg-[#326051] text-white text-xl text-center fixed h-12 z-20 top-0 left-0  items-center flex">
        <div className="w-screen flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 flex items-center bg-[#2c5547] min-w-[160px] md:min-w-[240px]">
              <NavLink to="/" className="justify-left flex">
                <span className="flex font-bold justify-center w-40 md:w-60 ">
                  Dashboard
                </span>
              </NavLink>
            </div>

            <button
              className="h-10 w-10 flex items-center justify-center"
              onClick={handleMenu}
            >
              <div>
                <div
                  className={`menuLine  ${
                    isMenuOpen && "-rotate-45  translate-y-1"
                  }`}
                ></div>
                <div
                  className={`menuLine  ${
                    isMenuOpen &&
                    "opacity-0 transform -translate-x-2 -translate-y-0.5"
                  }`}
                ></div>
                <div
                  className={`menuLine transform  ${
                    isMenuOpen && "rotate-45  -translate-y-2"
                  }`}
                ></div>
              </div>
            </button>
          </div>

          <div className=" flex items-center justify-between mr-10">
            <button className="mx-1 sm:mx-2 md:mx-4" onClick={logoutHandler}>
              <IoIosLogOut size={25} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex !overflow-y-hidden max-h-screen pb-10 pt-12">
        <SideBar isMenuOpen={isMenuOpen} />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out overflow-y-auto`}
        >
          <DashBoardRoute />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
