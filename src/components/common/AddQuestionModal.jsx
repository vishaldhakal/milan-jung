import { Fragment } from "react";
import { Transition } from "@headlessui/react";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axiosInstance from "../api/axiosInstance";

const AddQuestionModal = ({ setIsOpen, isOpen, getAllData }) => {
  const [question, setQuestion] = useState();
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    const addQuestion = {
      question: question,
    };
    axiosInstance
      .post("/cms/question-create/", JSON.stringify(addQuestion))
      .then((res) => {
        setLoader(false);
        setIsOpen(false);
        getAllData();
      })
      .catch((error) => {});
  };

  return (
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
              <form onSubmit={submitHandler}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this data ?
                  </Dialog.Title>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      placeholder="Add Question"
                      className="px-3 py-1.5 focus:text-gray-700 shadow-md border border-gray-200 h-10 w-full focus:border-lightgreen focus:outline-none"
                      type="text"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-midgreen px-4 py-2 text-sm font-medium text-white hover:bg-darkgreen focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-darkgreen focus-visible:ring-offset-2 mx-2"
                    >
                      {loader ? "Adding" : "Add"}
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
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddQuestionModal;
