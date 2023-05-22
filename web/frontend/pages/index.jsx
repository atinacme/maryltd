import React, { useEffect } from 'react';
import UserAuth from '../components/User Auth/UserAuth';
import Dashboard from "../components/Dashboard/Dashboard"
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
export default function Index() {

  const auth = { isAuth: localStorage.getItem("authenticated") };

  return (
    <>
      {/* {auth.isAuth ?
        <Dashboard />
        : <UserAuth />} */}
      <h6>hello</h6>
    </>
  );
}