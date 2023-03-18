import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const AddVideo = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [live, setLive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setTitle("");
    setLink("");
    setLive("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({});

    let dataCHeck = false;
    if (!title) {
      setErrors((errors) => ({ ...errors, title: "Please Enter Video Title" }));
      dataCHeck = true;
    }
    if (!link) {
      setErrors((errors) => ({ ...errors, link: "Please Enter Video Link" }));
      dataCHeck = true;
    }

    if (dataCHeck) return;

    setLoader(true);

    const submitVideo = {
      title: title,
      live_link: link,
      is_publish: live,
    };

    axiosInstance
      .post("/cms/video-create/", JSON.stringify(submitVideo))
      .then((res) => {
        resetForm();
        setLoader(false);
        toast.success("Sucessfully Added");
      })
      .catch((error) => {
        toast.error("Failed to add");
        setLoader(false);
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
          Add Video
        </div>
      </div>
      <div className="bg-white mx-6 rounded shadow-md mb-2">
        <form
          onSubmit={submitHandler}
          className="flex flex-col px-10 py-4 space-y-4"
        >
          <div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="NAME"
                className="form-label inline-block mb-2 text-gray-500 font-semibold"
              >
                Video Title
              </label>
              <div className=" cursor-pointer">
                <input
                  className="w-full lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md  px-3.5 py-1.5 focus:outline-none"
                  type="text"
                  placeholder="Enter the Video Title"
                  value={title}
                  onChange={(e) => {
                    errors.title = "";
                    setTitle(e.target.value);
                  }}
                />
                {errors.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col my-8">
              <label
                htmlFor="NAME"
                className="form-label inline-block mb-2 text-gray-500 font-semibold"
              >
                Video Link
              </label>
              <div className=" mt-2 cursor-pointer">
                <input
                  onChange={(e) => {
                    errors.link = "";
                    setLink(e.target.value);
                  }}
                  className="w-full lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md  px-3.5 py-1.5 focus:outline-none"
                  type="text"
                  value={link}
                  placeholder="Enter YouTube Video Link"
                />
                {errors.link && (
                  <div className="text-red-500 text-sm">{errors.link}</div>
                )}{" "}
              </div>
            </div>

            <div className="flex mt-3 space-x-3 items-center justify-between py-4">
              <span className="font-semibold text-gray-500">
                Is Video Posted?
              </span>
              <div className="w-full lg:w-3/4  cursor-pointer">
                <input
                  onChange={(e) => setLive(!live)}
                  type="checkbox"
                  checked={live}
                />
              </div>
            </div>
            <div className="flex items-center space-x-5 mt-6 text-white">
              <div className="w-32 mx-5">
                <button
                  // disabled={loader ? true : false}
                  type="submit"
                  className="bg-darkgreen hover:bg-dark px-10 py-2 rounded"
                >
                  {loader ? "Submitting" : "Submit"}
                </button>
              </div>
              <div className="w-28 mx-5">
                <button className="bg-darkgreen hover:bg-dark px-10 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
