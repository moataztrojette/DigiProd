import React from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const ModifierMembre = (props) => {

  const MyValueInput_update = (event) => {
    let res = props.valuesInput_update;
    props.setValues_update({ ...res, [event.target.name]: event.target.value });
  };
  
  const handleFormSubmitUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomIndividu", props.valuesInput.nomIndividu);
    formData.append("specialite", props.valuesInput.specialite);
    formData.append("email", props.valuesInput.email);
    formData.append("tel", props.valuesInput.tel);
    formData.append("projet", props.valuesInput.projet);
    formData.append("image", props.valuesInput.image);


    const datatMembre = await axios.put(
      "http://localhost:4000/api/membre/update/" + props.valuesInput_update._id,
      props.valuesInput_update
    );

    toast("Membre a été Modifiér avec success ", {
      type: "success",
    });

    const resFind = props.membre.find(
      (element) => element._id === props.valuesInput_update._id
    );
    const newState = props.membre;
    const index = props.membre.indexOf(resFind);
    newState[index] = datatMembre.data;
    props.setMembre(newState);
  };



 
    


    return ( <div>
      
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
            <h3 className="font-weight-light">Modifier un  membre</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmitUpdate}
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
                  value={props.valuesInput_update.nomIndividu}
                  onChange={MyValueInput_update}
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
                  value={props.valuesInput_update.specialite}
                  onChange={MyValueInput_update}
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
                  value={props.valuesInput_update.email}
                  onChange={MyValueInput_update}
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
                  value={props.valuesInput_update.tel}
                  onChange={MyValueInput_update}                />
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
                  value={props.valuesInput_update.projet}
                  onChange={MyValueInput_update}    
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
        <ToastContainer></ToastContainer>

    </div> );
}
 
export default ModifierMembre;