import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import SuccessModal from "../../common/SuccessModal";
import Pagination from "../../common/Pagination";
import MailRead from "../../common/MailRead";
import PageLoader from "../../common/Loaders/PageLoader";
import { BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [count, setCount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [readID, setReadID] = useState(null);
  const [readModal, setReadModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [sorting, setSorting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNextPage, setIsNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState("");

  const getContacts = async (signal) => {
    if (isActive === 0) {
      setOrder("");
    } else if (isActive === 1) {
      setOrder("name");
    } else {
      setOrder("-name");
    }
    try {
      searchValue && setCurrentButton(1);

      let data = await axiosInstance.get(
        `/cms/contact-me-list?search=${searchValue}&page=${currentButton}&ordering=${order}`,
        {
          signal,
        }
      );
      setPrevPage(data?.data?.PreviousPage);
      setNextPage(data?.data?.NextPage);

      setContacts(data?.data?.Results);
      const { countItemsOnPage, TotalCount } = data?.data;
      setCount(Math.ceil(TotalCount / countItemsOnPage));
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getContacts(signal);
    return () => {
      controller.abort();
    };
  }, [currentButton, searchValue, isActive, order, isNextPage]);
  return (
    <>
      <DeleteAlertModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getAllData={getContacts}
        url={`/cms/contact-me-delete/${deleteId}/`}
        setSuccessModal={setSuccessModal}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      <MailRead
        readModal={readModal}
        setReadModal={setReadModal}
        readID={readID}
      />

      <div className=" mt-4">
        <div className="text-xl m-4 text-normaldark font-semibold ">
          Contact Me
        </div>
      </div>
      <div
        // onSubmit={handleSearch}
        className="flex items-center relative w-1/2 my-5 mx-10 searchBox"
      >
        <input
          className="h-12 w-full px-4 text-gray-400 outline-none"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
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
                  } text-sm font-bold text-gray-500 px-3 py-4 text-left flex items-center cursor-pointer`}
                >
                  Name
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
                  className="text-sm font-bold  text-gray-500 px-3 py-4 text-left"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Email
                </th>

                <th
                  scope="col"
                  className="text-sm font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {contacts?.map((allMessage, index) => {
                const {
                  name,
                  id,
                  message,
                  address,
                  email,
                  subject,
                  phone_number,
                } = allMessage;
                return (
                  <tr key={index} className="bg-white border-b">
                    <td className="text-sm text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {name}
                    </td>
                    <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {address.length > 20
                        ? `${address.slice(0, 20)}...`
                        : address}
                    </td>

                    <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {email.length > 20 ? `${email.slice(0, 20)}...` : email}
                    </td>
                    <td className="text-left text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {phone_number}
                    </td>
                    <td className=" text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {subject.length > 30
                        ? `${subject.slice(0, 30)}...`
                        : subject}
                    </td>
                    <td className="text-md text-gray-600 font-normal px-3 py-3 whitespace-nowrap">
                      {message.length > 30
                        ? `${message.slice(0, 30)}...`
                        : message}
                    </td>
                    <td className="text-gray-500 font-light px-3 py-3 whitespace-nowrap">
                      <span className="flex">
                        <button className="mr-2">
                          <AiFillEye
                            onClick={() => {
                              setReadModal(true);
                              setReadID(id);
                            }}
                            className="text-green hover:text-midgreen"
                            size={30}
                          />
                        </button>
                        <button
                          className="ml-2 text-red-400 hover:text-gray-600"
                          onClick={() => {
                            setModalOpen(true);
                            setDeleteId(id);
                          }}
                        >
                          <RiDeleteBin6Line size={30} />
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {loader && (
        <div
          className="flex items-center justify-center h-[60vh] w-[80vw] bg-white text-lg text-white"
          style={{ zIndex: 9999 }}
        >
          <PageLoader />
        </div>
      )}
      {contacts.length === 0 && !loader && (
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

export default ContactUs;
