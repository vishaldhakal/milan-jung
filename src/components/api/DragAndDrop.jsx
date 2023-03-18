import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const DragAndDrop = () => {
  var filesType = /(\.doc|\.docx|\.pdf|\.txt|\.rtf)$/i;
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState("");

  const handleFile = (e) => {
    const newFile = e.target.files[0];
    let fileName = newFile?.name;
    let extension = fileName?.substr(fileName.lastIndexOf("."));
    if (!filesType.test(extension)) {
      setMessage("Only pdf, docx, doc, rtf, txt files may be uploaded.");
      return;
    } else {
      if (newFile) {
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        setMessage("");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFile = e.dataTransfer.files[0];
    let fileName = newFile?.name;
    let extension = fileName?.substr(fileName.lastIndexOf("."));

    if (!filesType.test(extension)) {
      setMessage("Only pdf, docx, doc, rtf, txt files may be uploaded.");
      return;
    } else {
      if (newFile) {
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        setMessage("");
      }
    }
    console.log({ fileName, extension });
    console.log(fileList);
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
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
    <div className="p-[2px] my-[6.25px] border border-[#bfbfbf80]">
      <div
        onDrop={(e) => handleDrop(e)}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        className={`
        ${dragActive ? "border-[#1a9cff]" : "border-transparent"}
           transition duration-200 relative flex items-center border bg-[#bfbfbf1f]`}
      >
        <input
          multiple={true}
          type="file"
          id="files"
          onChange={handleFile}
          className="hidden"
          accept=".doc,.docx,.rtf,.txt,.pdf"
        />
        <div className=" p-[12.5px] flex items-center ">
          <label
            tabIndex={1}
            htmlFor="files"
            className="bg-white outline-none focus:outline-none rounded-[3px] py-1.5 px-2.5 text-[12px] border border-[#d85427] text-[#d85427] hover:shadow-[inset_0_0_0_1px_#d85427] focus:shadow-none min-w-[55px] font-normal transition-all duration-[250ms] cursor-pointer"
          >
            Upload
          </label>
          <div className="text-sm ml-2">or drag file here.</div>
        </div>
      </div>
      {message ? (
        <div className="bg-rose-400 text-rose-600 text-sm">{message}</div>
      ) : null}
      {fileList?.map((item, index) => (
        <div className="flex items-center px-[6.25px] py-1" key={index}>
          <div className="flex w-full items-center justify-between">
            <div>
              <div className="text-sm font-normal text-[#d85427] underline">
                {item.name}
              </div>
              <div className="text-[12px] text-[rgb(0,0,0,0.6)]">
                {fileSize(item?.size)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => fileRemove(item)}
              className="text-[18px] text-black focus:text-[#1a9cff]"
            >
              <MdOutlineCancel />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
