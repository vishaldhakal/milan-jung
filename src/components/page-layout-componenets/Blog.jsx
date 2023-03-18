import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import PageLoader from "./../common/Loaders/PageLoader";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentButton, setCurrentButton] = useState(1);
  const [count, setCount] = useState();
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const getBlogs = async () => {
    try {
      let data = await axiosInstance.get(
        `/blog/published-post-list/?page=${currentButton}`
      );
      setBlogs(data?.data?.Results);
      setPrevPage(data?.data?.PreviousPage);
      setNextPage(data?.data?.NextPage);

      const { TotalCount, countItemsOnPage } = data?.data;
      setCount(Math.ceil(TotalCount / countItemsOnPage));
      setLoader(false);
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs();
    // eslint-disable-next-line
  }, [currentButton]);
  return (
    <>
      <div className="container mx-auto min-h-[90vh]">
        <div className="flex flex-col mt-10 items-center w-full text-3xl font-bold">
          <div className="text-dark">ARTICLES</div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>
        <div className="py-2 mx-4 sm:mx-6 md:mx-8 xl:mx-14 text-base text-[#666]">
          <div className="my-7">
            {loader && (
              <div
                className="flex items-center justify-center min-h-full w-full text-lg text-white"
                style={{ zIndex: 9999 }}
              >
                <PageLoader />
              </div>
            )}
            <div className="text-center gap-10 mx-auto flex flex-wrap w-fit items-center justify-center">
              {blogs?.map((blog, index) => {
                const { id, image, author, created_at, title, content, slug } =
                  blog;
                return (
                  <Link to={`/blog/${slug}`} key={id}>
                    <div className="w-[360px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:w-[320px] mx-auto  h-96 md:h-[370px] rounded-lg  overflow-hidden cursor-pointer flex flex-col justify-between">
                      <div>
                        <div className="relative object-cover">
                          <img
                            alt="Blogs"
                            className="rounded-t-lg w-full h-48 md:h-44 object-cover"
                            src={image}
                          />
                          {/* <span className="bg-midgreen text-sm text-white font-medium px-1.5 py-0.5 rounded-r absolute bottom-0 left-0">
                            By {author}
                          </span>
                          <span className="absolute text-sm	 right-0 bottom-0 bg-midgreen text-white font-medium px-1.5 py-0.5 rounded-l">
                            {created_at.slice(0, 10)}
                          </span> */}
                        </div>
                        <div className="py-4 px-2">
                          <h2 className="w-full text-lg font-semibold line-clamp-4">
                            {title}
                          </h2>
                          {/* <p className="mt-2 line-clamp-3 break-words">
                            {content.replace(/(<\/?.+?>|&[a-z]+;)/gi, "")}
                          </p> */}
                        </div>
                      </div>

                      <div>
                        <button className="rounded mb-4 text-center p-2 bg-darkgreen hover:bg-normaldark text-sm text-white font-medium">
                          Read More
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
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
      </div>
    </>
  );
};

export default Blog;
