import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance, { axiosImageInstance } from "../api/axiosInstance";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

function QuestionEditModal({ editModal, setEditModal, editID, getAllData }) {
  const [question, setQuestion] = useState();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setQuestion("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let dataCheck = false;

    if (!question) {
      setErrors((errors) => ({
        ...errors,
        question: "Please fill question field",
      }));
      dataCheck = true;
    }
    if (question.length > 1000) {
      setErrors((errors) => ({
        ...errors,
        length: "Questions must not be more than 1000 characters!",
      }));
      dataCheck = true;
    }

    if (dataCheck) return;

    setLoader(true);
    const udpatedQuestion = {
      question,
    };

    axiosInstance
      .patch(`/cms/question-update/${editID}/`, udpatedQuestion)
      .then((data) => {
        getAllData();
        setEditModal(false);
        toast.success("Sucessfully updated");
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Failed to update");
        setLoader(false);
      });
  };
  useEffect(() => {
    axiosInstance.get(`/cms/question-detail/${editID}/`).then((data) => {
      const { question } = data?.data;
      setQuestion(question);
    });
  }, [editID]);
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
      <Transition appear show={editModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setEditModal(false)}
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
                <Dialog.Panel className=" w-full max-w-[850px] transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all relative">
                  <div className="mt-2">
                    <div className="w-full lg:flex lg:space-x-6 space-y-2 lg:space-y-0">
                      <div className="container flex justify-center">
                        <div className="bg-white rounded-lg shadow-md border flex flex-col py-5 h-auto w-full">
                          <span className="text-lg font-medium leading-6 text-gray-900 mx-4">
                            Edit the details
                          </span>
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
                                  Question
                                </label>
                                <div className=" cursor-pointer">
                                  <input
                                    className="w-full lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md  px-3.5 py-1.5 focus:outline-none"
                                    type="text"
                                    placeholder="Enter the Video Title"
                                    value={question}
                                    onChange={(e) => {
                                      errors.question = "";
                                      errors.length = "";
                                      setQuestion(e.target.value);
                                    }}
                                  />
                                  <div className="text-red-500 text-sm">
                                    {errors.question}
                                    {errors.length}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-5 mt-6 text-white">
                                <div className="w-40">
                                  <button className="bg-darkgreen hover:bg-dark px-10 mx-2 py-2 rounded">
                                    {loader ? "Submitting" : "Submit"}
                                  </button>
                                </div>
                                <div className="w-40">
                                  <button
                                    type="button"
                                    onClick={() => setEditModal(false)}
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
                      onClick={() => setEditModal(false)}
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
export default QuestionEditModal;
