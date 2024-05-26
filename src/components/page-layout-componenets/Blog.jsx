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
      <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Latest from blog
          </h2>
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
            <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-8">
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
        </section>
    </>
  );
};

export default Blog;
