import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AddArtist from "./Artists/AddArtist";
import Artists from "./Artists/Artists";
import UpdateArtist from "./Artists/UpdateArtist";
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
        <Route path="/artists">
          <Route path="" element={<Artists />} />
          <Route path="add" element={<AddArtist />} />
          <Route path=":id" element={<UpdateArtist />} />
        </Route>
      </Routes>
    </>
  );
};

export default Home;
