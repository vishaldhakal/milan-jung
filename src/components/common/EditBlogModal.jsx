import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance, { axiosImageInstance } from "../api/axiosInstance";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import TextEditor from "./Editor/TextEditor";
import { toast, ToastContainer } from "react-toastify";

function EditBlogModal({ editModalOpen, setEditModalOpen, slug, getAllBlogs }) {
  //   const [blog, setBlog] = useState();
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [publish, setPublish] = useState(false);
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
      setErrors((errors) => ({ ...errors, title: "Please fill title field" }));
      dataCheck = true;
    }
    if (!editorText) {
      setErrors((errors) => ({
        ...errors,
        description: "Please add some content here",
      }));
      dataCheck = true;
    }
    if (!author) {
      setErrors((errors) => ({
        ...errors,
        author: "Please add author here",
      }));
      dataCheck = true;
    }

    if (dataCheck) return;

    let formData = new FormData();
    formData.append("title", title);
    image && formData.append("image", image);
    formData.append("content", editorText);
    formData.append("author", author);
    formData.append("is_published", publish);

    axiosImageInstance
      .patch(`/blog/post-update/${slug}/`, formData)
      .then((res) => {
        toast.success("Sucessfully Updated");
        resetForm();
        getAllBlogs();
        setEditModalOpen(false);
      })
      .catch((error) => toast.error("Failed to Update"));
  };

  useEffect(() => {
    if (editModalOpen) {
      const getBlog = () => {
        axiosInstance
          .get(`/blog/post-detail/${slug}/`)
          .then((response) => {
            //   setBlog(response?.data);
            const { data } = response;
            setTitle(data?.title);
            setAuthor(data?.author);
            setEditorText(data?.content);
            setPublish(data?.is_published);
          })
          .catch((error) => {});
      };
      getBlog();

      return () => {
        setTitle("");
        setAuthor("");
        setEditorText("");
        setPublish(false);
      };
    }
  }, [editModalOpen]);

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
      <Transition appear show={editModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setEditModalOpen(false)}
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
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="my-4 w-full max-w-[850px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit the blog
                  </Dialog.Title>

                  <div className="mt-5">
                    <div className="w-full lg:flex lg:space-x-6 space-y-6 lg:space-y-0">
                      <div className="container flex justify-center">
                        <div className="bg-white rounded-lg shadow-md border flex flex-col py-5 h-auto w-full">
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
                                    onChange={(e) => setTitle(e.target.value)}
                                    className=" w-full h-10 lg:w-2/4 placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md px-3.5 py-1.5 focus:outline-none"
                                    type="text"
                                  />
                                  {errors.title && (
                                    <div className="text-red-500 text-sm">
                                      {errors.title}
                                    </div>
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
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className=" placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow-md w-3/4 lg:w-[380px] px-3.5 py-1.5 focus:outline-none"
                                    type="text"
                                  />
                                  {errors.author && (
                                    <div className="text-red-500 text-sm">
                                      {errors.title}
                                    </div>
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
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                    type="file"
                                  />
                                  {/* {errors.image && (
                                    <div className="text-red-500 text-sm">
                                      {errors.image}
                                    </div>
                                  )} */}
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
                                <div className="w-32">
                                  <button className="bg-darkgreen hover:bg-dark px-10 py-2 rounded">
                                    Submit
                                  </button>
                                </div>
                                <div className="w-28">
                                  <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="bg-darkgreen hover:bg-dark px-10 py-2 rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center absolute top-0 right-4">
                    <button
                      onClick={() => setEditModalOpen(false)}
                      type="button"
                      className=" text-darkgreen "
                    >
                      <AiFillCloseCircle size={30} />
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
}
export default EditBlogModal;
