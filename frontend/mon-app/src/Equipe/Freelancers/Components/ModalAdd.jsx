import React, {useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";



const ModalAdd = (props) => {
    const [stateSpecialite, setStateSpecialite] = useState([]);
    const [valuesInput, setValues] = useState({});


    const uploadToState = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.files[0];
        setValues(res);
      };
    
      const MyValueInput = (event) => {
        let res = valuesInput;
        res[event.target.name] = event.target.value;
        setValues(res);
      };
    
      const handleFormSubmit = async (event) => {
      try{
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("nom", valuesInput.nom);
        stateSpecialite.forEach((spec) => {
          formData.append("specialite", spec);
        });
        formData.append("fichier", valuesInput.fichier);
        formData.append("email", valuesInput.email);
        
        if(stateSpecialite.length>0)
        {
            const data = await axios.post(
                "http://localhost:4000/api/freelancer/post",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
          
              toast("Freelancer a été ajouter avec success ", {
                type: "success",
              });
              const preventState = props.freelancer;
              preventState.push(data.data);
              props.setFreelnacer(preventState);
              setStateSpecialite([])
        }
       
            else{
                toast("Impossible! SVP sélectionner un Spécialité", {
                  type: "error",
                });
              }

      }catch(error){
        if (error.response.data) {
          toast(error.response.data, {
            type: "error",
          });
        }
      }        
        
      };

      const handleClikSpecialite = async () => {
        const temp = [...stateSpecialite];
        temp.push(valuesInput.specialite);
        setStateSpecialite(temp);
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
          overlay: {
            backgroundColor: "rgba(206, 239, 248,0.8)",
          },
        }}
      >
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Ajouter Freelancer</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <h5 className="auth-link text-black">Nom</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nom"
                required
                placeholder="nom de freelancer"
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black">Email</h5>
              <input
                type="email"
                className="form-control"
                id="exampleInputUsername2"
                name="email"
                required
                placeholder="Email"
                onChange={MyValueInput}
              />
            </div>


            <div className="form-group">
              <h5 className="auth-link text-black">CV(PDF) </h5>

              <input
                type="file"
                className="form-control"
                name="fichier"
                id="exampleInputMobile"
                required
                placeholder="CV"
                onChange={uploadToState}
              />
            </div>

            <div className="form-group" style={{display:"flex"}}>
              {stateSpecialite.map((key) => (
                <div className="freelancer_spec">{key}</div>
              ))}
            </div>

            <h5 className="auth-link text-black">Spécialité</h5>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Spécialité"
                name="specialite"
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={MyValueInput}

              />
              <form onClick={handleClikSpecialite}>
                <div class="input-group-prepend">
                  <button class="btn btn-success" type="button">
                    +
                  </button>
                </div>
              </form>
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