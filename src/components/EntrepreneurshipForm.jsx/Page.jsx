import React, { useEffect, useState } from "react";
import AddMember from "./AddMember";
import { BsPlus } from "react-icons/bs";
import { axiosImageInstance } from "../api/axiosInstance";
import DetailDemo from "./DetailDemo";

const Page = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalFileLists, setFinalFileLists] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [fileResult, setFileResult] = useState(false);
  const [memberErrorMsg, setMemberErrorMsg] = useState("");
  const [fileUpdateValidation, setFileUpdateValidation] = useState(false);
  const [participantInfo, setParticipantInfo] = useState({
    result: false,
    business: "",
    phone: "",
    email: "",
    errors: {
      business: "",
      phone: "",
      email: "",
    },
  });
  const [count, setCount] = useState([
    {
      id: 1,
      result: false,
      first_name: "",
      last_name: "",
      errors: {
        firstName: "",
        lastName: "",
      },
    },
    {
      id: 2,
      result: false,
      first_name: "",
      last_name: "",
      errors: {
        firstName: "",
        lastName: "",
      },
    },
  ]);

  const handleInput = ({ target: { name, value } }) => {
    setParticipantInfo((participantInfo) => ({
      ...participantInfo,
      [name]: value,
    }));
    handleError(name, value);
  };

  const handleError = (name, value) => {
    if (name === "business") {
      if (value.length < 1) {
        participantInfo.errors.business = "Name of Business is required.";
        participantInfo.result = false;
      } else {
        participantInfo.errors.business = "";
        participantInfo.result = true;
      }
    } else if (name === "phone") {
      if (value.length < 1) {
        participantInfo.errors.phone = "Phone is required.";
        participantInfo.result = false;
      } else if (value.length >= 1 && value.length < 10) {
        participantInfo.errors.phone = "Invalid Phone Length";
        participantInfo.result = false;
      } else if (value.length > 10) {
        participantInfo.errors.phone = "Invalid phone length";
        participantInfo.result = false;
      } else {
        participantInfo.errors.phone = "";
        participantInfo.result = true;
      }
    } else if (name === "email") {
      if (value.length < 1) {
        participantInfo.errors.email = "Email is required.";
        participantInfo.result = true;
      } else if (
        !value.match(
          /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
        )
      ) {
        participantInfo.errors.email =
          "Email must be formatted as name@address.xyz.";
        participantInfo.result = false;
      } else {
        participantInfo.errors.email = "";
        participantInfo.result = true;
      }
    }

    setParticipantInfo((prev) => {
      return {
        ...prev,
        errors: participantInfo.errors,
      };
    });
  };

  const handleErrorMember = (name, index) => {
    if (name === "first_name") {
      if (!count[index]?.first_name || count[index]?.first_name === "") {
        count[index].errors.firstName = "First Name is required.";
        count[index].result = false;
      } else {
        count[index].errors = {
          ...count[index].errors,
          firstName: "",
        };
        count[index].result = true;
      }
    } else if (name === "last_name") {
      if (!count[index]?.last_name || count[index]?.last_name === "") {
        count[index].errors.lastName = "Last Name is required.";
        count[index].result = false;
      } else {
        count[index].errors = {
          ...count[index].errors,
          lastName: "",
        };
        count[index].result = true;
      }
    }

    setCount([...count]);
  };

  const objInstance = {
    id: count?.length + 1,
    result: false,
    first_name: "",
    last_name: "",
    errors: {
      firstName: "",
      lastName: "",
    },
  };

  let arrOne = [
    {
      id: 0,
      required: true,
      label:
        "Brief description about the business model (not exceeding 2 pages)",
      description:
        "This section must give a brief insight on what the business is about. What kind of problem does it solve? Why do you think this model has any chance of succeeding in the market of Nepal?",
    },
    {
      id: 1,
      required: true,
      label: "Estimated cost (Tabular format expected)",
      description:
        "This section must give a general description about the kinds of assets the business will demand. This includes the office, number of employees (estimate), manufacturing machines, if any, along with the assets that you believe would be necessary. Descriptive notes will be appreciated wherever necessary",
    },
    {
      id: 2,
      required: true,
      label: "Estimated timeframe for establishment (Charts expected)",
      description:
        "This section must provide a timeline or a work breakdown schedule until the business is up and running. Use of charts will be appreciated. Descriptive notes will be expected wherever necessary.",
    },
    {
      id: 3,
      required: true,
      label: "Estimated Return on Investment (ROI) in tabular format expected",
      description: "Descriptive notes will be appreciated wherever necessary.",
    },
  ];
  let arrTwo = [
    {
      id: 4,
      required: false,
      label: "Details about your business/​project:",
      description:
        "If your business is already established and is seeking an accelerator fund, please elaborate on how the fund will assist you in achieving your goal.",
    },
    {
      id: 5,
      required: false,
      label: "Noteworthy impact on the community (Upto 300 words):",
      description: "",
    },
    {
      id: 6,
      required: false,
      label: "Noteworthy mentions (if any):",
      description:
        "We would like to know if there is any personal story/motivation behind your idea or is related to your field of study. Please explain in a paragraph.If there are any other supporting facts, documents you wish to submit, this is where it should belong.",
    },
  ];

  const increment = () => {
    setCount((count) => [...count, objInstance]);
  };

  useEffect(() => {
    if (count?.length < 2) {
      setMemberErrorMsg("Please specify at least 2 Members.");
    } else {
      setMemberErrorMsg("");
    }
  }, [count?.length]);

  const handleClean = (items) => {
    if (count?.length < 2) {
      return false;
    }

    setCount((count) => count?.filter((term, index) => index !== items));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFileUpdateValidation(true);
    handleError("business", participantInfo?.business);
    handleError("phone", participantInfo?.phone);
    handleError("email", participantInfo?.email);
    count?.map((item, index) => {
      handleErrorMember("first_name", index);
      handleErrorMember("last_name", index);
    });

    let goAhead;
    let isTrueMap = count?.map((item) => item?.result);
    let isTrue = isTrueMap?.includes(false);

    let finalFileListsTem = [...finalFileLists];
    let finalFileListResult = [...finalFileLists];
    let firstFourFileValues = finalFileListResult.splice(0, 4);
    let firstfourfileResult = true;
    firstFourFileValues?.map((items) => {
      if (Boolean(items) === false || items === "" || items === null) {
        firstfourfileResult = true;
      } else {
        firstfourfileResult = false;
      }
    });

    goAhead =
      participantInfo?.result === true &&
      isTrue === false &&
      memberErrorMsg === "" &&
      firstfourfileResult === false;

    if (goAhead === true) {
      setLoading(true);
      let countTem = [...count];

      countTem?.forEach((items) => {
        delete items?.id;
        delete items?.result;
        delete items?.errors;
      });
      let participation = new FormData();
      participation.append("name_of_business", participantInfo?.business);
      participation.append("phone", participantInfo?.phone);
      participation.append("email", participantInfo?.email);
      participation.append("business_model", finalFileListsTem[0]);
      participation.append("estimated_cost", finalFileListsTem[1]);
      participation.append("estimated_timeframe", finalFileListsTem[2]);
      participation.append("estimated_roi", finalFileListsTem[3]);
      finalFileListsTem[4] &&
        participation.append("project_detail", finalFileListsTem[4]);
      finalFileListsTem[5] &&
        participation.append("noteworthy_impact", finalFileListsTem[5]);
      finalFileListsTem[6] &&
        participation.append("noteworthy_mentions", finalFileListsTem[6]);
      participation.append("member", JSON.stringify(countTem));

      axiosImageInstance
        .post("entrepreneurship/participation-create/", participation, {
          onUploadProgress: (e) => {
            let percentage = Math.round((e?.loaded * 100) / e?.total);
            setUploadPercentage(percentage);
          },
        })
        .then((response) => {
          console.log(response);
          setFileResult(true);
          setShowSuccess(true);
          setLoading(false);
          setShowSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <div
      className={`
      ${loading && "sbldufg_yzaplha"}
      max-w-[750px] entrepreneurship_section mx-auto px-4 pt-10 pb-10`}
    >
      {showSuccess ? (
        <>
          <div className="pl-2.5 text-[24px] text-black font-semibold">
            Participation Application
          </div>
          <div className="pl-2.5 text-sm mt-5">
            Thank you for filling out the form. Your response has been recorded.
          </div>
        </>
      ) : (
        <>
          <div className="pl-2.5 text-[26px] text-black font-bold">
            Participation Application
          </div>
          <form className="mt-[20px]" onSubmit={handleSubmit}>
            <>
              <div
                className={`relative transition-all  px-2.5  mb-1.5 duration-300 ${
                  participantInfo?.errors?.business
                    ? "pb-10  bg-[#F9E8E8]"
                    : "pb-0"
                }
           `}
              >
                <label
                  htmlFor=""
                  className="flex items-center font-bold text-[14px] pt-2.5 pr-2"
                >
                  <p>Name of Business</p>
                  <span className="text-[#cc2a24] ml-[3px]">*</span>
                </label>
                <input
                  type="text"
                  name="business"
                  value={participantInfo.business}
                  onChange={(e) => handleInput(e)}
                  className={`${
                    participantInfo?.errors?.business
                      ? "focus:border-[#cc2a24]"
                      : "focus:border-[#1a9cff]"
                  }  relative z-10 text-[#333]  my-[6.25px] text-sm bg-white w-full border border-[#ccc] outline-none focus:outline focus:border-[#1a9cff] focus:shadow-[0_0_1px_2px_white] py-2 px-2.5 transition-all duration-300`}
                  required
                />
                <div
                  className={`absolute w-[calc(100%-16px)] bottom-2 right-0 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs ${
                    participantInfo?.errors?.business
                      ? ""
                      : "opacity-0 invisible "
                  }`}
                >
                  {participantInfo?.errors?.business}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-[6px]">
                <div
                  className={` px-2.5 w-full relative transition-all duration-300 ${
                    participantInfo?.errors?.phone && "pb-9  bg-[#F9E8E8]"
                  }
           `}
                >
                  <label
                    htmlFor=""
                    className="flex items-center font-bold text-[14px] pt-1.5 pr-2"
                  >
                    <p>Phone</p>
                    <span>*</span>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={participantInfo.phone}
                    onChange={(e) => handleInput(e)}
                    className={`${
                      participantInfo?.errors?.phone
                        ? "focus:border-[#cc2a24]"
                        : "focus:border-[#1a9cff]"
                    }  relative z-10 text-[#333] my-[6.25px] text-sm bg-white w-full border border-[#ccc] outline-none focus:outline focus:border-[#1a9cff] focus:shadow-[0_0_1px_2px_white] py-2 px-2.5 transition-all duration-300`}
                    required
                  />

                  <div
                    className={`absolute w-[calc(100%-16px)] bottom-2 right-0 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs ${
                      participantInfo?.errors?.phone
                        ? ""
                        : "opacity-0 invisible"
                    }`}
                  >
                    {participantInfo?.errors?.phone}
                  </div>
                </div>
                <div
                  className={` mb-[6.25px] px-2.5 w-full relative transition-all duration-300 ${
                    participantInfo?.errors?.email && "pb-9  bg-[#F9E8E8]"
                  }
           `}
                >
                  <label
                    htmlFor=""
                    className="flex items-center font-bold text-[14px] pt-1.5 pr-2"
                  >
                    <p>Email</p>
                    <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={participantInfo.email}
                    onChange={(e) => handleInput(e)}
                    className={`${
                      participantInfo?.errors?.email
                        ? "focus:border-[#cc2a24]"
                        : "focus:border-[#1a9cff]"
                    } relative z-10 text-[#333] my-[6.25px] text-sm bg-white w-full border border-[#ccc] outline-none focus:outline focus:shadow-[0_0_1px_2px_white] py-2 px-2.5 transition-all duration-300`}
                    required
                  />
                  <div
                    className={`absolute w-[calc(100%-16px)] bottom-2 right-0 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs ${
                      participantInfo?.errors?.email
                        ? ""
                        : "opacity-0 invisible"
                    }`}
                  >
                    {participantInfo?.errors?.email}
                  </div>
                </div>
              </div>
            </>

            <>
              {/* For Details */}
              {arrOne?.map((items, index) => {
                const { label, description, required, id } = items;
                return (
                  <DetailDemo
                    key={index}
                    number={id}
                    label={label}
                    required={required}
                    description={description}
                    fileResult={fileResult}
                    uploadPercentage={uploadPercentage}
                    setFileResult={setFileResult}
                    finalFileLists={finalFileLists}
                    setFinalFileLists={setFinalFileLists}
                    fileUpdateValidation={fileUpdateValidation}
                  />
                );
              })}
            </>

            <>
              <div className="pl-2.5 text-[22px] mt-[25px] font-bold">
                Additional Details
              </div>
              <div className="grid md:grid-cols-2 gap-x-[25px]">
                {arrTwo?.map((items, index) => {
                  const { label, description, required, id } = items;
                  return (
                    <div key={index}>
                      <DetailDemo
                        number={id}
                        label={label}
                        required={required}
                        description={description}
                        fileResult={fileResult}
                        uploadPercentage={uploadPercentage}
                        setFileResult={setFileResult}
                        finalFileLists={finalFileLists}
                        setFinalFileLists={setFinalFileLists}
                      />
                    </div>
                  );
                })}
              </div>
            </>

            <>
              <div className="text-[22px] mt-[25px] font-bold pl-2.5">
                Members
              </div>
              <div className="text-[12px] pl-2.5">
                Print the names of the team members
              </div>
              <div className="grid gap-[25px] mt-[12px]">
                {count?.map((_, index) => {
                  return (
                    <AddMember
                      key={index}
                      number={index}
                      count={count}
                      memberErrorMsg={memberErrorMsg}
                      setCount={setCount}
                      handleClean={handleClean}
                      handleErrorMember={handleErrorMember}
                    />
                  );
                })}
              </div>
              {memberErrorMsg ? (
                <div
                  className={`w-full mt-2 mx-auto left-0 text-white shrink-0 bg-[hsl(2,70%,47%)] transition-all duration-300 p-[6.25px] text-xs`}
                >
                  {memberErrorMsg}
                </div>
              ) : null}
              <div className="mt-[10px] ml-2.5">
                <button
                  type="button"
                  onClick={increment}
                  className="flex items-center px-1 py-[7px] bg-white min-w-[55px] border border-[#d85427] outline-none focus:outline-none rounded-[3px] text-[#d85427] hover:shadow-[inset_0_0_0_1px_#d85427] transition-all duration-300"
                >
                  <span>
                    <BsPlus />
                  </span>
                  <span className="text-sm">Add Team-Member</span>
                </button>
              </div>
            </>

            <div className="mt-[40px] ml-2.5">
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="min-w-[80px] py-2 px-2.5 text-white hover:border-white focus:shadow-[0_0_0_1px_#1a9cff] bg-[#d85427] text-[12px] transition-all duration-[250ms] rounded-[3px] border border-[#d85427]"
              >
                {!loading ? (
                  "Submit"
                ) : (
                  <svg className="loader_svg" viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Page;
