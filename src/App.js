import { message } from 'antd';
import axios from "axios";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import InventoryPage from "../src/pages/Inventory/Inventory";
import Mypage from "../src/pages/Mypage/Mypage";
import SalesPage from "../src/pages/Sales/Sales";
import "./App.css";
import { isAuthenticatedState, loginState } from "./Atom/status";
import Auth from "./hoc/auth.jsx";
import useInterval from "./hooks/useInterval.jsx";
import HomePage from "./pages/Home/Home";
import MainPage from "./pages/Main/MainPage.jsx";

function App() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const [cookies, , removeCookies] = useCookies();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const NewLoginPage = Auth(MainPage, false);
  const NewHomePage = Auth(HomePage, true);
  const NewInventoryPage = Auth(InventoryPage, true);
  const NewSalesPage = Auth(SalesPage, true);
  const NewMyPage = Auth(Mypage, true);

  const expiredTime = 1000 * 60 * 60 * 24;
  // const expiredTime = 60000
  // const expiredTime = 65000;
  useInterval(() => {
    console.log(cookies);
    // if (
    //   cookies.refreshToken !== "undefined" &&
    //   cookies.refreshToken !== undefined &&
    //   cookies.refreshToken

    // ) {
    if(cookies.accessToken){
      const config = {
        withCredentials: true,
      };
      axios
        .get(`${apiUrl}/api/v1/refresh/token`, config)
        .then((response) => {
          console.log(response);
          if (!response.data) {
            removeCookies();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          // const config = {
          //   withCredentials: true,
          // };
      
          // axios
          //   .get(apiUrl + "/api/v1/user/logout", config)
          //   .then((response) => {
          //     console.log(response);
          //     setIsAuthenticated(false);
          //     setIsLoggedIn({
          //       accessToken: null,
          //       expiredTime: null,
          //     });
          //     removeCookies("accessToken");
          //     removeCookies("JSESSIONID");
          //     window.localStorage.setItem("isAuthenticated", false);
          //   })
          //   .catch((error) => {
          //     message.info("관리자에게 문의하세요.");
          //     navigate("/");
          //   });
          message.info("토큰이 만료되었습니다. 로그인을 진행해주세요.");
          navigate("/");
        });
      }
    // }
  }, expiredTime);
  return (
    <div className="App">
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<NewLoginPage />} />
            <Route path="/home" element={<NewHomePage />} />
            <Route path="/Inventory" element={<NewInventoryPage />} />
            <Route path="/Sales" element={<NewSalesPage />} />
            <Route path="/Mypage" element={<NewMyPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
