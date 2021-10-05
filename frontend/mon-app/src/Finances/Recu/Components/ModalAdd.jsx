import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        event.preventDefault();
        const formData = new FormData();
        formData.append("fichier", props.valuesInput.fichier);
        formData.append("nomAgence", props.valuesInput.nomAgence);
        formData.append("total", props.valuesInput.total);
        formData.append("date", props.valuesInput.date);
        formData.append("receveur", props.valuesInput.receveur);
        formData.append("etatRecu", props.valuesInput.etatRecu);
    
      
    
        const data =await axios.post("http://localhost:4000/api/recu/post",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    
                toast("Reçu a été ajouter avec success ", {
                    type: "success",
                  });
                  const preventState = props.recu
                  preventState.push(data.data)
                  props.setRecu(preventState)
      };

      
  return (
    <div>
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
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Ajouter un nouveau reçu</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black"> Nom de l'agence</h5>
              <select
                className="select_categorie"
                name="nomAgence"
                onChange={MyValueInput}
              >
                {props.client.map((cl) => (
                  <option value={cl._id}>{cl.nomSociete}</option>
                ))}
              </select>
            </div>
            <h5 className="auth-link text-black">Total </h5>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputUsername2"
                name="total"
                required
                placeholder="Total"
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
            <h5 className="auth-link text-black">Receveur </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="receveur"
                onChange={MyValueInput}
              >
                {props.depot.map((dep) => (
                  <option value={dep._id}>{dep.nomDepot}</option>
                ))}
              </select>
            </div>

            <h5 className="auth-link text-black">État reçu </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="etatRecu"
                onChange={MyValueInput}
              >
                <option value="entrant">entrant</option>
                <option value="sortant">sortant </option>
              </select>
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black">Reçu pdf </h5>

              <input
                type="file"
                className="form-control"
                name="fichier"
                id="exampleInputMobile"
                required
                placeholder="fichier"
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
    </div>
  );
};

export default ModalAdd;
