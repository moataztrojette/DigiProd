import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const ModalUpdate = (props) => {
 

      const handleFormSubmitUpdate = async (event) => {
        try {
          event.preventDefault();
          const dataClient = await axios.put(
            "http://localhost:4000/api/client/update/" +props.valuesInput_update._id,
            props.valuesInput_update
          );
    
          toast("Client a été Modifiér avec success ", {
            type: "success",
          });
    
          const resFind = props.client.find(
            (element) => element._id === props.valuesInput_update._id
          );
          const newState = props.client;
          const index = props.client.indexOf(resFind);
          newState[index] = dataClient.data;
          props.setClient(newState);
        } catch (error) {
          toast(error.response.data, {
            type: "error",
          });
        }
      }



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
      <h3 className="font-weight-light">Modifier Client</h3>
      <br />
      <form className="pt-3" onSubmit={handleFormSubmitUpdate}>
        <div className="form-group">
          <h5 className="auth-link text-black">Nom de la Société</h5>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername2"
            name="nomSociete"
            required
            value={props.valuesInput_update.nomSociete}
            placeholder="nom Societe"
            onChange={props.MyValueInput_update}
          />
        </div>
        <h5 className="auth-link text-black">Adresse Email </h5>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername2"
            name="adresseEmail"
            required
            disabled
            value={props.valuesInput_update.adresseEmail}
            placeholder="adresse Email"
          />
        </div>

        <h5 className="auth-link text-black">Téléphone</h5>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="exampleInputUsername2"
            name="telephone"
            required
            value={props.valuesInput_update.telephone}
            placeholder="Téléphone"
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