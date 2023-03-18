import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import SuccessModal from "../../common/SuccessModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import EditYouTubeModal from "./../../common/EditYouTube";
import PageLoader from "../../common/Loaders/PageLoader";
import { BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";

const YoutubeLinks = () => {
  const [youtubeLink, setYoutubeLink] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [count, setCount] = useState(null);
  const [youtubeID, setyoutubeID] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState("");

  const getLinks = async (signal) => {
    if (isActive === 0) {
      setOrder("");
    } else if (isActive === 1) {
      setOrder("title");
    } else {
      setOrder("-title");
    }
    try {
      searchValue && setCurrentButton(1);
      let data = await axiosInstance.get(
        `/cms/video-list/?page=${currentButton}&search=${searchValue}&ordering=${order}`,
        {
          signal,
        }
      );
      setYoutubeLink(data?.data?.Results);
      setPrevPage(data?.data?.PreviousPage);
      setNextPage(data?.data?.NextPage);
      const { countItemsOnPage, TotalCount } = data?.data;
      setCount(Math.ceil(TotalCount / countItemsOnPage));
      setLoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getLinks(signal);
    return () => {
      controller.abort();
    };
  }, [currentButton, searchValue, isActive, order]);

  return (
    <>
      <DeleteAlertModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getAllData={getLinks}
        url={`/cms/video-delete/${youtubeID}/`}
        setSuccessModal={setSuccessModal}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <EditYouTubeModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        youtubeID={youtubeID}
        getAllVideos={getLinks}
      />
      <div className="mt-4">
        <div className="text-xl m-4 text-normaldark font-semibold ">
          YouTube Links
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
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span className="absolute right-4 cursor-pointer">
          <BsSearch color="green" size={23} />
        </span>
      </div>
      <div className="bg-white mx-6 rounded shadow-md mb-2">
        <div className="overflow-x-auto ">
          <table className="min-w-full table table-fixed">
            <thead className="border-b bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                >
                  S.No.
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    setIsActive(isActive === 2 ? 0 : isActive + 1);
                  }}
                  className={`${
                    isActive !== 0 && "bg-gray-200"
                  } text-base font-bold text-gray-500 px-3 py-4 text-left flex items-center cursor-pointer`}
                >
                  Title
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
                  Link
                </th>

                <th
                  scope="col"
                  className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Is Posted
                </th>

                <th
                  scope="col"
                  className="text-base font-bold text-gray-500 px-3 py-4 text-left"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {youtubeLink.map((link, index) => {
                const { id, live_link, title, is_publish } = link;
                return (
                  <tr key={index} className="bg-white border-b">
                    <td className="text-sm text-gray-600 font-normal px-3 py-4 whitespace-nowrap">
                      #{index + 1}
                    </td>
                    <td className=" text-gray-600 font-normal px-3 py-4 whitespace-nowrap">
                      {title?.length > 70 ? `${title?.slice(0, 70)}...` : title}
                    </td>
                    <td className=" text-gray-600 font-normal px-3 py-4 whitespace-nowrap">
                      {live_link?.length > 45
                        ? `${live_link.slice(0, 45)}...`
                        : live_link}
                    </td>
                    <td className=" text-gray-600 font-normal px-3 py-4 whitespace-nowrap">
                      {is_publish ? `Yes` : `No`}
                    </td>
                    <td className="text-gray-600 font-light px-3 py-4 whitespace-nowrap">
                      <span className="flex">
                        <button
                          onClick={() => {
                            setEditModalOpen(true);
                            setyoutubeID(id);
                          }}
                          className="mr-2 text-emerald-600 hover:text-gray-600"
                        >
                          <FiEdit size={30} />
                        </button>
                        <button
                          onClick={() => {
                            setModalOpen(true);
                            setyoutubeID(id);
                          }}
                          className="ml-2 text-red-400 hover:text-gray-600"
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

      {loader && (
        <div className="h-[25vh] w-[80vw] flex items-center justify-center bg-white text-lg text-white">
          <PageLoader />
        </div>
      )}
      {youtubeLink.length === 0 && !loader && (
        <div className=" h-[25vh] w-[80vw] flex items-center justify-center  text-lg font-bold">
          NO DATA FOUND
        </div>
      )}
    </>
  );
};

export default YoutubeLinks;
