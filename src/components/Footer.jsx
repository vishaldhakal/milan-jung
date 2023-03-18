import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "./api/axiosInstance";

const Footer = () => {
  const [socialMedia, setSocialMedia] = useState([]);

  const getSocailMedia = async () => {
    let data = await axiosInstance.get("/cms/find-us-list/");
    setSocialMedia(data?.data[0]);
  };

  useEffect(() => {
    getSocailMedia();
  }, []);
  return (
    <>
      <div className="py-4 sm:py-5 px-5 xl:px-10 flex items-center bg-normaldark">
        <div className="py-1.5 md:flex text-center w-full grid grid-cols-1 justify-between">
          <div className=" text-gray-300 hover:text-white cursor-pointer">
            2023 © Milan Katuwal. All Rights Reserved.
          </div>
          {(socialMedia?.youtube ||
            socialMedia?.facebook ||
            socialMedia?.twitter ||
            socialMedia?.tiktok ||
            socialMedia?.instagram ||
            socialMedia?.linkedin) && (
            <div className="flex items-center justify-center py-1.5">
              {!socialMedia?.youtube === "" && (
                <a target="_blank" rel="noreferrer" href={socialMedia?.youtube}>
                  <BsYoutube
                    className="mx-2 shadow-xl text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}

              {socialMedia?.facebook && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={socialMedia?.facebook}
                >
                  <FaFacebookF
                    className="mx-2 text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}

              {socialMedia?.twitter && (
                <a target="_blank" rel="noreferrer" href={socialMedia?.twitter}>
                  <BsTwitter
                    className="mx-2 text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}
              {socialMedia?.tiktok && (
                <a target="_blank" rel="noreferrer" href={socialMedia?.tiktok}>
                  <FaTiktok
                    className="mx-2 text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}

              {socialMedia?.instagram && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={socialMedia?.instagram}
                >
                  <AiFillInstagram
                    className="mx-2 text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}

              {socialMedia?.linkedin && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={socialMedia?.linkedin}
                >
                  <AiFillLinkedin
                    className="mx-2 text-gray-300 hover:text-gray-50"
                    size={22}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Footer;
