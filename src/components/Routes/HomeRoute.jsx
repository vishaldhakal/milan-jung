import * as React from "react";
import { Route, Routes } from "react-router-dom";
import DetailedBlogPage from "../DetailsBlogPage";
import Page from "../EntrepreneurshipForm.jsx/Page";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import NavBar from "../Navbar";
import QuestionsPage from "../QuestionsPage";
import PageLoader from "../common/Loaders/PageLoader";
import AboutUs from "../page-layout-componenets/AboutUs";
import Blog from "../page-layout-componenets/Blog";
import SummitEvent from "../page-layout-componenets/SummitEvent";
import VideoPage from "../page-layout-componenets/VideoPage";
import Gallery from "../Gallery";
// import Gallery from "../Gallery";
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
        <Route path="/gallery" element={<Gallery />} />
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
