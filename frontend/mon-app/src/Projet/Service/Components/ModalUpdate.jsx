import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const ModalUpdate = (props) => {

      const handleFormSubmitUpdate = async (event) => {
        event.preventDefault();
        const datatService = await axios.put(
          "http://localhost:4000/api/service/update/" + props.valuesInput_update._id,
          props.valuesInput_update
        );
    
        toast("Service a été Modifiér avec success ", {
          type: "success",
        });
    
        const resFind = props.service.find(
          (element) => element._id === props.valuesInput_update._id
        );
        const newState = props.service;
        const index = props.service.indexOf(resFind);
        newState[index] = datatService.data;
        props.setService(newState);
      };


    return (<div>
        <Modal
        isOpen={props.modalUpdateIsOpen.open}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
            props.setModalUpdateIsOpen({
            open: false,
            info: {},
          });
          props.setValues_update({});
        }}
        style={{
          content: {
            top: "50%",
            left: "50%",
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
          <h3 className="font-weight-light">Modifier service</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmitUpdate}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom Service</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomService"
                required
                value={props.valuesInput_update.nomService}
                placeholder="nom Service"
                onChange={props.MyValueInput_update}
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
                value={props.valuesInput_update.description}
                placeholder="description"
                onChange={props.MyValueInput_update}
              />
            </div>

            <h5 className="auth-link text-black">Contact (adresse email) </h5>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputUsername2"
                name="contact"
                disabled
                required
                value={props.valuesInput_update.contact}
                placeholder="contact"
                onChange={props.MyValueInput_update}
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
                onClick={() =>
                    props.setModalUpdateIsOpen({
                    open: false,
                    info: {},
                  })
                }
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
 
export default ModalUpdate;