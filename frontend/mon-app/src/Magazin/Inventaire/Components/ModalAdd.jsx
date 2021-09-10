import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const ModalAdd = (props) => {

  const uploadToState = (event) => {
    let res = props.valuesInput;
    res[event.target.name] = event.target.files[0];
    props.setValues(res);
  };

  const MyValueInput = (event) => {
    let res = props.valuesInput;
    res[event.target.name] = event.target.value;
    props.setValues(res);
  };
  

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("nomDepot", props.valuesInput.nomDepot);
      formData.append("localisation", props.valuesInput.localisation);
      formData.append("responsable", props.valuesInput.responsable);
      formData.append("imageDepot", props.valuesInput.imageDepot);

      const dep = await axios.post(
        "http://localhost:4000/api/depot/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Dépot a été ajouter avec success ", {
        type: "success",
      });

      const preventDepot = props.depot;
      preventDepot.push(dep.data);
      props.setDepot(preventDepot);
    } catch (error) {
      if (error.response.data) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  };


    return ( <div>
         <Modal
        isOpen={props.modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => props.setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "55%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
          overlay: {
            backgroundColor: "rgba(206, 239, 248,0.8)",
          },
        }}
      >
        <div className="auth-form-light text-left p-5">
          <h3 className="font-weight-light">Ajouter un nouveau Depot</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <h5 className="auth-link text-black">Nom dépot</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomDepot"
                required
                placeholder="Nom dépot"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">localisation </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="localisation"
                required
                placeholder="localisation"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Responsable </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="responsable"
                onChange={MyValueInput}
              >
                {props.membre.map((meme) => (
                  <option value={meme._id}>{meme.nomIndividu}</option>
                ))}
              </select>
            </div>

            <ToastContainer></ToastContainer>

            <div className="form-group">
              <h5 className="auth-link text-black">Image </h5>

              <input
                type="file"
                className="form-control"
                name="imageDepot"
                id="exampleInputMobile"
                required
                placeholder="image"
                onChange={uploadToState}
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
                onClick={() => props.setModalIsOpen(false)}
                className="btn btn-block btn-facebook auth-form-btn"
              >
                <i className="mdi mr-2" />
                Retour{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      
    </div> );
}
 
export default ModalAdd;