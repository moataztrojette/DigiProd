import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";


const ModalAdd = (props) => {

    const [valuesInput, setValues] = useState({});
    const handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
          const data = await axios.post(
            "http://localhost:4000/api/client/post",
            valuesInput
          );
    
          toast("Client a été ajouter avec success ", {
            type: "success",
          });
          const preventState = props.client;
          preventState.push(data.data);
          props.setClient(preventState);
        } catch (error) {
          if (error.response.data) {
            toast(error.response.data, {
              type: "error",
            });
          }
        }
      };
    
    const MyValueInput = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.value;
        setValues(res);
      };
    
    return (<div>
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
          overlay : {
            backgroundColor:"rgba(206, 239, 248,0.8)",
          }
        }}
      >
        <div className="auth-form-light text-left p-5">
          <h3 className="font-weight-light">Ajouter un nouveau Client</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la société</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomSociete"
                required
                placeholder="Nom Société"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Adresse email </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="adresseEmail"
                required
                placeholder="adresse Email"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Téléphone </h5>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputUsername2"
                name="telephone"
                required
                placeholder="Téléphone"
                onChange={MyValueInput}
              />
            </div>
            <ToastContainer></ToastContainer>

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

    </div>  );
}
 
export default ModalAdd;