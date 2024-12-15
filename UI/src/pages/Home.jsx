import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { instance } from "../config/axios-instance.js";
import SearchBar from "../components/SearchBar.jsx";
import Main from "../components/Main.jsx";
import Row from "../components/Row.jsx";
import requests from "../apis/request.js";
import TrendingRow from "../components/TrendingRow.jsx";

function Home() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userData } = useContext(AppContext);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    instance
      .post(
        `${import.meta.env.VITE_IDENTITY_API_URL}/api/auth/logout`,
        JSON.stringify({ refreshToken: refreshToken }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          logout();
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Logout failed");
        navigate("/home");
      });
  };


  return (
    <>
      <Main />
      <TrendingRow rowID="1" title="Trending" request={requests.Trending} />
      <Row rowID="2" title="Now Playing" request={requests.NowPlaying} />
      <Row rowID="3" title="Top Rating" request={requests.TopRated} />
      <Row rowID="4" title="Up Coming" request={requests.Upcoming} />
    </>
    
  );
}

export default Home;
