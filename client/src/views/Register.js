import React, {useState} from "react";
import beer from "../images/beer-unsplash.jpg";

import usePostUser from "../hooks/usePostUser";
import {Navigate} from 'react-router-dom';
import RegisterForm from "../forms/RegisterForm";


const Register = () => {
  const [userInfo, setUserInfo]=useState({})
  const register = usePostUser(userInfo)

  if (register?.response_code===200) return <Navigate to='/login'/>
  return (
    <section className="h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img
                src={beer}
                alt="beer"
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-4">Register</h3>
                <RegisterForm setUserInfo={setUserInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
