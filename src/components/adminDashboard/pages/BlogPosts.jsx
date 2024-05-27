import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";
import Pagination from "../../common/Pagination";
import SuccessModal from "../../common/SuccessModal";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import PageLoader from "../../common/Loaders/PageLoader";
import EditBlogModal from "../../common/EditBlogModal";
import { BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [count, setCount] = useState(null);
  const [loader, setLoader] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [totalblog, setTotalBlog] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState("");

  const getBlogs = async (signal) => {
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
        `/blog/post-list/?page=${currentButton}&search=${searchValue}&ordering=${order}`,
        {
          signal,
        }
      );
      setPrevPage(data?.data?.PreviousPage);
      setNextPage(data?.data?.NextPage);

      const { countItemsOnPage, TotalCount } = data?.data;
      setTotalBlog(TotalCount);
      setBlogs(data.data.Results);
      setItemsPerPage(countItemsOnPage);
      setCount(Math.ceil(TotalCount / countItemsOnPage));
      setLoader(false);
    } catch (error) { }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getBlogs(signal);
    return () => {
      controller.abort();
    };
  }, [currentButton, searchValue, isActive, order]);

  return (
    <>
      <DeleteAlertModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getAllData={getBlogs}
        url={`/blog/post-delete/${slug}/`}
        setSuccessModal={setSuccessModal}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      <EditBlogModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        getAllBlogs={getBlogs}
        slug={slug}
      />

      <div>
        <div className=" mt-4 ">
          <div className="text-xl m-4 text-normaldark font-semibold">
            Add Blog
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
        <div className="bg-white mx-6 rounded shadow-lg mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-2 py-2 text-left min-w-[150px] "
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    onClick={() => {
                      setIsActive(isActive === 2 ? 0 : isActive + 1);
                    }}
                    className={`${isActive !== 0 && "bg-gray-200"
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
                    className="text-base font-bold text-gray-500 px-2 py-2 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-2 py-2 text-left flex items-center"
                  >
                    Published On
                    {/* <span className="-mr-1 p-0">
                      <BsArrowUp />
                    </span>
                    <span className="-ml-0.5 p-0">
                      <BsArrowDown />
                    </span> */}
                  </th>
                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-2 py-2 text-left"
                  >
                    Is Posted
                  </th>
                  <th
                    scope="col"
                    className="text-base font-bold text-gray-500 px-2 py-2 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog, index) => {
                  const {
                    id,
                    image,
                    created_at,
                    title,
                    content,
                    slug,
                    is_published,
                  } = blog;
                  return (
                    <tr key={id} className="bg-white border-b">
                      <td className="flex items-center text-sm text-gray-600 font-normal px-4 py-2">
                        <div className="h-20 w-32  shrink-0">
                          <img
                            className="h-full w-full object-cover"
                            src={image}
                          ></img>
                        </div>
                      </td>
                      <td className=" text-gray-600 font-normal px-2 py-0 whitespace-nowrap">
                        {blog.title.length > 25
                          ? `${title.slice(0, 25)}....`
                          : title}
                      </td>
                      <td className=" text-gray-600 font-normal px-2 py-2 whitespace-nowrap">
                        {blog.content.length > 30
                          ? `${content
                            .replace(/(<\/?.+?>|&[a-z]+;)/gi, "")
                            .slice(0, 30)}....`
                          : content.replace(/(<\/?.+?>|&[a-z]+;)/gi, "")}
                      </td>
                      <td className="text-left text-gray-600 font-normal px-2 py-2 whitespace-nowrap">
                        {created_at.slice(0, 10)}
                      </td>
                      <td className="text-left text-gray-600 font-normal px-2 py-2 whitespace-nowrap">
                        {is_published ? "Yes" : "No"}
                      </td>

                      <td className="text-gray-600 font-normal px-2 py-2 whitespace-nowrap">
                        <span className="flex">
                          <button
                            onClick={() => {
                              setEditModalOpen(true);
                              setSlug(slug);
                            }}
                            className="mr-2"
                          >
                            <FiEdit
                              className="text-emerald-600 hover:text-gray-600"
                              size={30}
                            />
                          </button>
                          <button
                            className="ml-2 text-red-400 hover:text-gray-600"
                            onClick={() => {
                              setModalOpen(true);
                              setSlug(slug);
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
          <div className="h-[25vh] w-[80vw] flex items-center justify-center bg-white text-lg text-white">
            <PageLoader />
          </div>
        )}

        {totalblog === 0 && !loader && (
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
      </div>
    </>
  );
};

export default BlogPosts;
