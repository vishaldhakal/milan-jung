import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const SocialMedia = () => {
  const [loader, setLoader] = useState(false);
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    twitter: "",
  });
  const [editId, setEditId] = useState(null);

  const { facebook, instagram, youtube, linkedin, tiktok, twitter } =
    socialMedia;

  const getSocailMedia = () => {
    axiosInstance
      .get("/cms/find-us-list/")
      ?.then((res) => {
        const { facebook, instagram, linkedin, tiktok, youtube, twitter, id } =
          res?.data[0];
        setSocialMedia({
          ...socialMedia,
          facebook,
          instagram,
          linkedin,
          youtube,
          tiktok,
          twitter,
        });
        setEditId(id);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getSocailMedia(signal);
    return () => {
      controller.abort();
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    axiosInstance
      .patch(`/cms/find-us-update/${editId}/`, { ...socialMedia })
      .then((res) => {
        toast.success("Sucessfully Updated");
        setLoader(false);
        getSocailMedia();
      })
      .catch((err) => {
        toast.error("Failed to update");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-4 ">
        <div className="text-xl m-4 text-normaldark font-semibold ">
          Social Media Links
        </div>
      </div>
      <div className="bg-white mx-6 rounded shadow-md mb-2 min-h-[70vh]">
        <form
          onSubmit={submitHandler}
          className="text-dark text-lg h-[500px] mx-4"
        >
          <div className="m-4 items-center">
            <div className="flex items-center">
              <BsLinkedin className="lg:mx-2 mt-2 shadow-xl" size={25} />
              <label className="inline-block mt-1 w-32 text-xl">
                Linkedin:
              </label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter Linkedin Profile Link"
                type="text"
                value={linkedin}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    linkedin: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="my-5 flex items-center">
              <FaFacebookF className="mx-2 mt-1 shadow-xl" size={25} />
              <label className="inline-block w-32 text-xl">Facebook:</label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter Facebook Profile Link"
                type="text"
                value={facebook}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    facebook: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="my-5 flex items-center">
              <BsTwitter className="mx-2 mt-1 shadow-xl" size={25} />
              <label className="inline-block w-32 text-xl">Twitter: </label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter Twitter Profile Link"
                type="text"
                value={twitter}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    twitter: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="my-5 flex items-center">
              <FaTiktok className="mx-2 mt-1 shadow-xl" size={25} />
              <label className="inline-block w-32 text-xl">Tiktok: </label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter TikTok Profile Link"
                type="text"
                value={tiktok}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    tiktok: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="my-5 flex items-center">
              <BsYoutube className="mx-2 mt-1 shadow-xl" size={25} />
              <label className="inline-block w-32 text-xl">YouTube: </label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter TikTok Profile Link"
                type="text"
                value={youtube}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    youtube: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="my-5 flex items-center">
              <AiFillInstagram className="mx-2 mt-1 shadow-xl" size={25} />
              <label className="inline-block w-32 text-xl">Instagram:</label>
              <input
                className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                placeholder="Enter Instagram Profile Link"
                type="text"
                value={instagram}
                onChange={(e) =>
                  setSocialMedia({
                    ...socialMedia,
                    instagram: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="w-1/2 flex justify-center">
              <button
                className="bg-darkgreen hover:bg-dark py-2 px-4 items-center mt-10 rounded text-white"
                type="submit"
              >
                {loader ? "Updating" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SocialMedia;
