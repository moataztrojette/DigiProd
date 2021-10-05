import React, {useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const ModalAdd = (props) => {
    const [valuesInput, setValues] = useState({ typeCategorie: "materiels" });

    const MyValueInput = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.value;
        setValues(res);
      };
    
      const uploadToState = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.files[0];
        setValues(res);
      };

      const handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
          const formData = new FormData();
          formData.append("miniature", valuesInput.miniature);
          formData.append("nomCategorie", valuesInput.nomCategorie);
          formData.append("typeCategorie", valuesInput.typeCategorie);
    
          const data = await axios.post(
            "http://localhost:4000/api/categorie/post",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          toast("Catégorie a été ajouter avec success ", {
            type: "success",
          });
    
          const prevStateCat = props.categorie;
          prevStateCat.push(data.data);
          props.setCategorie(prevStateCat);
        } catch (error) {
          toast(error.response.data, {
            type: "error",
          });
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
          <h3 className="font-weight-light">Ajouter un nouvelle Catégorie</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la Catégorie</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomCategorie"
                required
                placeholder="Nom de la catégorie"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Type Catégorie </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="typeCategorie"
                onChange={MyValueInput}
              >
                <option value="materiels">Materiels </option>
                <option value="services">Services</option>
              </select>
            </div>
            <ToastContainer></ToastContainer>

            <div className="form-group">
              <h5 className="auth-link text-black">Miniature </h5>

              <input
                type="file"
                className="form-control"
                name="miniature"
                id="exampleInputMobile"
                required
                placeholder="Miniature"
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