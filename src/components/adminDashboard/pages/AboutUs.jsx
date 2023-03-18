import React, { useState, useEffect } from "react";
import TextEditor from "../../common/Editor/TextEditor";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const AboutUs = () => {
  const [editorText, setEditorText] = useState("");
  const [id, setID] = useState();
  const [loader, setLoader] = useState(false);

  const handleEditorText = (value) => {
    setEditorText(value);
  };

  const getAllAbout = (signal) => {
    axiosInstance
      .get("/cms/aboutus-list/", signal)
      .then((res) => {
        setID(res?.data?.[0]?.id);
        setEditorText(res.data?.[0]?.content);
      })
      .catch((err) => {});
  };

  const handleUpdate = () => {
    setLoader(true);
    let formdata = new FormData();
    formdata.append("content", editorText);
    axiosInstance
      .patch(`/cms/aboutus-update/${id}/`, formdata)
      .then((data) => {
        toast.success("Updated Sucessfully");
        setLoader(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllAbout(signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-4 ">
        <div className="text-xl m-4 text-normaldark font-semibold ">
          About Me
        </div>

        <div className="bg-white mx-6 rounded shadow-md mb-2 pb-10 min-h-[70vh]">
          <div className="mt-5 mx-3">
            <TextEditor
              editor={TextEditor}
              handleEditorText={handleEditorText}
              des={editorText}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-darkgreen hover:bg-dark py-2 px-4 mx-10 mt-6 rounded text-white"
            type="submit"
          >
            {loader ? "Updating" : "Update"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
