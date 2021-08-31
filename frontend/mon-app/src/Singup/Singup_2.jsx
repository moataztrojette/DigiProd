import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Singup.css";

const Singup_2 = (props) => {
  const [valuesInput, setValues] = useState([]);

  useEffect(() => {
    setValues(props.location.state);
  }, []);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:4000/api/user/post", valuesInput);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Compte créé",
      showConfirmButton: false,
      timer: 1500,
    });

    props.history.push("/login");
  };

  return (
    <>
      <div class="d-lg-flex half">
        <div class="bg order-1 order-md-1"></div>

        <div class="contents order-2 order-md-2">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="log_title">
                  <div class="logo">
                    <img src="./image/logo/logo_partie1.png" alt="error" />
                  </div>
                  <br />
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
                <form action="#" onSubmit={handleFormSubmit}>
                  <h6>Nom de l'entreprise</h6>
                  <div class="form-group first success">
                    <input
                      type="text"
                      class="form-control"
                      id="nom_entreprise"
                      name="nom_entreprise"
                      placeholder="Ulysee media"
                      required
                      onChange={MyValueInput}
                    />
                  </div>
                  <br></br>

                  <h6>URL de l'espace de travail</h6>

                  <div class="form-group first  mb-3 success">
                    <input
                      type="url"
                      class="form-control"
                      id="url"
                      name="url_espace"
                      placeholder="http://www.digiprod.com/UM"
                      required
                      onChange={MyValueInput}
                    />
                  </div>
                  <h6>Langue</h6>
                  <div class="form-group first success">
                    <select
                      class="form-select"
                      name="langue"
                      onChange={MyValueInput}
                    >
                      <option value="francais">Français</option>
                      <option value="anglais">Anglais</option>
                      <option value="arabe">Arabe</option>
                    </select>
                  </div>
                  <br></br>

                  <div class="condition">
                    <div class="form-check">
                      <input
                        class="form-check-input2"
                        type="checkbox"
                        required
                        name="checkbox"
                        value="true"
                        id="flexCheckDefault"
                        onChange={MyValueInput}
                      />
                    </div>
                    <div classNam="label-check">
                      <label class="form-check-label" for="flexCheckDefault">
                        J'accepte les termes et conditions de l'application
                      </label>
                    </div>
                  </div>

                  <br />
                  <div class="form-group last mb-3">
                    <input
                      type="submit"
                      class="form-control"
                      id="button"
                      value="Terminer"
                    />
                  </div>
                </form>

                <div class="radio">
                  <div class="radio_postion">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      disabled
                    />
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      checked
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup_2;
