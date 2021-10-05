import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const AddMembre = (props) => {

  const handleFormSubmit_Membre = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomIndividu", props.valuesInput.nomIndividu);
    formData.append("specialite", props.valuesInput.specialite);
    formData.append("email", props.valuesInput.email);
    formData.append("tel", props.valuesInput.tel);
    formData.append("projet", props.valuesInput.projet);
    formData.append("image", props.valuesInput.image);



    const data = await axios.post(
      "http://localhost:4000/api/membre/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Membre a été ajouter avec success ", {
      type: "success",
    });
    const prevState = props.membre;
    prevState.push(data.data);
    props.setMembre(prevState);
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
      
    return ( <div>
          <Modal
          isOpen={props.modalIsOpenEmp}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => props.modalIsOpenEmp(false)}
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
            <h3 className="font-weight-light">Ajouter un nouveau membre</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmit_Membre}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de l'individu</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomIndividu"
                  required
                  placeholder="Nom de l'individu"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Spécialité</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="specialite"
                  required
                  placeholder="Spécialité"
                  onChange={MyValueInput}
                />
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black"> Adresse email</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="email"
                  required
                  placeholder="Adresse email"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Téléphone </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="tel"
                  required
                  placeholder="Téléphone"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Projets en cours </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="projet"
                  required
                  placeholder="Projets en cours"
                  onChange={MyValueInput}
                />
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black">Image </h5>

                <input
                  type="file"
                  className="form-control"
                  name="image"
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
                  onClick={() => props.setModalIsOpenEmp(false)}
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

    </div> );
}
 
export default AddMembre;