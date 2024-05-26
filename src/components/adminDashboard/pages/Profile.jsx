import { BsFillCameraFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import axiosInstance, { axiosImageInstance } from "../../api/axiosInstance";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { regularExpression } from "../../common/RegularExpression";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const [logo, setLogo] = useState();
  const userID = jwt_decode(localStorage.getItem("refresh_jung"))?.user_id;
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoID, setLogoID] = useState(null);
  const [slogan, setSlogan] = useState("");
  const [sloganImage, setSloganImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  const getLogo = () => {
    axiosInstance
      .get("/cms/logo-image-list/")
      .then((data) => {
        setLogo(Object?.values(data?.data[0])?.slice(1)[0]);
        setLogoID(Object?.values(data?.data[0])?.[0]);
      })
      .catch(() => {});
  };

  const updateLogo = (image) => {
    let formData = new FormData();
    formData.append("image", image);
    axiosImageInstance
      .patch(`/cms/logo-image-update/${logoID}/`, formData)
      .then(() => getLogo())
      .catch(() => {});
  };

  const getDetails = () => {
    getLogo();
    axiosInstance
      .get(`/auth/user-detail/${userID}/`)
      .then((data) => {
        setFullName(data?.data?.full_name);
        setUsername(data?.data?.username);
        setEmail(data?.data?.email);
        setPhoneNumber(data?.data?.contact_number);
        setSlogan(data?.data?.slogan);
        setSloganImage(data?.data?.slogan_image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);
  const updateDetails = (e) => {
    e.preventDefault();
    const { ExEmail } = regularExpression;
    let dataCheck = false;

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Please fill email" }));
      dataCheck(true);
    } else if (!ExEmail.test(email)) {
      setErrors((errors) => ({
        ...errors,
        email: "Please Enter The Valid Email",
      }));
      dataCheck(true);
    }
    if (!username) {
      setErrors((errors) => ({ ...errors, username: "Please add username" }));
      dataCheck(true);
    }

    if (dataCheck) return;
    setLoader(true);

    const formData = new FormData();
    fullname && formData.append("full_name", fullname);
    username && formData.append("username", username);
    email && formData.append("email", email);
    phoneNumber && formData.append("contact_number", phoneNumber);
    slogan && formData.append("slogan", slogan);
    uploadImage && formData.append("slogan_image", uploadImage);
    axiosImageInstance
      .patch(`/auth/user-update/${userID}/`, formData)
      .then(() => {
        toast.success("Sucessfully Updated");
        setLoader(false);
      })
      .catch((err) => {
        const { data } = err.response;

        try {
          toast.error(`${Object.values(data)[0]}`);
          setLoader(false);
        } catch (err) {
          toast.error("Something went wrong");
          setLoader(false);
        }
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
      <form onSubmit={updateDetails}>
        <div className="mt-4">
          <div className="text-xl m-4 text-normaldark font-semibold ">
            Your Profile
          </div>
          <div className="bg-white border border-slate-50 mx-6 rounded-lg shadow-md mb-2 py-4 min-h-[70vh]">
            <div className="px-4 sm:px-5">
              <div>
                <div className="relative w-32">
                  <img
                    className="rounded-full w-32 h-32 object-cover"
                    src={logo}
                    alt=""
                  />
                  <label htmlFor="pictureupload">
                    <BsFillCameraFill
                      className="text-gray-600 absolute bottom-0 right-1 cursor-pointer"
                      size={30}
                    />
                  </label>
                  <input
                    onChange={(e) => {
                      updateLogo(e.target.files[0]);
                      toast.success("Sucessfully updated Logo");
                    }}
                    hidden
                    type="file"
                    name=""
                    id="pictureupload"
                  />
                </div>
                <p className="italic text-gray-600">
                  Make sure to upload image less than 1mb in size.
                </p>
              </div>
              <div className="w-full lg:flex">
                <div className="w-full lg:w-[50%]">
                  <div className="">
                    <div className="my-3 py-2">
                      <label htmlFor="">Full Name</label>{" "}
                      <span className="italic text-gray-600 mx-2">
                        (This will also be shown as site title.)
                      </span>
                      <input
                        className="pl-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="my-3 py-2">
                      <label htmlFor="">Username</label>
                      <input
                        className="pl-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      {/* {errors?.username && (
                    <div>
                      <span className="text-red-600">{errors.username}</span>
                    </div>
                  )} */}
                    </div>
                    <div className="my-3 py-2">
                      <label htmlFor="">Email</label>
                      <span className="italic text-gray-600 mx-2">
                        (This will also be shown in site.)
                      </span>
                      <input
                        className="pl-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                        type="text"
                        value={email}
                        onChange={(e) => {
                          errors.email = "";
                          setEmail(e.target.value);
                        }}
                        required
                      />
                      {errors.email && (
                        <div>
                          <span className="text-red-600">{errors.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="my-3 py-2">
                      <label htmlFor="">Phone Number</label>
                      <input
                        className="pl-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green "
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="my-3 py-2">
                      <h2 className="">Slogal</h2>
                      <textarea
                        rows="3"
                        className="p-2 w-full border  rounded border-gray-300 focus:border-green resize-none break-words"
                        type="text"
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[50%] lg:px-10 mt-6 mb-10 lg:my-0">
                  <div>
                    <h2 className="text-lg">Slogal Background</h2>
                    <div className="my-4 w-full relative">
                      <img
                        alt="Slogal Background"
                        src={
                          uploadImage
                            ? URL.createObjectURL(uploadImage)
                            : sloganImage
                        }
                        className="rounded-md hover:opacity-75 transition-all duration-500 object-cover h-[300px]  w-[300px] lg:h-[400px]  lg:w-[450px]"
                      />
                      <div className="w-fit absolute flex items-center justify-center rounded top-2.5 left-2.5">
                        <label
                          className="flex items-center space-x-2 cursor-pointer px-2 py-1 text-white rounded-md bg-slate-700 bg-opacity-30 hover:bg-opacity-50 transition-all duration-200"
                          htmlFor="sloganbackground"
                        >
                          <span>Edit</span>
                          <FiEdit />
                        </label>
                        <input
                          onChange={(e) => setUploadImage(e.target.files[0])}
                          type="file"
                          hidden
                          id="sloganbackground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-darkgreen hover:bg-dark px-10 py-2 rounded text-white"
              >
                {loader ? "Updating" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
