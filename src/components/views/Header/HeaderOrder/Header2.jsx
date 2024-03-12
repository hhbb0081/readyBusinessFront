import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../../../assets/icons/Header/backIcon.png";
import LOGO from "../../../../assets/icons/Header/header_logo.png"; //로고
import { IMAGES } from "../../../../constants/images";
import { HomeContext } from "../../../../pages/OrderManage/Home";
import SoundComponent from "../../Audio/SoundComponent";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const context = useContext(HomeContext);
  console.log(context?.selectedMenu);
  return (
    <div className="header2">
      <div className="header2-wrapper">
        <div className="logo-wrapper">
          {
            context?.selectedMenu.length > 0 && 
            <img
              src={BackIcon}
              className="BackIcon"
              alt="BackIcon"
              onClick={() => navigate(`/main`)}
            />
          }
          <img
            src={LOGO}
            className="LOGO"
            alt="LOGO"
            onClick={() => navigate(`/main`)}
          />
        </div>
        <div className="head-container2">
          {/* {storeValue ? (
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={StoreOn} alt="Open" className="store_img"/>
              </div>
              <div className="header-font">영업중</div>
            </div>
          ) : ( */}
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={IMAGES.store_off} alt="Close" className="store_img"/>
              </div>
              <div className="store_font_wrapper">
                <div className="header-font">영업종료</div>
              </div>
            </div>
          <SoundComponent />
        </div>
      </div>
    </div>
  );
};

export default Header;