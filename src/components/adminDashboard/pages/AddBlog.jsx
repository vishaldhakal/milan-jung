import React, { useState, useEffect } from "react";
import TextEditor from "../../common/Editor/TextEditor";
import { axiosImageInstance } from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const AddBlog = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [publish, setPublish] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEditorText = (value) => {
    setEditorText(value);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setImage(null);
    setPublish(false);
    setEditorText("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // let errors = {};
    let dataCheck = false;
    if (!title) {
      setErrors((errors) => ({ ...errors, title: "Please Fill Title Field" }));
      dataCheck = true;
    }
    if (!editorText) {
      setErrors((errors) => ({
        ...errors,
        description: "Add Some Content Here",
      }));
      dataCheck = true;
    }
    if (!author) {
      setErrors((errors) => ({
        ...errors,
        author: "Fill Author Here",
      }));
      dataCheck = true;
    }
    if (!image) {
      setErrors((errors) => ({
        ...errors,
        image: "Add Image First",
      }));
      dataCheck = true;
    }

    if (dataCheck) return;
    setLoader(true);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", editorText);
    formData.append("author", author);
    formData.append("is_published", publish);

    console.log(axiosImageInstance());

    axiosImageInstance
      .post(`blog/post-create/`, formData)
      .then((res) => {
        setLoader(false);
        toast.success("Sucessfully Posted");
        resetForm();
      })
      .catch((error) => {
        toast.error("Failed To Add");
        setLoader(false);
      });
  };

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
      <div className="mt-4">
        <div className="text-xl m-4 text-normaldark font-semibold">
          Add Blog{" "}
        </div>
        <div className="bg-white mx-6 rounded shadow-md mb-2">
          <div className="flex justify-between w-full px-10 border-b border-gray-300 pb-4 text-lg font-semibold uppercase  tracking-wide text-gray-700"></div>

          <form
            onSubmit={submitHandler}
            className="flex flex-col px-10 py-4 space-y-4"
          >
            <div>
              <div className="flex flex-col pb-5">
                <label
                  htmlFor="NAME"
                  className="form-label inline-block mb-2 text-gray-500 font-semibold"
                >
                  Blog Title
                </label>
                <div className=" mt-2 cursor-pointer">
                  <input
                    value={title}
                    onChange={(e) => {
                      errors.title = "";
                      setTitle(e.target.value);
                    }}
                    className=" w-full h-10 lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md px-3.5 py-1.5 focus:outline-none"
                    type="text"
                  />
                  {errors.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pb-5">
                <label
                  htmlFor="NAME"
                  className="form-label inline-block mb-2 text-ggray-500 font-semibold"
                >
                  Blog Description
                </label>
                <div className="w-full mt-4">
                  <TextEditor
                    handleEditorText={handleEditorText}
                    des={editorText}
                    value={() => setEditorText(editorText)}
                  />
                  {errors.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pb-5">
                <label
                  htmlFor="NAME"
                  className="form-label inline-block mb-2 text-gray-500 font-semibold"
                >
                  Author
                </label>
                <div className=" mt-2 cursor-pointer">
                  <input
                    value={author}
                    onChange={(e) => {
                      errors.author = "";
                      setAuthor(e.target.value);
                    }}
                    className=" placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-[380px] px-3.5 py-1.5 focus:outline-none"
                    type="text"
                  />
                  {errors.author && (
                    <div className="text-red-500 text-sm">{errors.author}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-3 pb-5">
                <label
                  htmlFor="NAME"
                  className="form-label inline-block mb-2 text-ggray-500 font-semibold"
                >
                  Blog Featured Image
                </label>
                <div className="w-full lg:w-3/4 mt-2 cursor-pointer">
                  <input
                    onChange={(e) => {
                      errors.image = "";
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                  />
                  {errors.image && (
                    <div className="text-red-500 text-sm">{errors.image}</div>
                  )}
                </div>
              </div>
              <div className="flex mt-3 space-x-3 items-center justify-between py-4">
                <span className="font-semibold text-gray-500">
                  Is Blog Published?
                </span>
                <div className="w-full lg:w-3/4  cursor-pointer">
                  <input
                    onChange={(e) => setPublish(!publish)}
                    checked={publish}
                    type="checkbox"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-5 mt-6 text-white">
                <div className="w-32 mx-5">
                  <button className="bg-darkgreen hover:bg-dark px-10 py-2 rounded">
                    {loader ? "Submitting" : "Submit"}
                  </button>
                </div>
                <div className="w-28 mx-5">
                  <button className="bg-darkgreen hover:bg-dark px-10 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
