import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance, { axiosImageInstance } from "../api/axiosInstance";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

function EditYouTubeModal({
  editModalOpen,
  setEditModalOpen,
  youtubeID,
  getAllVideos,
}) {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [publish, setPublish] = useState();
  const [loader, setLoader] = useState(false);

  // const resetForm = () => {
  //   setTitle("");
  //   setLink("");
  //   setPublish(false);
  // };

  const submitHandler = (e) => {
    setLoader(true);
    const updatedLink = {
      title,
      live_link: link,
      is_publish: publish,
    };
    e.preventDefault();

    axiosInstance
      .patch(`/cms/video-update/${youtubeID}/`, updatedLink)
      .then((data) => {
        toast.success("Updated Successfully");
        getAllVideos();
        setEditModalOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.live_link[0]);
        setLoader(false);
      });
  };
  useEffect(() => {
    axiosInstance.get(`/cms/video-detail/${youtubeID}/`).then((data) => {
      const { title, live_link, is_publish } = data.data;
      setTitle(title);
      setLink(live_link);
      setPublish(is_publish);
    });
  }, [youtubeID]);
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
      <Transition appear show={editModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setEditModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="my-4 w-full max-w-[850px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit the details
                  </Dialog.Title>

                  <div className="mt-5">
                    <div className="w-full lg:flex lg:space-x-6 space-y-6 lg:space-y-0">
                      <div className="container flex justify-center">
                        <div className="bg-white rounded-lg shadow-md border flex flex-col py-5 h-auto w-full">
                          <div className="flex justify-between w-full px-10 border-b border-gray-300 pb-4 text-lg font-semibold uppercase  tracking-wide text-gray-700"></div>

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
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
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
                                    className="w-full lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md  px-3.5 py-1.5 focus:outline-none"
                                    type="text"
                                    placeholder="Enter YouTube Video Link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="flex mt-3 space-x-3 items-center justify-between py-4">
                                <span className="font-semibold text-gray-500">
                                  Is Video Posted?
                                </span>
                                <div className="w-full lg:w-3/4  cursor-pointer">
                                  <input
                                    onChange={(e) => setPublish(!publish)}
                                    checked={publish}
                                    type="checkbox"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center space-x-5 mt-6 text-white">
                                <div className="w-40">
                                  <button className="bg-darkgreen hover:bg-dark px-10 mx-2 py-2 rounded">
                                    {loader ? "Updating" : "Submit"}
                                  </button>
                                </div>
                                <div className="w-40">
                                  <button
                                    type="button"
                                    className="bg-darkgreen hover:bg-dark mx-2 px-10 py-2 rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center absolute top-0 right-4">
                    <button
                      onClick={() => setEditModalOpen(false)}
                      type="button"
                      className=" text-darkgreen "
                    >
                      <AiFillCloseCircle size={30} />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default EditYouTubeModal;
