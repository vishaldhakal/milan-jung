import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const ViewEntrepreneurship = ({ readModal, setReadModal, readID }) => {
  const [member, setMember] = useState(null);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const getDetail = () => {
      axiosInstance
        .get(`/entrepreneurship/participation-detail/${readID}/`)
        .then((response) => {
          setMember(response?.data);
          let membersName = JSON.parse(response?.data?.member);
          setMemberList(membersName);
          console.log("mMember Name", membersName);
          console.log(response?.data);
        })
        .catch((error) => console.log(error));
    };
    readID && getDetail();
  }, [readID]);

  const files = (url) => {
    if (url == null || undefined || NaN) return "File Name";
    else {
      let linkArray = url?.split("/");
      let fileName = linkArray[linkArray?.length - 1];
      return fileName;
    }
  };

  return (
    <>
      <Transition appear show={readModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setReadModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center pt-12 sm:pt-16 sm:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden sm:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subject: {member?.subject}

                    
                  </Dialog.Title> */}
                  <div className="flex justify-end sm:hidden">
                    <button
                      onClick={() => setReadModal(false)}
                      type="button"
                      className="flex items-center justify-center rounded-full border border-transparent bg-slate-100 w-8 h-8 text-sm font-medium text-gray-600 hover:text-gray-700 transition-all duration-200 active:bg-slate-200 hover:bg-slate-500 hover:bg-opacity-20 outline-none focus:outline-none  "
                    >
                      x
                    </button>
                  </div>

                  <div className="grid  text-sm text-gray-700 gap-y-1.5 mt-2 sm:mt-6">
                    <div className="grid lg:grid-cols-2 gap-x-3 gap-y-4 pb-2.5 border-b-2 border-gray-100">
                      <div className="flex items-center">
                        <div className="w-[150px] font-medium shrink-0">
                          Business Name
                        </div>
                        <span className="mx-2.5">:</span>
                        <div className="w-auto">{member?.name_of_business}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[150px] font-medium shrink-0">
                          Contact Number
                        </div>
                        <span className="mx-2.5">:</span>
                        <div className="w-auto">{member?.phone}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[150px] font-medium shrink-0">
                          Email
                        </div>
                        <span className="mx-2.5">:</span>
                        <div className="w-auto">{member?.email}</div>
                      </div>
                    </div>

                    <div className="border-b-2 border-gray-100 pb-2.5">
                      <div className="text-lg mb-2.5">Team Members :</div>
                      <div className="grid lg:grid-cols-2 gap-x-3 gap-y-4">
                        {memberList?.map((items, index) => {
                          return (
                            <div key={index} className="flex items-center">
                              <div className="w-[150px] font-medium shrink-0">
                                Full Name
                              </div>
                              <span className="mx-2.5">:</span>
                              <div className="flex items-center flex-wrap w-auto">
                                <span className="mr-1">
                                  {items?.first_name}
                                </span>
                                <span>{items?.last_name}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-lg mt-2.5 sm:mt-0 mb-2.5">
                        Project Details File :
                      </div>
                      <div className="grid lg:grid-cols-2 gap-x-3 gap-y-4">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                          <div className="flex items-center">
                            <div className="w-[150px] font-medium shrink-0">
                              Business Model
                            </div>
                            <span className="mx-2.5">:</span>
                          </div>
                          <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                            <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                              {files(member?.business_model)}
                            </span>

                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={member?.business_model}
                              download={files(member?.business_model)}
                              className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                            >
                              <HiOutlineDownload />
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                          <div className="flex items-center">
                            <div className="w-[150px] font-medium shrink-0">
                              Estimated Cost
                            </div>
                            <span className="mx-2.5">:</span>
                          </div>
                          <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                            <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                              {files(member?.estimated_cost)}
                            </span>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={member?.estimated_cost}
                              download={files(member?.estimated_cost)}
                              className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                            >
                              <HiOutlineDownload />
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                          <div className="flex items-center">
                            <div className="w-[150px] font-medium shrink-0">
                              Estimated ROI
                            </div>
                            <span className="mx-2.5">:</span>
                          </div>
                          <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                            <span className="break-all line-clamp-1 overflow-hidden text-ellipsis ">
                              {files(member?.estimated_roi)}
                            </span>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={member?.estimated_roi}
                              download={files(member?.estimated_roi)}
                              className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                            >
                              <HiOutlineDownload />
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                          <div className="flex items-center">
                            <div className="w-[150px] font-medium shrink-0">
                              Estimated Time Frame
                            </div>
                            <span className="mx-2.5">:</span>
                          </div>
                          <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                            <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                              {files(member?.estimated_timeframe)}
                            </span>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={member?.estimated_timeframe}
                              download={files(member?.estimated_timeframe)}
                              className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                            >
                              <HiOutlineDownload />
                            </a>
                          </div>
                        </div>
                        {member?.project_detail ? (
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                            <div className="flex items-center">
                              <div className="w-[150px] font-medium shrink-0">
                                Project Detail
                              </div>
                              <span className="mx-2.5">:</span>
                            </div>
                            <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                              <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                                {files(member?.project_detail)}
                              </span>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={member?.project_detail}
                                download={files(member?.project_detail)}
                                className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                              >
                                <HiOutlineDownload />
                              </a>
                            </div>
                          </div>
                        ) : null}
                        {member?.noteworthy_impact ? (
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                            <div className="flex items-center">
                              <div className="w-[150px] font-medium shrink-0">
                                Noteworthy Impact
                              </div>
                              <span className="mx-2.5">:</span>
                            </div>
                            <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                              <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                                {files(member?.noteworthy_impact)}
                              </span>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={member?.noteworthy_impact}
                                download={files(member?.noteworthy_impact)}
                                className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                              >
                                <HiOutlineDownload />
                              </a>
                            </div>
                          </div>
                        ) : null}
                        {member?.noteworthy_mentions ? (
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
                            <div className="flex items-center">
                              <div className="w-[150px] font-medium shrink-0">
                                Noteworthy Mentions
                              </div>
                              <span className="mx-2.5">:</span>
                            </div>
                            <div className="flex items-center w-fit px-2.5 py-1.5 text-sm rounded-md bg-gray-100 text-gray-800">
                              <span className="break-all line-clamp-1 overflow-hidden text-ellipsis">
                                {files(member?.noteworthy_mentions)}
                              </span>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={member?.noteworthy_mentions}
                                download={files(member?.noteworthy_mentions)}
                                className="ml-1.5 h-5 cursor-pointer flex items-center px-1.5 rounded-md transition-all duration-200 hover:text-green-500 hover:bg-white"
                              >
                                <HiOutlineDownload />
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      onClick={() => setReadModal(false)}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Ok, Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewEntrepreneurship;
