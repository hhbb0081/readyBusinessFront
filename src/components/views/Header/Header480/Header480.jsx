import menu from "../../../../assets/icons/Header/ic_round-menu.svg";
import logo from "../../../../assets/icons/Header/LOGO.svg";
import SideMenu from "../../SideMenu/SideMenu";
import "./Header480.css";
import { useState } from "react";

export default function Header480() {
  const [isOperation, setIsOperation] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOperation = () => {
    setIsOperation((prev) => !prev);
  };

  const handleSidebar = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const isOperationBackground = isOperation
    ? "rgba(131, 131, 131, 1)"
    : "rgba(216, 35, 86, 1)";

  return (
    <>
      <SideMenu isOpen={isSideMenuOpen} toggleSidebar={handleSidebar} />

      <header className="header480">
        <img
          src={menu}
          alt="menu"
          className="header480__menu"
          onClick={handleSidebar}
        />
        <img src={logo} alt="logo" className="header__logo" />

        <span className="business-status">
          {isOperation ? "영업종료" : "영업중"}
        </span>
        <div
          className="loginControl-button-wrapper-css"
          onClick={() => handleOperation()}
          style={{ backgroundColor: isOperationBackground }}
        >
          {isOperation ? (
            <div className="loginControl-button-isopen-css"></div>
          ) : (
            <div className="loginControl-button-isclose-css"></div>
          )}
        </div>
      </header>
    </>
  );
}
