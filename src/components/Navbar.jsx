import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import SideBar from './Sidebar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axiosInstance from './api/axiosInstance';
import BookModal from './common/BookModal';
import { BsTwitter } from 'react-icons/bs';

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [logo, setLogo] = useState();
  const [title, setTitle] = useState('');
  const [titleShort, setTitleShort] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const location = useLocation();

  useEffect(() => {
    axiosInstance
      .get('/cms/logo-image-list/')
      .then((data) => setLogo(Object?.values(data?.data[0])?.slice(1)[0]))
      .catch((err) => console.log(err));

    axiosInstance
      .get('/auth/user-public-list/')
      .then((data) => setTitle(data?.data[0]?.full_name))
      .catch((err) => console.log(err?.response));

    axiosInstance
      .get('/cms/find-us-list/')
      .then((res) => setSocialMedia(res?.data?.[0]?.twitter))
      .catch((err) => console.log(err));
  }, []);

  if (window.innerWidth <= 1024) {
    window.addEventListener('click', () => {
      setNavbar(false);
    });
  }

  useEffect(() => {
    let titleTem = title;
    setTitleShort(
      titleTem
        ?.split(' ')
        ?.map((item) => item?.split('')?.[0])
        ?.join('')
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="w-full bg-gray-100 h-16 md:h-20 bg-opacity-90 top-0 z-30 sticky left-0 pt-1  ">
        <div className="max-w-[2000px] px-3 sm:px-5 lg:px-5 mx-auto">
          <div className="flex justify-between mb-3 pt-2 lg:px-2 flex-wrap  w-full">
            <div className="flex items-center px-0 md:pr-4">
              <span className="w-10 h-10 md:w-12 md:h-12  shrink-0 rounded-full overflow-hidden mr-4">
                <img
                  className="h-full w-full object-cover text-gray-700 text-sm font-medium"
                  src={logo}
                  alt={titleShort}
                />
              </span>
              <div
                className={`hidden md:block max-w-full w-full  ${localStorage.getItem('refresh_jung') &&
                  'xl:max-w-[160px] 2xl:max-w-[350px]'
                  } text-lg lg:text-xl flex items-center text-gray-600 font-bold`}
              >
                {title}

                {socialMedia && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1.5 outline-none focus:outline-none"
                    href={socialMedia}
                  >
                    <BsTwitter
                      size={18}
                      className={`text-slate-400 transition duration-200 hover:text-[#1DA1F2]`}
                    />
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center xl:hidden">
              <button
                className="px-2 text-2xl md:text-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbar(!navbar);
                }}
              >
                <GiHamburgerMenu />
              </button>
            </div>
            <div
              className={`mt-2 w-full xl:inline-flex  xl:flex-grow xl:w-auto xl:mt-0`}
            >
              <div className="hidden xl:inline-flex lg:flex-row lg:ml-auto place-items-center px-2  font-medium text-slate-500">
                <NavLink
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                    isActive
                      ? 'py-2 px-2.5 mx-0.5 text-sm font-semibold bg-normaldark rounded-sm text-white'
                      : 'py-2 px-2.5 mx-0.5 text-sm font-semibold hover:bg-normaldark rounded-sm hover:text-white'
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="about-us"
                  className={({ isActive }) =>
                    isActive
                      ? 'py-2 px-2.5 mx-0.5 text-sm font-semibold bg-normaldark rounded-sm text-white'
                      : 'py-2 px-2.5 mx-0.5 text-sm font-semibold hover:bg-normaldark rounded-sm hover:text-white'
                  }
                >
                  ABOUT ME
                </NavLink>
                <NavLink
                  to="blogs"
                  className={({ isActive }) =>
                    isActive
                      ? 'py-2 px-2.5 mx-0.5 text-sm font-semibold bg-normaldark rounded-sm text-white'
                      : 'py-2 px-2.5 mx-0.5 text-sm font-semibold hover:bg-normaldark rounded-sm hover:text-white'
                  }
                >
                  ARTICLES
                </NavLink>
                {/* <NavLink
                  to="gallery"
                  className={({ isActive }) =>
                    isActive
                      ? 'py-2 px-2.5 mx-0.5 text-sm font-semibold bg-normaldark rounded-sm text-white'
                      : 'py-2 px-2.5 mx-0.5 text-sm font-semibold hover:bg-normaldark rounded-sm hover:text-white'
                  }
                >
                  GALLERY
                </NavLink> */}
                <NavLink
                  to="videos"
                  className={({ isActive }) =>
                    isActive
                      ? 'py-2 px-2.5 mx-0.5 text-sm font-semibold bg-normaldark rounded-sm text-white'
                      : 'py-2 px-2.5 mx-0.5 text-sm font-semibold hover:bg-normaldark rounded-sm hover:text-white'
                  }
                >
                  VIDEOS
                </NavLink>

                <div className="relative peer_hover_main">
                  <div
                    className={`${(location?.pathname ===
                      '/civicengagement&initiative/pitch_competition' ||
                      location?.pathname ===
                      '/civicengagement&initiative/pitch_competition' ||
                      location?.pathname ===
                      '/civicengagement&initiative/youth_impact_summit') &&
                      'bg-normaldark text-white'
                      } uppercase peer_hovered py-2 px-2.5 mx-0.5 font-semibold hover:bg-normaldark rounded-sm hover:text-white`}
                  >
                    Civic Engagement
                  </div>
                  <ul className="peer_to_hover">
                    <NavLink
                      to="civicengagement&initiative/pitch_competition"
                      className={({ isActive }) =>
                        isActive
                          ? 'block cursor-default transition duration-200 w-full py-2.5 px-5  text-slate-500  bg-slate-300 bg-opacity-80   border border-transparent'
                          : 'block cursor-pointer transition duration-200 w-full py-2.5 px-5 text-slate-500  hover:bg-slate-300 hover:bg-opacity-80 border border-transparent'
                      }
                    >
                      Pitch Competition
                    </NavLink>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? 'block cursor-default transition duration-200 w-full py-2.5 px-5  text-slate-500  bg-slate-300 bg-opacity-80   border border-transparent'
                          : 'block cursor-pointer transition duration-200 w-full py-2.5 px-5 text-slate-500  hover:bg-slate-300 hover:bg-opacity-80 border border-transparent'
                      }
                    >
                      Youth Conference
                    </NavLink>
                    <NavLink
                      to="/civicengagement&initiative/youth_impact_summit"
                      className={({ isActive }) =>
                        isActive
                          ? 'block cursor-default transition duration-200 w-full py-2.5 px-5  text-slate-500  bg-slate-300 bg-opacity-80   border border-transparent'
                          : 'block cursor-pointer transition duration-200 w-full py-2.5 px-5 text-slate-500  hover:bg-slate-300 hover:bg-opacity-80 border border-transparent'
                      }
                    >
                      Youth Impact Summit
                    </NavLink>
                  </ul>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center">
              <Link
                to="/freebook"
                className="bg-green p-2 rounded text-white font-semibold text-sm uppercase hover:bg-normaldark"
              >
                scholarships
              </Link>
              {localStorage.getItem('refresh_jung') && (
                <Link
                  to="/admin-dashboard/profile"
                  className="ml-2 hover:bg-red-600 bg-red-500 p-2 rounded text-white font-semibold uppercase text-sm"
                >
                  dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <SideBar
        logo={logo}
        navbar={navbar}
        setNavbar={setNavbar}
      />
    </>
  );
};

export default NavBar;
