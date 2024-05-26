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
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Latest from blog
          </h2>
        </div>
        <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
          {blogs?.slice(0, 3)?.map((blog, index) => {
            const { id, image, author, created_at, title, content, slug } =
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
        <Link
          to="/blogs"
          className="mt-7 flex justify-center gap-1 font-semibold"
        >
          {blogs?.length >= 4 && (
            <button
              type="button"
              className="border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded"
            >
              READ MORE
            </button>
          )}
        </Link>
      </div>
    </section>
  );
};

export default BlogHomepage;
