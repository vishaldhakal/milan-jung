import React, { useEffect, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { Link, NavLink, useLocation } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const SideBar = ({ setNavbar, navbar, logo, setFreeBook }) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);

  let active =
    "inline-block text-sm p-3 truncate text-slate-200 transition duration-300 cursor-pointer";
  let inActive =
    "inline-block text-sm p-3 truncate text-white hover:text-slate-200 transition duration-300 cursor-pointer";

  let subItemActive =
    "block cursor-default h-8 my-0.5 font-medium transition duration-200 text-slate-200";
  let subItemInActive =
    "block cursor-pointer h-8 my-0.5 font-medium transition duration-200 text-white";

  useEffect(() => {
    if (
      (location?.pathname === "/civicengagement&initiative/pitch_competition" ||
        location?.pathname ===
          "/civicengagement&initiative/pitch_competition" ||
        location?.pathname ===
          "/civicengagement&initiative/youth_impact_summit") &&
      navbar === true
    ) {
      setShow(true);
    }
  }, [location, navbar]);

  const getSocialMedia = (signal) => {
    axiosInstance
      .get("/cms/find-us-list/", { signal })
      .then((res) => setSocialMedia(res?.data[0]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getSocialMedia(signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`z-40	h-full w-60 shadow-md bg-normaldark opacity-90 top-0 xl:w-0 overflow-y-auto overflow-x-hidden fixed transition-all duration-500 pb-4 shrink-0 ease-in-out
      ${navbar ? "left-0" : "left-[-240px]"} 
      `}
      >
        <Link to="/" className="mt-4 mb-2 flex flex-col items-center">
          <img
            alt="Logo"
            src={logo}
            className="shrink-0 rounded-full w-[120px] h-[120px] object-cover"
          />
          <p className="text-center text-lg font-semibold text-slate-50">
            <span>Milan Katuwal</span>
          </p>
        </Link>
        <span className="flex items-center justify-center space-x-3">
          {socialMedia?.linkedin && (
            <a target="_blank" rel="noreferrer" href={socialMedia?.linkedin}>
              <AiFillLinkedin
                size={18}
                className="text-gray-300 hover:text-gray-50"
              />
            </a>
          )}

          {socialMedia?.twitter && (
            <a target="_blank" rel="noreferrer" href={socialMedia?.twitter}>
              <BsTwitter
                size={18}
                className="text-gray-300 hover:text-gray-50"
              />
            </a>
          )}
        </span>

        <ul className="grid gap-y-1 relative px-4 pt-5 xl:hidden font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            ARTICLES
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            NATIONAL PODCAST
          </NavLink>

          <div className="relative">
            <div
              onClick={() => setShow(!show)}
              className={`${
                location?.pathname ===
                  "/civicengagement&initiative/pitch_competition" ||
                location?.pathname ===
                  "/civicengagement&initiative/pitch_competition" ||
                location?.pathname ===
                  "/civicengagement&initiative/youth_impact_summit"
                  ? "text-slate-200"
                  : "text-white"
              } cursor-pointer transition flex items-center space-x-2 uppercase text-sm duration-200 p-3 hover:text-slate-200`}
            >
              <span>Civic Engagement</span>
              <BiChevronDown
                size={18}
                className={`transition-all duration-500 ${
                  show && "rotate-180"
                }`}
              />
            </div>
            <ul
              className={`shrink-0 transition-all duration-500 overflow-hidden pl-6 pr-3 ${
                show ? "h-[100px]" : "h-0 opacity-0"
              }`}
            >
              <NavLink
                to="civicengagement&initiative/pitch_competition"
                className={({ isActive }) =>
                  isActive ? subItemActive : subItemInActive
                }
              >
                Pitch Competition
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? subItemActive : subItemInActive
                }
              >
                Youth Conference
              </NavLink>
              <NavLink
                to="/civicengagement&initiative/youth_impact_summit"
                className={({ isActive }) =>
                  isActive ? subItemActive : subItemInActive
                }
              >
                Youth Impact Summit
              </NavLink>
            </ul>
          </div>

          <li
            className="text-sm p-3 truncate text-slate-50  transition duration-300 cursor-pointer"
            onClick={() => {
              setNavbar(false);
              setTimeout(() => setFreeBook(true), 400);
            }}
          >
            SCHOLARSHIPS
          </li>
          {localStorage.getItem("refresh_jung") && (
            <NavLink
              to="/admin-dashboard/profile"
              className={({ isActive }) => (isActive ? active : inActive)}
            >
              DASHBOARD
            </NavLink>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
