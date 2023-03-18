import "./PageLoader.css";
import React from "react";
import { Oval } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <React.Fragment>
      <Oval
        height={45}
        width={45}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </React.Fragment>
  );
};

export default PageLoader;
