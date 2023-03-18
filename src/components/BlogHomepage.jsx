import React from "react";
import axiosInstance from "./api/axiosInstance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogHomepage = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      let data = await axiosInstance.get("/blog/published-post-list/");
      setBlogs(data.data.Results);
    } catch (error) {}
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <div className="container my-10 px-5 mx-auto " id="blogSection">
        <div className="flex flex-col mt-10 mb-6 items-center w-full text-3xl font-bold">
          <div className="text-dark">Articles</div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>
        <div className="text-base text-[#666]">
          <div
            className={`mt-14 mx-auto items-center text-center gap-6 flex flex-wrap justify-around `}
          >
            {blogs?.slice(0, 3)?.map((blog, index) => {
              const { id, image, author, created_at, title, content, slug } =
                blog;
              return (
                <Link to={`/blog/${slug}`} key={id}>
                  <div className="w-[380px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] mx-auto h-96 rounded-lg overflow-hidden cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="relative object-cover">
                        <img
                          alt="Blog"
                          className="rounded-t-lg w-full h-48 object-cover"
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
                        {/* <p className="mt-2 line-clamp-3 break-words text-justify">
                          {content.replace(/(<\/?.+?>|&[a-z]+;)/gi, "")}
                        </p> */}
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="rounded mb-4 p-2 bg-darkgreen hover:bg-normaldark text-sm text-white font-medium"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            to="/blogs"
            className="mt-7 flex justify-center gap-1 font-semibold"
          >
            {blogs?.length > 4 && (
              <button
                type="button"
                className="border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded"
              >
                READ MORE
              </button>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogHomepage;
