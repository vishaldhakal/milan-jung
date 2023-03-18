import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { FaTimesCircle } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";

export default function DeleteAlertModal({
  modalOpen,
  setModalOpen,
  getAllData,
  url,
  setSuccessModal,
}) {
  const [rotate, setRotate] = useState(false);

  const deleteHandler = () => {
    setRotate(true);
    axiosInstance
      .delete(url)
      .then((res) => {
        setRotate(false);
        setModalOpen(false);
        setSuccessModal(true);
        getAllData();
      })

      .catch((err) => {
        setRotate(false);
      });
  };

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalOpen(false)}
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
                    Are you sure you want to delete this data ?
                  </Dialog.Title>
                  <div className="mt-2 flex items-center justify-center">
                    <p
                      className={`${
                        rotate ? "animate-bounce" : "animate-none"
                      } text-red-500 transform py-3 text-5xl`}
                    >
                      <FaTimesCircle />
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={deleteHandler}
                    >
                      Delete
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
