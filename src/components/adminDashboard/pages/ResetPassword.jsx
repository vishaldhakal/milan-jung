import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const validatePassword = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/password-reset/${uidb64}/${token}/`
        );
        if (response.statusText === "OK") {
          setShowSuccess(true);
        }
      } catch (error) {
        setShowError(true);
      }
    };
    validatePassword();
  }, [uidb64, token]);

  const submitHandler = (e) => {
    e.preventDefault();

    let passwordValidation =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    let submitFormat = {
      password: newPassword,
      token,
      uidb64,
    };

    let dataCheck = false;
    if (newPassword !== conPassword) {
      setErrors((errors) => ({
        ...errors,
        match: "Password doesn't match",
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
    setLoader(true);

    axiosInstance
      .patch("/auth/password-reset-complete/", JSON.stringify(submitFormat))
      .then(() => {
        toast.success("Sucessfully Updated");
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Failed to udpate");
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
      {showSuccess && (
        <section
          className="w-full h-screen flex flex-col justify-center px-5 py-10 overflow-y-auto"
          style={{
            background: "linear-gradient(to right, #bbd2c5, #536976, #292e49)",
          }}
        >
          <div className="text-center">
            <div className="text-white text-center tracking-tight font-semibold text-4xl leading-[4rem] mb-3">
              Milan Portfolio
            </div>
            <h1 className="text-white text-center tracking-tight  text-5xl leading-[4rem] mb-3">
              Forgot Your Password?
            </h1>
          </div>

          <div className="bg-white rounded-lg px-6 sm:px-10 py-7 w-full max-w-[476px] mx-auto mt-5">
            <form onSubmit={submitHandler}>
              <div className="my-5">
                <div className="relative ">
                  <label
                    htmlFor="New Password"
                    className="capitalize text-base font-semibold mb-1 text-gray-700 "
                  >
                    New Password
                  </label>
                  <input
                    className="placeholder-gray-400 py-2 px-4 w-full text-[#545454] font-semibold tracking-wide outline-none border rounded-lg  focus:outline-none transition duration-200 "
                    type={showNewPassword ? "text" : "password"}
                    name="New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrors("");
                    }}
                    placeholder="Enter Old Passowrd..."
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-200 hover:text-gray-400 absolute right-2 top-8 cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiFillEye size={26} />
                    ) : (
                      <AiFillEyeInvisible size={26} />
                    )}
                  </span>
                </div>
                {errors.match && (
                  <span className="text-red-500 text-sm">{errors.match}</span>
                )}
                {errors.strong && (
                  <span className="text-red-500 text-sm">{errors.strong}</span>
                )}
                <div className="relative mt-8">
                  <label
                    htmlFor="Confirm Password"
                    className="capitalize text-base font-semibold mb-1 text-gray-700 "
                  >
                    Confirm Password
                  </label>
                  <input
                    className="placeholder-gray-400 py-2 px-4 w-full text-[#545454] font-semibold tracking-wide outline-none border rounded-lg  focus:outline-none transition duration-200 "
                    type={showConfirmPassword ? "text" : "password"}
                    name="Confirm Password"
                    value={conPassword}
                    onChange={(e) => {
                      setConPassword(e.target.value);
                      setErrors("");
                    }}
                    placeholder="Enter Old Passowrd..."
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-200 hover:text-gray-400 absolute right-2 top-8 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiFillEye size={26} />
                    ) : (
                      <AiFillEyeInvisible size={26} />
                    )}
                  </span>
                </div>
                {errors.match && (
                  <span className="text-red-500 text-sm">{errors.match}</span>
                )}
                {errors.strong && (
                  <span className="text-red-500 text-sm">{errors.strong}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loader ? true : false}
                className={`${
                  loader ? "cursor-not-allowed" : "hover:bg-normaldark"
                }  "flex items-center justify-center mb-6 px-5 py-2 rounded-full bg-[#007057a6] hover:bg-[rgba(0,112,87,0.6)] focus:hover:bg-[rgba(0,112,87,0.65)] transition  duration-200 focus:shadow-[0_0_0_4px_rgba(0,112,87,0.5)] w-full text-xl font-medium text-white`}
              >
                {loader ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </section>
      )}
      {showError && (
        <div class="flex items-center justify-center min-h-screen bg-white py-48">
          <div class="flex flex-col">
            <div class="flex flex-col items-center">
              <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                INVALID LINK
              </div>

              <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                Looks like your link is either invalid or expired.
              </div>
              <div class="text-green my-10 font-bold text-7xl">
                <Link to="/forget-password">Try Again</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
