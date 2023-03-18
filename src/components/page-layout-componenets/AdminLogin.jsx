import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axiosInstance, { fontendBaseURL } from '../api/axiosInstance';

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({});

  const [datacheck, setDatacheck] = useState(false);

  const { username, password } = inputs;
  const [loader, setLoader] = useState(false);
  const [invalid, setInvalid] = useState('');
  const [passwordView, setPasswordView] = useState(false);

  const formInputs = [
    {
      label: 'Email',
      type: 'text',
      placeholder: 'Username or Email',
      name: 'username',
      value: username,
      validation: error?.username,
    },
    {
      label: 'Password',
      type: passwordView ? 'text' : 'password',
      placeholder: 'Password',
      name: 'password',
      value: password,
      validation: error?.password,
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setError(validate());
    setDatacheck(true);
  };

  const validate = () => {
    let errors = {};
    if (!username) {
      errors.username = 'Username or Email is Required';
    }
    if (!password) {
      errors.password = 'Password is Required';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && datacheck) {
      setLoader(true);
      const postData = {
        username,
        password,
      };
      axiosInstance
        .post('/auth/login/', postData)
        .then((res) => {
          const { access, refresh } = res?.data;
          localStorage.setItem('access_jung', access);
          localStorage.setItem('refresh_jung', refresh);
          setLoader(false);
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors[0]) {
            setInvalid(error?.response?.data?.non_field_errors[0]);
            setLoader(false);
          } else {
            setInvalid('Something went wrong');
            setLoader(false);
          }
        });
    }
  }, [error]);

  const changeHandler = ({ target: { name, value } }) => {
    setInvalid(false);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  if (localStorage.getItem('refresh_jung')) {
    if (document.referrer === `${fontendBaseURL}/admin-dashboard/students`) {
      return window.location.assign('/admin-dashboard/students');
    } else if (
      document.referrer === `${fontendBaseURL}/admin-dashboard/contact-us`
    ) {
      return window.location.assign('/admin-dashboard/contact-us');
    } else {
      return window.location.assign('/admin-dashboard/profile');
    }
  }
  return (
    <>
      <section
        className="w-full h-screen flex flex-col justify-center px-5 py-10 overflow-y-auto"
        style={{
          background: 'linear-gradient(to right, #bbd2c5, #536976, #292e49)',
        }}
      >
        <div className="text-center">
          <div className="text-white text-center tracking-tight font-semibold text-4xl leading-[4rem] mb-3">
            Milan Portfolio
          </div>
          <h1 className="text-white text-center tracking-tight  text-5xl leading-[4rem] mb-3">
            Sign in to your account
          </h1>
        </div>

        <div className="bg-white rounded-lg px-6 sm:px-10 py-7 w-full max-w-[476px] mx-auto mt-5">
          <form onSubmit={submitHandler}>
            {formInputs?.map((input, index) => {
              const { type, placeholder, name, value, label, validation } =
                input;

              return (
                <div key={index} className="mb-4 relative">
                  <label
                    htmlFor={label}
                    className="capitalize text-base font-semibold mb-1 text-gray-700 "
                  >
                    {label}
                  </label>
                  <input
                    className="placeholder-gray-400 py-2 px-4 w-full text-[#545454] font-medium tracking-wide outline-none border rounded-lg  focus:outline-none transition duration-200 "
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => changeHandler(e)}
                    placeholder={placeholder}
                  />
                  {name === 'password' && (
                    <span
                      onClick={() => setPasswordView(!passwordView)}
                      className="text-gray-400 hover:text-gray-500 absolute right-2.5 top-[36px] cursor-pointer"
                    >
                      {passwordView ? (
                        <AiFillEye size={20} />
                      ) : (
                        <AiFillEyeInvisible size={20} />
                      )}
                    </span>
                  )}
                  {validation && (
                    <span className="text-red-500 text-sm font-medium mt-1">
                      {validation}
                    </span>
                  )}
                </div>
              );
            })}

            <div className="text-right mb-6">
              <Link
                className="font-medium tracking-wide text-[14px] text-[rgba(0,112,87,0.9)] hover:text-[#619B8E] transition duration-200"
                to={'/forget-password'}
              >
                Forgot password?
              </Link>
            </div>
            {invalid && (
              <p className="text-red-500 italic text-base my-2">{invalid}</p>
            )}
            <button
              type="submit"
              disabled={loader ? true : false}
              className={`${
                loader ? 'cursor-not-allowed' : 'hover:bg-normaldark'
              }  "flex items-center justify-center mb-6 px-5 py-2 rounded-full bg-[#007057a6] hover:bg-[rgba(0,112,87,0.6)] focus:hover:bg-[rgba(0,112,87,0.65)] transition  duration-200 focus:shadow-[0_0_0_4px_rgba(0,112,87,0.5)] w-full text-xl font-medium text-white`}
            >
              {loader ? 'Logging In...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
