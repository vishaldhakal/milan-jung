import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import axiosInstance from "./../../api/axiosInstance";
import { useEffect, useState } from "react";
import AnswerReadModal from "../../common/AnswerReadModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import SuccessModal from "../../common/SuccessModal";
import PageLoader from "./../../common/Loaders/PageLoader";
import { BsSearch, BsArrowDown, BsArrowUp } from "react-icons/bs";
import Pagination from "../../common/Pagination";

const Students = () => {
  const [studentList, setStudentList] = useState();
  const [readModal, setReadModal] = useState(false);
  const [readID, setReadID] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentButton, setCurrentButton] = useState(1);
  const [count, setCount] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState("");

  const getStudentList = () => {
    if (isActive === 0) {
      setOrder("");
    } else if (isActive === 1) {
      setOrder("name");
    } else {
      setOrder("-name");
    }
    searchValue && setCurrentButton(1);
    axiosInstance
      .get(
        `/cms/answer-list/?page=${currentButton}&search=${searchValue}&ordering=${order}`
      )
      .then((data) => {
        setStudentList(data?.data?.Results);
        console.log("Data", data?.data?.Results);
        setPrevPage(data?.data?.PreviousPage);
        setNextPage(data?.data?.NextPage);
        const { countItemsOnPage, TotalCount } = data?.data;
        setCount(Math.ceil(TotalCount / countItemsOnPage));
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudentList();
    // eslint-disable-next-line
  }, [searchValue, currentButton, isActive, order]);

  return (
    <>
      <DeleteAlertModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getAllData={getStudentList}
        url={`/cms/answer-delete/${deleteID}/`}
        setSuccessModal={setSuccessModal}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <AnswerReadModal
        setReadModal={setReadModal}
        readModal={readModal}
        readID={readID}
      />
      <div>
        <div className="text-xl m-4 text-normaldark font-semibold">
          Students List
        </div>
        <div className="flex items-center relative w-1/2 my-5 mx-10 searchBox">
          <input
            className="h-12 w-full px-4 text-gray-400 outline-none"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="absolute right-4 cursor-pointer">
            <BsSearch color="green" size={23} />
          </span>
        </div>
        <div className="bg-white mx-6 rounded shadow-md mb-2">
          <div className="overflow-x-auto">
            <table className="min-w-full table table-fixed">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    onClick={() => {
                      setIsActive(isActive === 2 ? 0 : isActive + 1);
                    }}
                    className={`${
                      isActive !== 0 && "bg-gray-200"
                    } text-base font-bold text-gray-500 px-3 py-4 text-left flex items-center cursor-pointer"`}
                  >
                    Full Name
                    <span className="ml-3 flex">
                      {isActive === 1 && (
                        <span className=" -mr-1 p-0">
                          <BsArrowUp />
                        </span>
                      )}
                      {isActive === 2 && (
                        <span className="-ml-0.5 p-0">
                          <BsArrowDown />
                        </span>
                      )}
                      {isActive === 0 && (
                        <>
                          <span className=" -mr-1 p-0">
                            <BsArrowUp />
                          </span>
                          <span className="-ml-0.5 p-0">
                            <BsArrowDown />
                          </span>
                        </>
                      )}
                    </span>
                  </th>

                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                  >
                    Phone Number
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
                {studentList?.map((allDetails) => {
                  const { question, answer, user_answer, id } = allDetails;

                  return user_answer?.map((user, index) => {
                    const { first_name, last_name, email, phone_number } = user;
                    return (
                      <tr key={index} className="border-b">
                        <td className="text-sm text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          {first_name} {last_name}
                        </td>
                        {/* <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          {address}
                        </td> */}

                        <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          {email}
                        </td>
                        <td className="text-left text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          {phone_number}
                        </td>
                        {/* <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          {grade}
                        </td> */}
                        <td className="text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                          <span className="flex">
                            <button className="mr-2">
                              <AiFillEye
                                size={30}
                                className="text-green hover:text-midgreen"
                                onClick={() => {
                                  setReadID(id);
                                  setReadModal(true);
                                }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteID(id);
                                setModalOpen(true);
                              }}
                              className="ml-2 text-red-400 hover:text-gray-600"
                            >
                              <RiDeleteBin6Line size={30} />
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loader && (
        <div className="h-[25vh] w-[80vw] flex items-center justify-center bg-white text-lg text-white">
          <PageLoader />
        </div>
      )}
      {studentList?.length === 0 && !loader && (
        <div className=" h-[25vh] w-[80vw] flex items-center justify-center  text-lg font-bold">
          NO DATA FOUND
        </div>
      )}
      {count > 1 && (
        <div className="flex justify-center my-3">
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            count={count}
            currentButton={currentButton}
            setCurrentButton={setCurrentButton}
          />
        </div>
      )}
    </>
  );
};
export default Students;
