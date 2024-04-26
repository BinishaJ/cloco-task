import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Artists from "./Artists";
import Header from "./Header";
import AddUser from "./Users/AddUser";
import UpdateUser from "./Users/UpdateUser";
import Users from "./Users/Users";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/users">
          <Route path="" element={<Users />} />
          <Route path=":id" element={<UpdateUser />} />
          <Route path="add" element={<AddUser />} />
        </Route>
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </>
  );
};

export default Home;
