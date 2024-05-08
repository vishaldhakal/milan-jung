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
            <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
          {blogs?.map((blog, index) => {
            const { id, image, author, created_at, title,  slug } =
              blog;
            return (
              <Link to={`/blog/${slug}`} key={id}>
                <div className="border border-gray-200 rounded-lg overflow-hidden
                transition duration-500 ease-in-out transform hover:scale-105">
                  <img class="object-cover w-full h-full" src={image} alt="" />
                  <div className="p-4">
                    <p class="mt-6 text-xl font-semibold"> {title}</p>
                    <div class="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                    <span class="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                      {author} <br />
                    </span>
                    <p class="mt-4 text-base leading-relaxed text-gray-600">
                      {new Date(created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
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
