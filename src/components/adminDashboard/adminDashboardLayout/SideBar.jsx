import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//Icons
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsImages, BsYoutube } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { SlSocialBehance } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { FcIdea } from "react-icons/fc";
import { TbBulb } from "react-icons/tb";
import {
  AiFillHome,
  AiOutlineFileAdd,
  AiOutlineMail,
  AiFillGift,
  AiOutlineUser,
} from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { RiQuestionAnswerLine, RiLockPasswordFill } from "react-icons/ri";

const SideBar = ({ isMenuOpen }) => {
  let sidebarItemss = [
    {
      title: "User",
      icon: <AiOutlineUser size={20} />,
      clicked: false,
      subItems: [
        {
          title: "Profile",
          icon: <CgProfile size={16} />,
          link: "/admin-dashboard/profile",
        },
        {
          title: "Change Password",
          icon: <RiLockPasswordFill size={16} />,
          link: "/admin-dashboard/change-password",
        },
      ],
    },
    {
      title: "CMS",
      icon: <AiFillHome size={20} />,
      clicked: false,
      subItems: [
        {
          title: "Slider Images",
          icon: <BsImages size={16} />,
          link: "/admin-dashboard/images",
        },
        {
          title: "Social Media",
          icon: <SlSocialBehance size={16} />,
          link: "/admin-dashboard/social",
        },
        {
          title: "About Me",
          icon: <IoMdContact size={16} />,
          link: "/admin-dashboard/about-us",
        },
        {
          title: "Contact Me",
          icon: <AiOutlineMail size={16} />,
          link: "/admin-dashboard/contact-us",
        },
        {
          title: "Entrepreneurship",
          icon: <TbBulb size={16} />,
          link: "/admin-dashboard/entrepreneurship",
        },
      ],
    },
    {
      title: "Blogs",
      icon: <MdOutlineArticle size={20} />,
      clicked: false,
      subItems: [
        {
          title: "Blog Posts",
          icon: <MdOutlineArticle size={16} />,
          link: "/admin-dashboard/blog-posts",
        },
        {
          title: "Add Blogs",
          icon: <AiOutlineFileAdd size={16} />,
          link: "/admin-dashboard/blogs-add",
        },
      ],
    },
    {
      title: "YouTube",
      icon: <BsYoutube size={20} />,
      clicked: false,
      subItems: [
        {
          title: "All Videos",
          icon: <MdOutlineArticle size={16} />,
          link: "/admin-dashboard/youtube",
        },
        {
          title: "Add Video",
          icon: <AiOutlineFileAdd size={16} />,
          link: "/admin-dashboard/add-video",
        },
      ],
    },
    {
      title: "Giveaway",
      icon: <AiFillGift size={20} />,
      clicked: false,
      subItems: [
        {
          title: "Students",
          icon: <FaUserFriends size={16} />,
          link: "/admin-dashboard/students",
        },
        {
          title: "Questions",
          icon: <RiQuestionAnswerLine size={16} />,
          link: "/admin-dashboard/questions",
        },
      ],
    },
  ];
  const [sidebarItems, setSideBarItems] = useState(sidebarItemss);
  //

  const handleClick = (title) => {
    if (isMenuOpen === false) {
      setSideBarItems((pre) =>
        pre.map((val) =>
          val.title === title ? { ...val, clicked: false } : val
        )
      );
    } else {
      setSideBarItems((pre) =>
        pre.map((val) =>
          val.title === title ? { ...val, clicked: !val.clicked } : val
        )
      );
    }
  };

  useEffect(() => {
    if (isMenuOpen === false) {
      setSideBarItems((pre) => pre.map((val) => ({ ...val, clicked: false })));
    }
  }, [isMenuOpen]);

  console.log(isMenuOpen);

  return (
    <aside
      className={`${
        isMenuOpen ? "w-40 md:w-60 " : "w-14"
      } bg-[#326051] shrink-0  text-white  py-2 pb-20 space-y-2
    overflow-hidden overflow-y-auto h-screen neeraj
    `}
      style={{ transition: "width 400ms ease-in-out" }}
    >
      {sidebarItems.map((item, index) => {
        let height = item?.subItems?.length;
        return item?.subItems?.length ? (
          <div className="m-1 " key={index}>
            <div
              className="relative shrink-0 font-semibold h-14 flex items-center rounded px-4 justify-between hover:bg-[#2c5547] cursor-pointer hover:delay-75 transition"
              onClick={() => {
                handleClick(item?.title);
              }}
            >
              <div className="flex items-center space-x-2 text-[#dbd3d8] ">
                <span
                  className={`${
                    !isMenuOpen && "pr-3 transition-all duration-1000"
                  } `}
                >
                  {item?.icon}
                </span>
                <span>{item?.title}</span>
              </div>
              <div className={`${!isMenuOpen && "hidden"}`}>
                {!item?.clicked ? <BiChevronRight /> : <BiChevronDown />}
              </div>
            </div>
            <div
              className={` flex flex-col overflow-hidden transition-all duration-500	 ease-in-out space-y-2`}
              style={{
                height: item?.clicked ? 40 * height + "px" : 0,
              }}
            >
              {item?.subItems.map((val, index) => {
                return (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? ` text-gray-200 text-md h-10 flex ${
                            isMenuOpen ? "pl-12" : "pl-6 mr-2"
                          }  items-center cursor-pointer`
                        : `text-[#a7acc5] text-md h-10 flex ${
                            isMenuOpen ? "pl-12" : "pl-6 mr-2"
                          } pl-12 items-center cursor-pointer`
                    }
                    to={val?.link}
                  >
                    <div className={`flex items-center space-x-2 `}>
                      <span>{val?.icon}</span>
                      <span>{val?.title}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? "flex   bg-gray-50  text-black py-1 rounded" : ""
            }
            to={item?.link}
          >
            <div className="relative h-14 flex items-center rounded-md px-4  hover:bg-[#23306a] cursor-pointer hover:delay-75 transition">
              <span className="text-[#dbd3d8]">{item?.icon}</span>
              <span className="text-md text-[#cfd2da] px-4">{item?.title}</span>
            </div>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default SideBar;
