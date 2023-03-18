import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AddQuestionModal from "../../common/AddQuestionModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import SuccessModal from "../../common/SuccessModal";
import PageLoader from "../../common/Loaders/PageLoader";
import { FiEdit } from "react-icons/fi";
import QuestionEditModal from "../../common/QuestionEditModal";
import { ToastContainer, toast } from "react-toastify";

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [dataLoader, setDataLoader] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editID, setEditID] = useState(null);

  const getAllQuestions = () => {
    axiosInstance
      .get("/cms/question-list/")
      .then((data) => {
        setAllQuestions(data.data);
        setDataLoader(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  const handleModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AddQuestionModal
        getAllData={getAllQuestions}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <DeleteAlertModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getAllData={getAllQuestions}
        url={`/cms/question-delete/${deleteId}/`}
        setSuccessModal={setSuccessModal}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      <QuestionEditModal
        editModal={editModal}
        setEditModal={setEditModal}
        editID={editID}
        getAllData={getAllQuestions}
      />
      <div>
        <div className="mt-4">
          <div className="text-xl m-4 text-normaldark font-semibold">
            Question List
          </div>
        </div>
        <div className="bg-white mx-6 rounded shadow-md mb-2">
          <div className="overflow-x-auto">
            <table className="min-w-full table table-fixed">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                  >
                    S.N.
                  </th>

                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                  >
                    Questions
                  </th>

                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-base">
                {allQuestions?.map((questions, index) => {
                  const { question, id } = questions;
                  return (
                    <tr className="bg-white border-b">
                      <td className="text-sm text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                        {`#${index + 1}`}
                      </td>
                      <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                        {question}
                      </td>
                      <td className="text-gray-500 font-light px-3 py-3 whitespace-nowrap">
                        <span className="flex">
                          <button
                            onClick={() => {
                              setEditID(id);
                              setEditModal(true);
                            }}
                            className="mr-2 text-emerald-600 hover:text-gray-600"
                          >
                            <FiEdit size={30} />
                          </button>
                          {/* <button
                            onClick={() => {
                              setModalOpen(true);
                              setDeleteId(id);
                            }}
                            className="ml-2 text-red-400 hover:text-gray-600"
                          >
                            <RiDeleteBin6Line size={30} />
                          </button> */}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {dataLoader && (
          <div className="h-[25vh] w-[80vw] flex items-center justify-center bg-white text-lg text-white">
            <PageLoader />
          </div>
        )}
        {allQuestions?.length === 0 && (
          <div className=" h-[25vh] w-[80vw] flex items-center justify-center  text-lg font-bold">
            NO DATA FOUND
          </div>
        )}
      </div>
    </>
  );
};
export default Questions;
