import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance.jsx";
import { regularExpression } from "../common/RegularExpression.js";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const [loader, setLoader] = useState(false);
  const [dataCheck, setDataCheck] = useState(false);

  const resetForm = () => {
    setName("");
    setMessage("");
    setEmail("");
    setSubject("");
    setPhoneNumber("");
    setAddress("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(name, message, email, subject, phoneNumber, address));
    setDataCheck(true);
  };

  const validate = (name, message, email, subject, phoneNumber, address) => {
    const { ExEmail, ExName, ExAddress, ExSubject, ExPhone } =
      regularExpression;

    let errors = {};
    if (!name) {
      errors.name = "Please Fill The Name.";
    } else if (!ExName.test(name)) {
      errors.name = "Please Enter The Valid Name";
    }
    if (!message) {
      errors.message = "Please This Field.";
    }
    if (!email) {
      errors.email = "Please Fill The Email.";
    } else if (!ExEmail.test(email)) {
      errors.email = "Please Enter The Valid Email.";
    }

    if (!subject) {
      errors.subject = "Please Fill The Subject.";
    } else if (!ExSubject.test(subject)) {
      errors.subject = "Please Enter The Valid Subject";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Please Fill The Phone Number.";
    } else if (!ExPhone.test(phoneNumber)) {
      errors.phoneNumber = "Please Enter The Valid Phone Number";
    }
    if (!address) {
      errors.address = "Please Fill The Address";
    } else if (!ExAddress.test(address)) {
      errors.address = "Please Enter The Valid Address";
    }
    return errors;
  };

  useEffect(() => {
    if (!Object.keys(errors).length && dataCheck) {
      setLoader(true);

      const submittedMail = {
        name,
        message,
        email,
        subject,
        phone_number: phoneNumber,
        address,
      };
      try {
        axiosInstance.post(
          "/cms/contact-me-create/",
          JSON.stringify(submittedMail)
        );
        setLoader(false);
        toast.success("Form Submitted Successfully ");
      } catch (error) {
        setLoader(false);
      }
      resetForm();
    }
  }, [errors]);

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
      <div className="mx-auto  container " id="contactusSection">
        <div className=" mx-auto px-5 ">
          <div className="">
            <div className="flex justify-center">
              <div className="flex flex-col mb-6 items-center w-full text-3xl font-bold">
                <div className="text-dark">Contact Me</div>
                <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
                <div className="h-[1px] bg-gray-400 w-[50px]"></div>
              </div>
            </div>
            <p className="text-center mt-6 font-medium text-[18px] sm:text-[20px] text-gray-800">
              Do you think we can work together in trying to make world a better
              place? Please use the form below to reach out to me.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="grid md:grid-cols-2 mt-10 ">
              <div className="p-2">
                <label className=" flex text-gray-500 font-bold mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-300 rounded-md shadow w-full px-3.5 py-2.5 focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.name}</span>
              </div>
              <div className="p-2">
                <label className="flex text-gray-500 font-bold mb-1 ">
                  Address
                </label>
                <input
                  address="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Address"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border-gray-300 border rounded-md w-full px-3.5 py-2.5 shadow focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.address}</span>
              </div>
              <div className="p-2">
                <label className="flex text-gray-500 font-bold mb-1">
                  Email
                </label>
                <input
                  email="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter email address"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border-gray-300 border rounded-md w-full px-3.5 py-2.5 shadow focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.email}</span>
              </div>
              <div className="p-2">
                <label className="flex text-gray-500 font-bold mb-1 ">
                  Phone Number
                </label>
                <input
                  phoneNumber="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="Enter Phone Number"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border-gray-300 border rounded-md w-full px-3.5 py-2.5 shadow focus:outline-none"
                />
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
              </div>
            </div>
            <div className="p-2">
              <label className="flex text-gray-500 font-bold mb-1 ">
                Subject
              </label>
              <input
                subject="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Enter Subject"
                className=" placeholder-gray-400 tracking-wide text-gray-700 border-gray-300 border rounded-md w-full px-3.5 py-2.5 shadow focus:outline-none"
              />
              <span className="text-red-500 text-sm">{errors.subject}</span>
            </div>
            <div className="p-2">
              <label className="flex text-gray-500 font-bold mb-1">
                Message
              </label>
              <textarea
                message="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                type="text"
                placeholder="Wite a message...."
                className="rounded  border shadow-md border-gray-300 w-full pt-2 px-3.5 placeholder-gray-400 tracking-wide text-gray-700 resize-none focus:outline-none"
              />
              <span className="text-red-500 text-sm">{errors.message}</span>

              <div className="flex justify-center my-4">
                <button
                  disabled={loader ? true : false}
                  className={`${
                    loader ? "cursor-not-allowed" : "hover:bg-normaldark"
                  } w-screen h-12 bg-midgreen rounded-md transition duration-200 text-white font-semibold`}
                >
                  {loader ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
