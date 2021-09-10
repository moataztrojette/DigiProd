import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const AddEquipe = (props) => {

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomEquipe", props.valuesInput.nomEquipe);
    formData.append("imageEquipe", props.valuesInput.imageEquipe);

    const data = await axios.post(
      "http://localhost:4000/api/equipe/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Equipe a été ajouter avec success ", {
      type: "success",
    });
    const prevState = props.equipe;
    prevState.push(data.data);
    props.setEquipe(prevState);
  };

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

      
    return (<div>
         <Modal
          isOpen={props.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => props.setModalIsOpen(false)}
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
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Ajouter un Equipe</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de L'equipe</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomEquipe"
                  required
                  placeholder="Nom de l’article"
                  onChange={MyValueInput}
                />
              </div>
          
         
            

         

              <div className="form-group">
                <h5 className="auth-link text-black">Image </h5>

                <input
                  type="file"
                  className="form-control"
                  name="imageEquipe"
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
        <ToastContainer></ToastContainer>



    </div>  );
}
 
export default AddEquipe;