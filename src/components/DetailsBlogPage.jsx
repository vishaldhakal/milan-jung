import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './api/axiosInstance';
import PageLoader from './common/Loaders/PageLoader';

const DetailedBlogPage = () => {
  const [blogDetail, setBlogDetail] = useState();
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    axiosInstance
      .get(`/blog/post-detail/${slug}/`)
      .then((data) => setBlogDetail(data?.data))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mt-20 mx-auto min-h-[80vh]">
        <div className="flex flex-col mt-10 mb-6 items-center w-full text-3xl font-bold">
          <div className="text-dark mt-5 text-4xl mx-10 ">
            {blogDetail?.title}
          </div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>
        <div className="my-2 text-base mx-20 text-[#666]">
          <div className="max-h-[600px] min-h-[400px] overflow-hidden my-2 rounded-lg">
            <img
              className="w-full object-cover h-full  overflow-hidden"
              src={blogDetail?.image}
              alt=""
            />
          </div>
          {/* <div className="mx-4">
            <span className="mr-10 text-base">
              <span className="text-gray-600 font-semibold text-base">
                Author
              </span>
              <span className="ml-1 mr-1.5">:</span>
              <span className="font-medium capitalize">
                {blogDetail?.author}
              </span>
            </span>
            <span>
              <span className="text-gray-600 text-lg font-semibold">Date</span>
              <span className="ml-1 mr-1.5">:</span>
              <span className="font-medium">
                {blogDetail?.created_at.slice(0, 10)}
              </span>
            </span>
          </div> */}
          <div
            className="m-4 py-2 text-justify tracking-wider leading-8 font-normal text-gray-800  break-words"
            dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default DetailedBlogPage;
