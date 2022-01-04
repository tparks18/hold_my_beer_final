import React, {useState, useEffect, useContext} from "react";
import beerpour from "../images/undraw_beer.svg";

import useLogin from "../hooks/useLogin"
import { Navigate } from "react-router";
import {UserContext} from "../context/UserContext";
import LoginForm from "../forms/LoginForm";




const Login = (props) => {
  const { user, setUser } = useContext(UserContext);
  const[creds, setCreds]=useState({})
  const login = useLogin(creds.email, creds.password)

  
  useEffect(
    ()=>{
      if (login.data?.token){
        setUser(login.data)
      }else{
        setCreds({})
      }
      return ()=>{
        if (!user && login.data?.token){setUser(login.data)}
      }
    },[login.data, props, user, setUser])
    
    
    
    if (login.data?.token){return (<Navigate to="/"/>)}
    return (
      <div>
      <section className="vh-100">
        <div className="container py-5 h-90">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src={beerpour}
                className="img-fluid rounded"
                alt="beer mountain"
              />
              
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-4">Login</h3>
              <LoginForm setCreds={setCreds} error={login?.error ?? ''}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
