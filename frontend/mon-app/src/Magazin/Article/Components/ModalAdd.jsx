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
  
      const handleFormSubmit = async (event) => {
        try{
          event.preventDefault();
          const formData = new FormData();
          formData.append("nomArticle", props.valuesInput.nomArticle);
          formData.append("categorieArticle", props.valuesInput.categorieArticle);
          formData.append("quantite", props.valuesInput.quantite);
          formData.append("localisation", props.valuesInput.localisation);
          formData.append("statut", props.valuesInput.statut);
          formData.append("imageArticle", props.valuesInput.imageArticle);
      
          const data = await axios.post(
            "http://localhost:4000/api/article/post",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
          toast("Article a été ajouter avec success ", {
            type: "success",
          });
          const prevStateArt = props.allArticle;
          prevStateArt.push(data.data);
          console.log(data.data)
          props.setArticle(prevStateArt);
        }catch(error){
          if (error.response.data) {
            toast(error.response.data, {
              type: "error",
            });
          }
        }
      
      };
 

    return(<div>
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
       <div className="auth-form-light text-left p-4">
         <h3 className="font-weight-light">Ajouter un nouveau Article</h3>
         <br />
         <form
           className="pt-3"
           onSubmit={handleFormSubmit}
           encType="multipart/form-data"
         >
           <div className="form-group">
             <h5 className="auth-link text-black"> Nom de l’article</h5>
             <input
               type="text"
               className="form-control"
               id="exampleInputUsername2"
               name="nomArticle"
               required
               placeholder="Nom de l’article"
               onChange={props.MyValueInput}
             />
           </div>
           <h5 className="auth-link text-black">Catégorie </h5>

           <div className="form-group">
             <select
               className="select_categorie"
               name="categorieArticle"
               onChange={props.MyValueInput}
             >
               {props.categorie.map((cat) => (
                 <option value={cat._id}>{cat.nomCategorie}</option>
               ))}
             </select>
           </div>

           <div className="form-group">
             <h5 className="auth-link text-black"> Quantité</h5>
             <input
               type="number"
               className="form-control"
               id="exampleInputUsername2"
               name="quantite"
               required
               placeholder="quantite"
               onChange={props.MyValueInput}
             />
           </div>
           <h5 className="auth-link text-black">Localisation </h5>

           <div className="form-group">
             <select
               className="select_categorie"
               name="localisation"
               onChange={props.MyValueInput}
             >
               {props.depot.map((dep) => (
                 <option value={dep._id}>{dep.nomDepot}</option>
               ))}
             </select>
           </div>

           <h5 className="auth-link text-black">Statut </h5>

           <div className="form-group">
             <select
               className="select_categorie"
               name="statut"
               onChange={props.MyValueInput}
             >
               <option value="enlocation">en location</option>
               <option value="dansdepot">dans dépot </option>
               <option value="reservé">reservé</option>
             </select>
           </div>

           <div className="form-group">
             <h5 className="auth-link text-black">Image </h5>

             <input
               type="file"
               className="form-control"
               name="imageArticle"
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
 
export default ModalAdd;