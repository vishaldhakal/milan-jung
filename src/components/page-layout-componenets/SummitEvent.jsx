import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { TbHeart } from "react-icons/tb";
import { TiLocation } from "react-icons/ti";
import Summit from "../../assets/images/Summit.avif";

const PitchCompetition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="max-w-[1200px] w-full pt-10 pb-14 mx-auto">
        <div className="relative max-h-[470px] h-full max-w-[1200px] w-full overflow-hidden rounded-3xl">
          <div className="bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 absolute blur-2xl h-full w-full"></div>
          <img
            className="relative z-10 max-w-[940px] mx-auto w-full object-cover h-full overflow-hidden"
            src={Summit}
            alt=""
          />
        </div>
        <div className="mt-12 flex justify-between space-x-5">
          <div className="max-w-[720px] w-full">
            <div className="text-[#39364f] text-[1.125rem] leading-[1.5rem] font-semibold">
              Feb 25
            </div>
            <div className="text-[#1e0a3c] text-[3.25rem] leading-[4rem] font-extrabold">
              YOUTH IMPACT SUMMIT - EMPOWERING YOUTH TO DRIVE CHANGE
            </div>
            <p className="my-8 text-[0.875rem] text-[#39364f] leading-[1.5rem] break-words">
              <strong>
                This conference will provide a platform for attendees to learn
                from and connect with successful professionals.
              </strong>
            </p>

            <div className="mb-6">
              <div className="text-[#1e0a3c] text-[1.5rem] leading-[1.75rem] font-bold mb-4">
                When and where
              </div>
              <div className="grid grid-cols-2 gap-[56px]">
                <div className="flex w-full space-x-[14px]">
                  <div className="shrink-0 text-xl bg-[#f8f7fa] w-[40px] h-[40px] text-[#0124e9] grid place-items-center rounded-lg">
                    <AiTwotoneCalendar />
                  </div>
                  <div className="">
                    <div className="text-[1.125rem] leading-[1.5rem] font-semibold mb-2">
                      Date and time
                    </div>
                    <div className="text-[#6f7287] text-[0.875rem] leading-[1.25rem]">
                      <div>Sat, February 25, 2023,</div>
                      <div>11:00 AM – 8:00 PM PST</div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full space-x-[14px]">
                  <div className="shrink-0 text-xl bg-[#f8f7fa] w-[40px] h-[40px] text-[#0124e9] grid place-items-center rounded-lg">
                    <TiLocation />
                  </div>
                  <div className="">
                    <div className="text-[1.125rem] leading-[1.5rem] font-semibold mb-2">
                      Location
                    </div>
                    <div className="text-[#6f7287] text-[0.875rem] leading-[1.25rem]">
                      <div>
                        <strong>Anna Head Alumnae Hall</strong>
                        &nbsp; 2537 Haste St, Berkeley Berkeley, CA 94720 United
                        States
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[#1e0a3c] text-[1.5rem] leading-[1.75rem] font-bold">
              About this event
            </div>
            <div className="grid grid-cols-3 gap-[15px] my-4">
              <div className="flex items-center space-x-2">
                <span className="text-[#3659e3] grid place-items-center w-[40px] h-[40px] shrink-0 bg-[#f8f7fa] rounded-lg">
                  <BsClockHistory />
                </span>
                <div className="text-[#39364f] text-[14px] font-semibold">
                  9 hours
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#3659e3] grid place-items-center w-[40px] h-[40px] shrink-0 bg-[#f8f7fa] rounded-lg">
                  <IoTicketOutline />
                </span>
                <div className="text-[#39364f] text-[14px] font-semibold">
                  Mobile eTicket
                </div>
              </div>
            </div>

            {/* For Rich Text */}
            <div className="text-[#6f7287] text-[16px] leading-[1.5rem]">
              <div>
                This conference is targeted towards Nepali students and
                professionals in the USA. This includes undergraduate and
                graduate students, as well as professionals working in a variety
                of industries. We welcome attendees from all disciplines and
                industries, and encourage attendees to bring their diverse
                perspectives and experiences to the conference.
              </div>
              <div>
                As of now we have confirmed the following guests/panelists:
              </div>
              <ul className="list-disc  pl-[18px]">
                <li className="pt-2.5">
                  Hon. Gagan Kumar Thapa: Chief Guest/Panelist, Brain Gain and
                  Talent Retention (Bio: Gagan Thapa)
                </li>
                <li className="pt-2.5">
                  Mr. Jeevan Pokahrel, COO- UIC Alaska: Guest Speaker/Panelist
                  (Bio: Jeevan Pokharel)
                </li>
                <li className="pt-2.5">
                  Bhim Upadhaya (nepal perspective)
                  https://www.facebook.com/bhim.upadhyaya.1800
                </li>
                <li className="pt-2.5">
                  Kamal Dhakal, PhD - https://www.linkedin.com/in/kamaldhakal/
                </li>
                <li className="pt-2.5">
                  Niranjan Aryal, PhD
                  https://www.linkedin.com/in/niranjan-aryal-44a7ab15b/
                </li>
                <li className="pt-2.5">
                  For more information, please email Youthcoordinator@nrnusa.org
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-[360px] w-full">
            <div className="flex items-center justify-end mb-6 space-x-3">
              <button
                type="button"
                className="grid place-items-center text-xl hover:text-[#39364f] text-[#4b4d63] hover:bg-[#f8f7fa] rounded-full w-[40px] h-[40px] transition-all duration-[400ms]"
              >
                <TbHeart />
              </button>
              <button
                type="button"
                className="grid place-items-center text-xl hover:text-[#39364f] text-[#4b4d63] hover:bg-[#f8f7fa] rounded-full w-[40px] h-[40px] transition-all duration-[400ms]"
              >
                <FiUpload />
              </button>
            </div>
            <div className="w-full flex flex-col justify-center h-[204px] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_#eeedf2] sticky top-24 mb-6">
              <div className="text-[#39364f] text-center font-semibold truncate text-[1.125rem] leading-[1.5rem]">
                Free
              </div>
              <button
                type="button"
                className="w-full mt-6 text-white bg-midgreen p-3 hover:bg-normaldark h-11 font-semibold tracking-[0.2px] rounded transition duration-[400ms]"
              >
                Reserve a spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PitchCompetition;
