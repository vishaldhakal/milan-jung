import { useState } from "react";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "./api/axiosInstance";
import { regularExpression } from "./common/RegularExpression";
import BookModal from "./common/BookModal";

const QuestionsPage = () => {
  //Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const [studentDetail, setStudentDetail] = useState();
  const [questionID, setQuestionID] = useState();
  const [answer, setAnswer] = useState();

  const [showQuestions, setShowQuestion] = useState(false);

  const [isGraduated, setIsGraduated] = useState(true);

  //State for validation of form
  const [dataCheck, setDataCheck] = useState(false);

  //Fetching Questions and rendering questions
  const [allQuestions, setAllQuestions] = useState();

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getAllQuestions = () => {
    axiosInstance
      .get("/cms/question-list/")
      .then((data) => {
        setAllQuestions(data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getAllQuestions();
  }, []);

  const { ExPhone, ExAddress, ExGrade, ExEmail, ExSubject } = regularExpression;
  const validate = (firstName, lastName, email, phone_number) => {
    let errors = {};
    if (!firstName) {
      errors.firstName = "Please Fill First Name.";
    }
    if (!lastName) {
      errors.lastName = "Please Fill Last Name.";
    }
    if (!email) {
      errors.email = "Please Fill The Email.";
    } else if (!ExEmail.test(email)) {
      errors.email = "Please Enter The Valid Email.";
    }

    // if (!grade) {
    //   errors.grade = "Please Fill The Grade.";
    // } else if (!ExGrade.test(grade)) {
    //   errors.grade = "Please Enter The Valid Grade.";
    // }
    if (!phone_number) {
      errors.phoneNumber = "Please Fill The Phone Number.";
    } else if (!ExPhone.test(phone_number)) {
      errors.phoneNumber = "Please Enter The Valid Phone Number.";
    }
    // if (!address) {
    //   errors.address = "Please Fill The Address";
    // } else if (!ExAddress.test(address)) {
    //   errors.address = "Please Enter The Valid Address";
    // }
    return errors;
  };

  useEffect(() => {
    if (!Object.keys(errors).length && dataCheck) {
      const submittedMail = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number,
        address,
      };
      setStudentDetail(submittedMail);
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValue = validate(firstName, lastName, email, phone_number);
    setErrors(validate(firstName, lastName, email, phone_number));
    setDataCheck(true);
    console.log(errorValue);
    if (Object.values(errorValue)?.length === 0 && !answer) {
      setErrors((prev) => ({
        ...prev,
        questionAnswer: "Please Enter An Answer",
      }));
      return false;
    }
    if (Object.values(errorValue)?.length === 0) {
      setLoader(true);
      const finalSubmit = {
        answer: {
          question: questionID,
          answer,
        },
        user: studentDetail,
      };
      axiosInstance
        .post(`/cms/answer-create/`, finalSubmit)
        .then((data) => {
          setLoader(false);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone_Number("");
          setAnswer("");
          toast.success("Answer Submitted Successfully");
          setTimeout(() => navigate("/"), 3000);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  
  return (
    <>
    <BookModal freeBook={isGraduated} setFreeBook={setIsGraduated} />
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

      <div className="mx-auto mb-10 mt-10 container" id="contactusSection">
        <div className="max-w-[1000px] mx-auto px-5 ">
          <div className="">
            <div className="flex justify-center">
              <div className="flex flex-col mb-6 items-center w-full text-3xl font-bold">
                <div className="text-dark">Win Free Books: Enter Now</div>
                <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
                <div className="h-[1px] bg-gray-400 w-[50px]"></div>
              </div>
            </div>
            <p className="text-center mt-6 font-medium text-[18px] sm:text-[20px] text-gray-800">
             
              Answer below and enter a chance to get free books worth Rs. 1000
              <br/>
            </p>
          </div>

          <div className="flex flex-col mb-3 items-center w-full text-3xl font-bold">
            {/* <div className="text-dark">Question</div>
            <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
            <div className="h-[1px] bg-gray-400 w-[50px]"></div> */}
          </div>

          <form onSubmit={handleSubmit}>
            {allQuestions?.map((questions) => {
              const { question, id } = questions;

              return (
                <div key={id} className="my-4">
                  <h1 className="font-bold text-[18px] my-2">{question}</h1>
                  <textarea
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setQuestionID(id);
                    }}
                    message="message"
                    rows="4"
                    type="text"
                    placeholder="Answer should not be more than 2 sentence...."
                    className="rounded border shadow-md border-gray-200 w-full pt-2 px-3.5 placeholder-gray-400 tracking-wide text-gray-700 resize-none focus:outline-none"
                  />
                  <span className="text-red-500 text-sm">
                    {errors.questionAnswer}
                  </span>
                </div>
              );
            })}
            <div className="grid md:grid-cols-2 gap-3 mt-10">
              <div>
                <label className=" flex text-gray-500 font-bold mb-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  autoComplete="given-name"
                  placeholder="Enter First Name"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-200 rounded-md shadow-md w-full px-3.5 py-1.5 focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              </div>
              <div>
                <label className=" flex text-gray-500 font-bold mb-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  autoComplete="family-name"
                  placeholder="Enter Last Name"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border border-gray-200 rounded-md shadow-md w-full px-3.5 py-1.5 focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              </div>
              <div>
                <label className="flex text-gray-500 font-bold mb-1">
                  Email
                </label>
                <input
                  email="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter email address"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border-gray-200 border rounded-md w-full px-3.5 py-1.5 shadow-md focus:outline-none"
                />
                <span className="text-red-500 text-sm">{errors.email}</span>
              </div>
              <div>
                <label className="flex text-gray-500 font-bold mb-1 ">
                  Phone number
                </label>
                <input
                  phoneNumber="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhone_Number(e.target.value)}
                  type="number"
                  placeholder="Enter Phone Number"
                  className="placeholder-gray-400 tracking-wide text-gray-700 border-gray-200 border rounded-md w-full px-3.5 py-1.5 shadow-md focus:outline-none"
                />
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
              </div>
            </div>

            <button
              className="hover:bg-normaldark w-full mt-4 h-12 bg-midgreen
                  rounded-md transition duration-200 text-white font-semibold"
            >
              {loader ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
