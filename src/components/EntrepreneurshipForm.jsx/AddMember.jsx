import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const AddMember = ({
  handleErrorMember,
  count,
  setCount,
  handleClean,
  memberErrorMsg,
  number,
}) => {
  const handleInput = ({ target: { value, name } }) => {
    let data = [...count];
    data[number][name] = value;
    data[number]["id"] = number;
    setCount(data);
    handleErrorMember(name, number);
  };

  return (
    <div
      className={`
    ${
      count[number].errors?.firstName ||
      count[number].errors?.lastName ||
      memberErrorMsg
        ? "bg-[#F9E8E8] border-[#F9E8E8]"
        : "odd:border-transparent even:border-[#bfbfbf33] even:bg-white odd:bg-[#bfbfbf33] "
    }
    
    transition duration-300 border-2 pl-[10px] p-[25px]`}
    >
      <div className="flex items-start space-x-1">
        <button
          type="button"
          onClick={() => handleClean(number)}
          className="text-[22px] mt-0.5"
        >
          <MdOutlineCancel />
        </button>
        <div className="w-full">
          <div className="text-[17px] font-semibold">
            Team-Member {number + 1}
          </div>
          <div className="my-[6.25px]">
            <label htmlFor="" className="text-sm font-semibold">
              Name
            </label>
            <div className="flex flex-col md:flex-row items-start gap-[12.5px] w-full">
              <div
                className={`w-full relative transition-all duration-300 ${
                  count[number]?.errors?.firstName && "pb-7"
                }`}
              >
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="First"
                  name="first_name"
                  value={count.first_name}
                  onChange={(e) => handleInput(e)}
                  className={` ${
                    count[number]?.errors?.firstName
                      ? "focus:border-[#cc2a24]"
                      : "focus:border-[#1a9cff]"
                  }  relative z-10 placeholder-neutral-400 text-[#333] my-[6.25px] text-sm bg-white w-full border border-[#ccc] outline-none focus:outline focus:shadow-[0_0_1px_2px_white] py-2 px-2.5 transition-all duration-300`}
                  required
                />

                <div
                  className={`absolute w-full bottom-0 right-0 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs  ${
                    count[number]?.errors?.firstName
                      ? ""
                      : "opacity-0 invisible"
                  }`}
                >
                  {count[number]?.errors?.firstName}
                </div>
              </div>
              <div
                className={`w-full relative transition-all duration-300 ${
                  count[number]?.errors?.lastName && "pb-7"
                }`}
              >
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Last"
                  name="last_name"
                  value={count.last_name}
                  onChange={(e) => handleInput(e)}
                  className={`${
                    count[number]?.errors?.lastName
                      ? "focus:border-[#cc2a24]"
                      : "focus:border-[#1a9cff]"
                  } relative z-10 placeholder-neutral-400 text-[#333] my-[6.25px] text-sm bg-white w-full border border-[#ccc] outline-none focus:outline focus:shadow-[0_0_1px_2px_white] py-2 px-2.5 transition-all duration-300`}
                  required
                />
                <div
                  className={`absolute w-full bottom-0 right-0 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs  ${
                    count[number]?.errors?.lastName ? "" : "opacity-0 invisible"
                  }`}
                >
                  {count[number]?.errors?.lastName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
