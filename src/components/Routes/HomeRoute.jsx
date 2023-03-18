import * as React from "react";
import { Form, Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Blog from "../page-layout-componenets/Blog";
import AdminLogin from "../page-layout-componenets/AdminLogin";
import VideoPage from "../page-layout-componenets/VideoPage";
import QuestionsPage from "../QuestionsPage";
import NavBar from "../Navbar";
import Footer from "../Footer";
import DetailedBlogPage from "../DetailsBlogPage";
import AboutUs from "../page-layout-componenets/AboutUs";
import Page from "../EntrepreneurshipForm.jsx/Page";
import SummitEvent from "../page-layout-componenets/SummitEvent";
import PageLoader from "../common/Loaders/PageLoader";
const HomePage = React.lazy(() => import("../Homepage"));

const HomeRoute = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense
              fallback={
                <div
                  className="grid place-items-center bg-gray-100 text-lg text-white"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 999999999,
                  }}
                >
                  <div className="shrink-0">
                    <PageLoader />
                  </div>
                </div>
              }
            >
              <HomePage />
            </React.Suspense>
          }
        />
        <Route path="/freebook" element={<QuestionsPage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<DetailedBlogPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route
          path="/civicengagement&initiative/pitch_competition"
          element={<Page />}
        />
        <Route
          path="/civicengagement&initiative/youth_impact_summit"
          element={<SummitEvent />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomeRoute;
