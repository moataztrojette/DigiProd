import React, {useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const ModalAdd = (props) => {
    const [valuesInput, setValues] = useState({});


    
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post(
      "http://localhost:4000/api/calendar/post",
      valuesInput
    );

    toast(" Tâche  a été ajouter avec success ", {
      type: "success",
    });

    const preventState = props.calendar;
    preventState.push(data.data);
    props.setCalendar(preventState);
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
          <h3 className="font-weight-light">Ajouter un nouveau Tâche</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la Tâche</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="title"
                required
                placeholder="title"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Date de début </h5>

            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="start"
                required
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Date de Fin </h5>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="end"
                required
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black">Pourcentage </h5>
              <input
                type="range"
                id="volume"
                name="pourcentage"
                min="0"
                max="100"
                onChange={MyValueInput}
              ></input>
            </div>

            <h5 className="auth-link text-black">Heure début </h5>
            <div className="form-group">
              <input
                type="time"
                id="appt"
                name="heureDebut"
                min="07:00"
                max="00:00"
                required
                onChange={MyValueInput}
              ></input>
            </div>

            <h5 className="auth-link text-black">Heure fin </h5>
            <div className="form-group">
              <input
                type="time"
                id="appt"
                name="heureFin"
                min="07:00"
                max="00:00"
                required
                onChange={MyValueInput}
              ></input>
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
 
export default ModalAdd;