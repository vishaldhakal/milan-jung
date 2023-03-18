import { useState } from "react";
import axiosInstance from "./api/axiosInstance";
import { useEffect } from "react";

const Questions = ({ setStudentAnswer }) => {
  const [allQuestions, setAllQuestions] = useState();

  const getAllQuestions = () => {
    axiosInstance
      .get("/cms/question-list/")
      .then((data) => {
        setAllQuestions(data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col mb-3 items-center w-full text-3xl font-bold">
          <div className="text-dark">Questions</div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>
        <div className="w-3/4 mx-auto mb-20">
          {allQuestions?.map((questions, index) => {
            const { question, id } = questions;

            return (
              <div key={id} className="my-4">
                <h1>{question}</h1>
                <textarea
                  message="message"
                  rows="3"
                  type="text"
                  placeholder="Write the answer...."
                  className="rounded border shadow-md border-gray-200 w-full pt-2 px-3.5 placeholder-gray-400 tracking-wide text-gray-700 resize-none focus:outline-none"
                />
              </div>
            );
          })}

          <div className="text-center">
            <button className="font-semibold border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
