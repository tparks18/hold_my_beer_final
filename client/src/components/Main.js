import React from "react";
import Navbar from "./Navbar";
import LoggedOutNav from "./LoggedOutNav";

const Main = ({user}) => {
      if(user?.token) return <Navbar />
      return <LoggedOutNav/>
};

export default Main;
