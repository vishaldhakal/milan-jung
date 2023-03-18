import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Pagination({
  count,
  setCurrentButton,
  nextPage,
  prevPage,
  currentButton,
}) {
  let btnCounts = [];
  for (let num = 1; num <= count; num++) {
    btnCounts.push(num);
  }
  console.log(prevPage, nextPage);
  return (
    <>
      <div>
        <ul className="inline-flex -space-x-px text-white">
          <li>
            <button
              disabled={prevPage === null ? true : false}
              onClick={() => setCurrentButton(currentButton - 1)}
              class={`${
                prevPage === null && "cursor-not-allowed"
              } px-3 py-2 ml-0 leading-tight  bg-green border border-gray-300 rounded-l-lg hover:bg-midgreen `}
            >
              Previous
            </button>
          </li>

          {btnCounts?.map((val, index) => {
            return (
              <li key={index}>
                <button
                  key={index}
                  onClick={() => setCurrentButton(index + 1)}
                  className={`${
                    currentButton === index + 1
                      ? "bg-midgreen"
                      : "bg-green hover:bg-midgreen"
                  } px-3 py-2 leading-tight border border-gray-300 `}
                >
                  {val}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setCurrentButton(currentButton + 1)}
              disabled={nextPage === null ? true : false}
              class={`${
                nextPage === null && "cursor-not-allowed"
              } px-5 py-2 leading-tight  bg-green border border-gray-300 rounded-r-lg hover:bg-midgreen`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
