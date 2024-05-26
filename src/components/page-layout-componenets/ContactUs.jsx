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
      <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Contact us
            </h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
              {" "}
              Do you think we can work together in trying to make world a better
              place? Please use the form below to reach out to me.
            </p>
          </div>

          <div class="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div class="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div class="overflow-hidden bg-white rounded-xl">
                <div class="p-6">
                  <svg
                    class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p class="mt-6 text-lg font-medium text-gray-900">
                    <a 
                    className="text-blue-600 hover:text-blue-800"
                    href="tel:+1 318 537-5075">+1 318 537-5075</a>
                  </p>
                  <p class="mt-1 text-lg font-medium text-gray-900">
                    <a 
                    className="text-blue-600 hover:text-blue-800"
                    href="tel:+977 9767276347">+977 9767276347</a>
                  </p>
                </div>
              </div>

              <div class="overflow-hidden bg-white rounded-xl">
                <div class="p-6">
                  <svg
                    class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="mt-6 text-lg font-medium text-gray-900">
                    {/* // katuwal@udel.edu */}
                    <a 
                    className="text-blue-600 hover:text-blue-800"
                    href="mailto:katuwal@udel.edu">
                      katuwal@udel.edu
                    </a>
                  </p>
                </div>
              </div>

              <div class="overflow-hidden bg-white rounded-xl">
                <div class="p-6">
                  <svg
                    class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p class="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                  Nepal
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} class="mt-14">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    Full Name
                  </label>
                  <div class="mt-2.5 relative">
                    <input
                      type="text"
                      name="name"
                      id=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <span class="text-red-500 text-sm">{errors.name}</span>
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    Address
                  </label>
                  <div class="mt-2.5 relative">
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id=""
                      placeholder="Enter your address"
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <span class="text-red-500 text-sm">{errors.address}</span>
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    Email Address
                  </label>
                  <div class="mt-2.5 relative">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id=""
                      placeholder="Enter your email"
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <span class="text-red-500 text-sm">{errors.email}</span>
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    Phone number
                  </label>
                  <div class="mt-2.5 relative">
                    <input
                      phoneNumber="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="number"
                      placeholder="Enter Phone Number"
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label for="" class="text-base font-medium text-gray-900">
                    Subject
                  </label>
                  <div class="mt-2.5 relative">
                    <input
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      id=""
                      placeholder="Enter your subject"
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <span class="text-red-500 text-sm">{errors.subject}</span>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="" class="text-base font-medium text-gray-900">
                    Message
                  </label>
                  <div class="mt-2.5 relative">
                    <textarea
                      name=""
                      id=""
                      placeholder=""
                      class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <button
                    disabled={loader ? true : false}
                    // class={`inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700` }
                    className={`${
                      loader ? "cursor-not-allowed" : "hover:bg-normaldark"
                    } w-full h-12 bg-midgreen rounded-md transition duration-200 text-white font-semibold`}
                  >
                    Send
                  </button>
                </div>

                
              </div>
            </form>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
