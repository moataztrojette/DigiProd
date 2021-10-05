import React, {useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const ModalAdd = (props) => {
    const [valuesInput, setValues] = useState({});

    const MyValueInput = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.value;
        setValues(res);
      };

      const handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
          const data = await axios.post(
            "http://localhost:4000/api/service/post",
            valuesInput
          );
    
          toast("Service a été ajouter avec success ", {
            type: "success",
          });
          const preventState = props.service;
          preventState.push(data.data);
          props.setService(preventState);
        } catch (error) {
          if (error.response.data) {
            toast(error.response.data, {
              type: "error",
            });
          }
        }
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
          <h3 className="font-weight-light">Ajouter un nouveau service</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom du Service</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomService"
                required
                placeholder="nom Service"
                onChange={MyValueInput}
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
                placeholder="description"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Contact (adresse email) </h5>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputUsername2"
                name="contact"
                required
                placeholder="contact"
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