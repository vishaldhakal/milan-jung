import { Fragment } from "react";
import { Transition } from "@headlessui/react";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { axiosImageInstance } from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { boolean } from "yup";

const AddImageModal = ({
  setIsOpen,
  isOpen,
  imageID,
  getAllData,
  setNoData,
}) => {
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const submitHandler = () => {
    let formData = new FormData();
    formData.append("id", imageID);
    firstImage && formData.append("image1", firstImage);
    secondImage && formData.append("image2", secondImage);
    thirdImage && formData.append("image3", thirdImage);

    if (!firstImage && !secondImage && !thirdImage) {
      setIsOpen(false);
    } else {
      setLoader(true);

      axiosImageInstance
        .patch(`/cms/image-update/${imageID}/`, formData)
        .then((res) => {
          toast.success("Updated sucessfully");
          getAllData();
          setLoader(false);
          setIsOpen(false);
          setNoData(false);
          setFirstImage(null);
          setSecondImage(null);
          setThirdImage(null);
        })
        .catch((error) => toast.error("Failed to update"));
    }
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Please upload all 3 times before submit
                  </Dialog.Title>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      placeholder="Add Question"
                      className="px-3 py-1.5 focus:text-gray-700 shadow-md border border-gray-200 h-10 w-full focus:border-lightgreen focus:outline-none"
                      type="file"
                      onChange={(e) => setFirstImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      placeholder="Add Question"
                      className="px-3 py-1.5 focus:text-gray-700 shadow-md border border-gray-200 h-10 w-full focus:border-lightgreen focus:outline-none"
                      type="file"
                      onChange={(e) => setSecondImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      placeholder="Add Question"
                      className="px-3 py-1.5 focus:text-gray-700 shadow-md border border-gray-200 h-10 w-full focus:border-lightgreen focus:outline-none"
                      type="file"
                      onChange={(e) => setThirdImage(e.target.files[0])}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-midgreen px-4 py-2 text-sm font-medium text-white hover:bg-darkgreen focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-darkgreen focus-visible:ring-offset-2 mx-2"
                      onClick={submitHandler}
                    >
                      {loader ? `Updating` : "Update"}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 mx-2"
                    >
                      Cancel
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
};

export default AddImageModal;
