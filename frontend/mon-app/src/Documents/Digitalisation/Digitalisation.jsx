import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "react-toastify/dist/ReactToastify.css";
const Digitalisation = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
 
  useEffect(() => {
   
  }, []);

  const uploadToState = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.files[0];
    setValues(res);
  };

  
  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  };

  
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "55%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
          overlay : {
            backgroundColor:"rgba(206, 239, 248,0.8)",
          }
        }}
      >
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Stocker vos Documents</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black"> Documents</h5>
              <input
                type="file"
                className="form-control"
                id="exampleInputUsername2"
                name="fichier"
                required
                placeholder="File"
                onChange={uploadToState}
              />
            </div>

            <h5 className="auth-link text-black">Description </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="description"
                required
                placeholder="Description"
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black"> Date</h5>
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="date"
                required
                placeholder="Date"
                onChange={MyValueInput}
              />
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className="btn btn-block btn-facebook auth-form-btn"
              >
                <i className="mdi mr-2" />
                Terminer{" "}
              </button>
            </div>

            <div className="mb-2">
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="btn btn-block btn-facebook auth-form-btn"
              >
                <i className="mdi mr-2" />
                Retour{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer></ToastContainer>

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Documents</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Digitalisation</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        </div>


        <div>
            <img src="/image/documents/doc4.png" alt="" />
        </div>

        <div className="digitalisation">
            <div>
            <img src="/image/documents/doc5.png" alt="" />
            </div>
             <div className="content_digi">
                <h4>Charger un fichier format PDF</h4>
                <label for="text">Charger un fichier (parcourir)</label>
                <input type="text" id="text" onClick={() => setModalIsOpen(true)}/>
                     
            </div>   
            

        </div>

      <div className="row">
      

      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row" style={{
            width:"100%",
            height:"100%"
        }}>
          

  


    
     

        

        </div>





      </div>

      





    </div>
    </div>
  );
};

export default Digitalisation;
