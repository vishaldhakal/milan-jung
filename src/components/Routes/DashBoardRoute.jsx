import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import AboutUs from "../adminDashboard/pages/AboutUs";
import SocialMedia from "../adminDashboard/pages/SocialMedia";
import AddBlog from "../adminDashboard/pages/AddBlog";
import YoutubeLinks from "../adminDashboard/pages/YoutubeLinks";
import Home from "../adminDashboard/pages/Home";
import Images from "../adminDashboard/pages/Images";
import BlogPosts from "../adminDashboard/pages/BlogPosts";
import ContactUs from "../adminDashboard/pages/ContactUs";
import AddVideo from "../adminDashboard/pages/AddVideo";
import Students from "../adminDashboard/pages/Students";
import Questions from "../adminDashboard/pages/Questions";
import ResetPassword from "../adminDashboard/pages/ResetPassword";
import ChangePassword from "../adminDashboard/pages/ChangePassword";
import Profile from "../adminDashboard/pages/Profile";
import Entrepreneurship from "../adminDashboard/pages/Entrepreneurship";

const DashBoardRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/blogs-add/" element={<AddBlog />} />
      <Route path="/images" element={<Images />} />
      <Route path="add-video" element={<AddVideo />} />
      <Route path="/social" element={<SocialMedia />} />
      <Route path="/youtube" element={<YoutubeLinks />} />
      <Route path="/blog-posts" element={<BlogPosts />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="students" element={<Students />} />
      <Route path="questions" element={<Questions />} />
      <Route path="/entrepreneurship" element={<Entrepreneurship />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default DashBoardRoute;
