import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Singup.css";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [valueInput, setInput] = useState({});
  const [error, setErrors] = useState(false);

  const MyValueInput = (event) => {
    let res = valueInput;
    res[event.target.name] = event.target.value;
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:4000/api/user/login",
        valueInput
      );
      setErrors(false);
    

      props.history.replace("/");
 
    } catch (error) {
      //console.log(error.response)
      toast(error.response.data, {
        type: "error",
      });
    }
  };

  return (
    
    <div>

      <div class="d-lg-flex half">
        <div className="bg order-1 order-md-1"></div>
        <div class="contents order-2 order-md-2">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="log_title">
                  <div class="logo">
                    <img src="./image/logo/logo_partie1.png" alt="error" />
                  </div>
                  <br />
                  <h6 class="mb-4">Connecté-vous avec</h6>
                  <div class="facebook_google">
                    <a href="#" class="login100-social-item">
                      <i class="fa fa-facebook-f"></i>
                    </a>

                    <a href="#" class="login100-social-item">
                      <img
                        src="https://colorlib.com/etc/lf/Login_v9/images/icons/icon-google.png"
                        alt="GOOGLE"
                      />
                    </a>
                  </div>
                </div>
                <form class="form" onSubmit={handleFormSubmit}>
                  <h6>Adresse mail</h6>

                  <ToastContainer></ToastContainer>

                  <div class="form-group first success">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      required
                      placeholder="SkanderAmor@gmail.com"
                      onChange={MyValueInput}
                    />
                  </div>

                  <br></br>

                  <h6>Mot de passe</h6>

                  <div class="form-group first mb-3 success ">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      required
                      placeholder="***************"
                      onChange={MyValueInput}
                    />
                  </div>

                  <div class="form-group last mb-3">
                    <input
                      type="submit"
                      class="form-control"
                      id="button"
                      value="Login"
                    />
                  </div>
                </form>
                <h6>
                  Vous avez déja un compte?{" "}
                  <Link to="/singup">Inscrivez-vous</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
