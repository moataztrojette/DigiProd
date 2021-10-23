import React, {useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const AffecterMembre = (props) => {

  const [statefreelancer,setFreelancer] = useState([])


      const MyValueInput = (event) => {
        let res = props.valuesInput;
        res[event.target.name] = event.target.value;
        props.setValues(res);
      };

      const handleClikUser = async () => {
        const NameUser = await axios.get("http://localhost:4000/api/equipe/findname/"+props.valuesInput.listeFreelancer)
        const temp2 = [...statefreelancer];
        temp2.push(NameUser.data)
        setFreelancer(temp2)
        console.log(temp2)
    
        const temp = [...props.stateUser];
        temp.push(props.valuesInput.listeFreelancer);
        //console.log(temp)
        props.setUser(temp);
        //console.log(stateUser)
      };


      
  const handleFormSubmitEquipe = async(event)=>{
    event.preventDefault()
    //console.log(stateUserId._id)
    //console.log(stateUserId)

    //console.log(valuesInput)
    const formData = new FormData();
    props.stateUser.forEach((spec) => {
      formData.append("listeFreelancer", spec);
    });

    if(props.stateUser.length > 0 ){
     const data =  await axios.put(
        "http://localhost:4000/api/equipe/update/" + props.stateUserId._id,
        formData
      );
  
      toast("Freelancer a été ajouter avec success ", {
        type: "success",
      });

      const resFind = props.equipe.find(
        (element) => element._id ===  props.stateUserId._id
      );
      const newState = props.equipe;
      const index = props.equipe.indexOf(resFind);
      newState[index] = data.data;
      props.setEquipe(newState);

        setFreelancer([])
        props.setUser([])
    
    }
    else{
      toast("Impossible! SVP sélectionner un freelance", {
        type: "error",
      });
    }
  

 
  }


    
    return (<div>
  <Modal
        isOpen={props.modalIsOpenEquipe}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => props.setModalIsOpenEquipe(false)}
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
          <h3 className="font-weight-light">Affecter freelancer à une équipe</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmitEquipe}
            encType="multipart/form-data"

          >
        <div className="form-group" style={{display:"flex"}}>
              {statefreelancer.map((key) => (
                <div className="freelancer_spec">{key.nomIndividu}</div>
              ))}
            </div>


            <h5 className="auth-link text-black">Freelancer</h5>

            <div class="input-group mb-3">
                  <select
              className="form-select_Art"
              aria-label="Default select example"
              name="listeFreelancer"
              onChange={MyValueInput}

            >

              {props.membre.map((meme) => (
                <option value={meme._id}>{meme.nomIndividu}</option>
              ))}
            </select>


              <form onClick={handleClikUser} >
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
                onClick={() => props.setModalIsOpenEquipe(false)}
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
 
export default AffecterMembre;