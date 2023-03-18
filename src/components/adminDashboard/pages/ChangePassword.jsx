import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./../../api/axiosInstance";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [userID, setUserID] = useState(
    jwt_decode(localStorage.getItem("refresh_jung")).user_id
  );
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [currentPasswordView, setCurrentPasswordView] = useState(false);
  const [newPasswordView, setNewPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [errors, setErrors] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const formReset = () => {
      setOldPassword("");
      setNewPassword("");
      setConPassword("");
    };

    let passwordValidation =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const updatedPass = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    let dataCheck = false;
    if (newPassword !== conPassword) {
      setErrors((errors) => ({
        ...errors,
        match: "New Password doesn't match with Confirm Password",
      }));
      dataCheck(true);
    }
    if (!passwordValidation.test(newPassword)) {
      setErrors((errors) => ({
        ...errors,
        strong:
          "Password must contain 1 capital letter, 1 symbol & 1 number and should be atleast of 8 characters",
      }));
      dataCheck(true);
    }
    if (dataCheck) return;

    axiosInstance
      .put(`/auth/change-password/${userID}/`, updatedPass)
      .then((data) => {
        toast.success("Password changed");
        formReset();
      })
      .catch((err) => {
        const { data } = err.response;
        try {
          toast.error(`${Object.values(data)[0]?.[0]}`);
        } catch (error) {}
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
        <div className="text-xl m-4 text-normaldark font-semibold ">
          Change Password
        </div>
      </div>
      <div className="bg-white mx-6 rounded shadow-md mb-2 min-h-[70vh]">
        <form onSubmit={submitHandler} className="mx-4 my-2">
          <div className="w-full md:w-2/3 lg:w-1/3 text-sm md:text-base">
            <div className="my-0 p-2 ">
              <label htmlFor="">Current Password</label>
              <div className="relative">
                <input
                  className="my-1 px-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                  type={currentPasswordView ? "text" : "password"}
                  placeholder="Enter Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <span
                  onClick={() => setCurrentPasswordView(!currentPasswordView)}
                  className="text-gray-200 hover:text-gray-400 absolute right-2 top-3 cursor-pointer"
                >
                  {currentPasswordView ? (
                    <AiFillEye size={26} />
                  ) : (
                    <AiFillEyeInvisible size={26} />
                  )}
                </span>
              </div>
            </div>
            <div className="my-3 p-2">
              <label htmlFor="">New Password</label>
              <div className="relative">
                <input
                  className="my-1 px-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                  type={newPasswordView ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrors("");
                  }}
                />
                <span
                  onClick={() => setNewPasswordView(!newPasswordView)}
                  className="text-gray-200 hover:text-gray-400 absolute right-2 top-3 cursor-pointer"
                >
                  {newPasswordView ? (
                    <AiFillEye size={26} />
                  ) : (
                    <AiFillEyeInvisible size={26} />
                  )}
                </span>
              </div>
              {errors.match && (
                <div className="text-red-500 text-sm">{errors.match}</div>
              )}
              {errors.strong && (
                <div className="text-red-500 text-sm">{errors.strong}</div>
              )}
            </div>
            <div className="my-3 p-2">
              <label htmlFor="">Confirm Password</label>
              <div className="relative">
                <input
                  className="my-1 px-2 w-full border h-[2.5rem] rounded border-gray-300 focus:border-green"
                  type={confirmPasswordView ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={conPassword}
                  onChange={(e) => {
                    {
                      setConPassword(e.target.value);
                      setErrors("");
                    }
                  }}
                />
                <span
                  onClick={() => setConfirmPasswordView(!confirmPasswordView)}
                  className="text-gray-200 hover:text-gray-400 absolute right-2 top-3 cursor-pointer"
                >
                  {confirmPasswordView ? (
                    <AiFillEye size={26} />
                  ) : (
                    <AiFillEyeInvisible size={26} />
                  )}
                </span>
              </div>
              {errors.match && (
                <div className="text-red-500 text-sm">{errors.match}</div>
              )}
              {errors.strong && (
                <div className="text-red-500 text-sm">{errors.strong}</div>
              )}
            </div>
            <button className="bg-darkgreen hover:bg-dark px-10 py-2 rounded text-white">
              Change
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
