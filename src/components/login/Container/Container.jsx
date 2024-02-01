import React from "react";
import logo from "../../../assets/icons/Big_LOGO.svg";
import "./Container.css";

const Container = ({
  title,
  children,
  containerWidth,
  containerHeight,
  logoMarginTop,
  logoMarginBottom,
}) => {
  return (
    <div className="container-wrapper">
      <div
        className="container-wrapper-inner"
        style={{
          width: `${containerWidth}`,
          height: `${containerHeight}`,
          overflow: "visible",
        }}
      >
        <div
          className="container-wrapper-wrapper"
          style={{
            marginTop: `${logoMarginTop}`,
            marginBottom: `${logoMarginBottom}`,
          }}
        >
          <img src={logo} alt="logo" />
          <div className="container-wrapper-text">{title}</div>
        </div>
        <div className="loginpage-content-wrapper">
          <div className="loginpage-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Container;
