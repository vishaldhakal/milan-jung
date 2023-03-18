import React, { useEffect, useState } from "react";
import Pdf from "./Pdf";
import Docx from "./Docx";
import Doc from "./Doc";
import { MdOutlineCancel } from "react-icons/md";

const DetailDemo = ({
  number,
  setFinalFileLists,
  finalFileLists,
  required,
  label,
  description,
  uploadPercentage,
  fileUpdateValidation,
}) => {
  const [fileList, setFileList] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");
  const [showFile, setShowFile] = useState([]);

  const handleFile = (e) => {
    const newFileInput = e.target.files[0];
    handleDropAndInput(newFileInput);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const newFileDrop = e.dataTransfer.files[0];
    handleDropAndInput(newFileDrop);
  };

  const handleDropAndInput = (file) => {
    let fileName = file?.name;
    let filesType = /(\.doc|\.docx|\.pdf)$/i;
    let extension = fileName?.substr(fileName.lastIndexOf("."));
    let fileResult = filesType.test(extension);
    if (fileResult === false) {
      setMessage("Only pdf, docx, doc files may be uploaded.");
      file = null;
      return false;
    } else {
      if (file && fileResult === true) {
        setShowFile([file]);
        setFileList(file);
        setMessage("");
      }
    }
  };

  const fileRemove = (item) => {
    setShowFile([]);
    let allfilelists = [...finalFileLists];
    allfilelists[item] = "";
    setFinalFileLists([...allfilelists]);
  };

  useEffect(() => {
    if (fileList) {
      let finalFileListTem = [...finalFileLists];
      finalFileListTem[number] = fileList;
      setFinalFileLists([...finalFileListTem]);
    }
    // eslint-disable-next-line
  }, [fileList]);

  const fileType = (item) => {
    let extension = item?.name?.substr(item?.name.lastIndexOf("."));
    return extension;
  };
  const fileSize = (size) => {
    if (size < 1024) {
      return size + "bytes";
    } else if (size > 1024 && size < 1048576) {
      return (size / 1024).toFixed(1) + "KB";
    } else if (size > 1048576) {
      return (size / 1048576).toFixed(1) + "MB";
    }
  };

  return (
    <div
      className={`
      mb-1.5 p-2.5 
       ${
         fileUpdateValidation === true && showFile.length < 1
           ? "bg-[#F9E8E8]"
           : ""
       }
    `}
    >
      <div className="flex items-center font-bold text-[14px] pt-[6.5px] pr-2">
        <div>{label}</div>
        {required ? <span className="text-[#cc2a24] ml-[3px]">*</span> : null}
      </div>
      <div className="p-[2px] my-[6.25px] border border-[#bfbfbf80]">
        <div
          onDrop={(e) => handleDrop(e)}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          className={`
        ${dragActive ? "border-[#1a9cff]" : "border-transparent"}
           transition duration-200 relative flex items-center border bg-[#bfbfbf1f]`}
        >
          <input
            type="file"
            id={`files${number}`}
            onChange={(e) => {
              handleFile(e);
            }}
            className="hidden"
            accept=".doc,.docx,.pdf"
          />
          <div className=" p-[12.5px] flex items-center ">
            <label
              tabIndex={number + 1}
              htmlFor={`files${number}`}
              className="bg-white outline-none focus:outline-none rounded-[3px] py-1.5 px-2.5 text-[12px] border border-[#d85427] text-[#d85427] hover:shadow-[inset_0_0_0_1px_#d85427] focus:shadow-none min-w-[55px] font-normal transition-all duration-[250ms] cursor-pointer"
            >
              Upload
            </label>
            <div className="text-sm ml-2">or drag file here.</div>
          </div>
        </div>
        {message ? (
          <div className="bg-[#cc2a24] p-[6.25px] my-[4px] text-white text-[12px]">
            {message}
          </div>
        ) : null}
        {showFile?.map((item, index) => (
          <div
            className="flex items-center m-1.5 p-1.5 hover:bg-[#bfbfbf1a] transition-all duration-300"
            key={index}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>
                  {fileType(item) === ".pdf" ? (
                    <Pdf />
                  ) : fileType(item) === ".docx" ? (
                    <Docx />
                  ) : fileType(item) === ".doc" ? (
                    <Doc />
                  ) : undefined}
                </span>
                <div>
                  <div className="first-letter:capitalize text-sm font-normal text-[#d85427] underline">
                    {item?.name}
                  </div>
                  <div className="text-[12px] text-[rgb(0,0,0,0.6)]">
                    {fileSize(item?.size)}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={`${
                    !uploadPercentage && "opacity-0"
                  } transition-all duration-500 flex h-[3px] w-[35px] bg-[hsl(0,0%,75%)] rounded-[8px] overflow-hidden`}
                >
                  <span
                    className={`bg-[#1a9cff] transition-all duration-300`}
                    style={{ width: `${uploadPercentage}%` }}
                  ></span>
                </div>
                <button
                  type="button"
                  onClick={() => fileRemove(number)}
                  className="ml-2 transition duration-200 text-[18px] text-black hover:text-[rgb(0,0,0,0.7)] active:text-[#1a9cff]"
                >
                  <MdOutlineCancel />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-[6.25px] text-[12px]">{description}</div>
    </div>
  );
};

export default DetailDemo;
