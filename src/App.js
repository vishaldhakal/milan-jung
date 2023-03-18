import React, { useEffect, useLayoutEffect } from "react";
import "./App.css";

import WebAndDashRoute from "./components/Routes/WebAndDashRoute";

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <WebAndDashRoute />
    </>
  );
}
