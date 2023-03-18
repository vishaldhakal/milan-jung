import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    const resetForm = {
      email,
    };
    axiosInstance
      .post("/auth/password-reset/", JSON.stringify(resetForm))
      .then((response) => {
        setLoader(false);
        setSuccess(response?.data?.success);
      })
      .catch((err) => {
        setError("This Email Is Not Registered Or Valid");
        setLoader(false);
      });
  };

  return (
    <>
      <section
        className="w-full h-screen flex flex-col justify-center px-5 py-10 overflow-y-auto"
        style={{
          background: "linear-gradient(to right, #bbd2c5, #536976, #292e49)",
        }}
      >
        <div className="text-white text-center tracking-tight font-semibold text-4xl leading-[4rem] mb-3">
          Milan Portfolio
        </div>
        <h1 className="text-white text-center tracking-tight  text-5xl leading-[4rem] mb-3">
          Forget Password
        </h1>
        <div className="flex justify-center items-center mb-7 text-[15px] tracking-wide">
          <span className="text-[#BAFFB4] mr-1.5 font-bold">Or</span>
          <Link
            to="/login"
            className="text-[#d5dff5] pb-0.5 underline font-semibold cursor-pointer hover:text-white transition duration-200"
          >
            sign in to your account
          </Link>
        </div>
        <h1 className="text-white text-center tracking-tight  mb-3">
          We get it, stuff happens. Just enter your email address below.
          <br />
          We'll send you a link to reset your password!
        </h1>

        <div className="bg-white rounded-lg px-6 sm:px-10 py-9 w-full max-w-[476px] mx-auto mt-5">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="capitalize text-base font-semibold mb-1 text-gray-700"
              >
                Email
              </label>
              <input
                className="placeholder-gray-400 py-2 px-4 w-full text-[#545454] font-medium tracking-wide outline-none border rounded-lg  focus:outline-none transition duration-200 "
                type="text"
                name="email"
                value={email}
                placeholder="Enter Email Address..."
                onChange={(e) => {
                  setError(null);
                  setSuccess(null);
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center px-5 py-2 rounded-full bg-[#007057a6] hover:bg-[rgba(0,112,87,0.6)] focus:hover:bg-[rgba(0,112,87,0.65)] transition  duration-200 focus:shadow-[0_0_0_4px_rgba(0,112,87,0.5)] w-full text-xl font-medium text-white"
            >
              {loader ? "Submitting" : "Submit"}
            </button>
          </form>
          {error && <div className="px-3 italic text-red-500">{error}</div>}
          {success && (
            <div className="px-3 italic text-lightgreen">{success}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
