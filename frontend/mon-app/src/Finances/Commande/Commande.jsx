import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';


import "react-toastify/dist/ReactToastify.css";
const Commande = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [valuesInput, setValues] = useState({});

    const[commande,setCommande]= useState([])

    const [client,setClient] = useState([])
    const [dateCommande,setDateCommande] = useState([])
    
    

    useEffect(()=>{
        const data = axios.get("http://localhost:4000/api/commande/findall").then((com)=>{
            setCommande(com.data)

          axios.get("http://localhost:4000/api/commande/finddate").then((date)=>{
            setDateCommande(date.data)
          })

          axios.get("http://localhost:4000/api/client/findall").then((cl)=>{

            if(cl.data[0]){
              let  cli = cl.data[0]._id

              setValues({
                client : cli,
                etatCommande : "entrant",
              })
            }
            setClient(cl.data)



          })
        })
    },[])

   

    
    const MyValueInput = (event) => {
        let res = valuesInput
        res[event.target.name] = event.target.value
        setValues(res) 
    
      };

    
    

    const handleFormSubmit = async(event)=>{
            event.preventDefault()
            const data =await axios.post("http://localhost:4000/api/commande/post",valuesInput)

            toast("Commande a été ajouter avec success ", {
                type: "success",
              });
              const preventState = commande
              preventState.push(data.data)
              setCommande(preventState)
        



    }

    const deletedCommande = async (id)=>{

        await axios.delete("http://localhost:4000/api/commande/delete/" + id)
        .then((verife)=>{
          if(verife.status !== 200){
            Swal.fire("Deleted!", "Your file has been deleted.", "error");
          }
          else{
            const preventStatu = commande
            const newState = preventStatu.filter((com)=> com._id !=  id)
            setCommande(newState)
            Swal.fire("Commande", "Commande a été supprimé", "success");
          }
        })
      }

      const Filteritems = async (event)=>{
        if(event.target.value === 'all'){
          axios.get("http://localhost:4000/api/commande/findall").then((res) => {
            setCommande(res.data);
        });
        }
        else{
          const filter = await axios.get("http://localhost:4000/api/commande/filter/"+ event.target.value)
          setCommande(filter.data)
        }
       
      }
    
      const FilteritemsEtatCommande = async (event)=>{
          const filter = await axios.get("http://localhost:4000/api/commande/filter/etatcommande/"+ event.target.value)
          setCommande(filter.data)
       
      }


     

  return (
    <div>
                    
                  

        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Ajouter un  Bon de commande</h3>
            <br />
            <form className="pt-3" onSubmit={handleFormSubmit} 
>
              <div className="form-group">
                <h5 className="auth-link text-black"> Sociéte </h5>
                <select
                  className="select_categorie"
                  name="client"
                  onChange={MyValueInput}
                >
                  {client.map((cl)=>(
                    <option value={cl._id}>{cl.nomSociete}</option>
                  ))}
                  </select>
              </div>
              <h5 className="auth-link text-black">produit /service </h5>

              <div className="form-group">
              <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="description"
                  required
                  placeholder="Description"
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
              
         
         

              <h5 className="auth-link text-black">État Commande </h5>

              <div className="form-group">
                <select
                  className="select_categorie"
                  name="etatCommande"
                  onChange={MyValueInput}
                >
                  <option value="entrant">entrant</option>
                  <option value="sortant">sortant </option>
                </select>
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black"> Commande</h5>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="file"
                  required
                  placeholder="File"
                  onChange={MyValueInput}
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
                  onClick={() => setModalIsOpen(false)}
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

        <div className="content_Article">
    <div className="categorie_article">
    <div className="title_categorie_icons">
    <h3>Finances</h3>
    <i class="mdi mdi-chevron-right"></i>
<h3>bon de commande</h3>
    <img src="./image/icons/Ellipse206.png" style={{width:"15px",height:"15px"}}></img>
    </div>
  </div>
  <div className="serhceInput">
          <button className="btn_filter" value="entrant" onClick={FilteritemsEtatCommande} >Commande entrants</button>
          <button className="btn_filter" value="sortant" onClick={FilteritemsEtatCommande} >Commande sortants</button>
  </div>

  
</div>
<div className="image_facture">
  <img src="/image/facture/Groupe939.png" className="image_fac" ></img>
  </div>    

   <div className="serhceInput" style={{
     marginTop:15
   }}>

         
  <div className="select" style={{
    marginLeft:"70%"
  }}  >
          <select
          style={{
            marginRight:10
          }}
                     className="form-select_Art"
                     aria-label="Default select example"
                    name="date"
                   onChange={Filteritems}
                >

                    <option value="all">Date</option>
                {dateCommande.map((commDate)=>(
                 <option value={commDate}>{commDate}</option>
                ))}  
                
                       </select>


           
    <button type="button" onClick={() => setModalIsOpen(true)}
 className="btn btn-primary-color_inv" >Nouveau bon + </button>


          </div>

  </div>

      <div className="row">

      {commande.length>0  ? <div className="title_devis">
    <ul className="ul_fac">
        <li>Société (de)</li>
        <li>produit / service</li>
        <li>Date</li>
        <li></li>
    </ul>

     {commande.map((com)=>(
        <ul class="content_devis" key={commande._id}>
        <li>{com.client.nomSociete}</li>
        <li>{com.description}</li>
        <li>{com.date}</li>
        <div style={{marginBottom:15,marginRight:15}}>
        <img src="/image/facture/down-arrow.png" style={{
          marginRight:12
        }}  alt="" />
        <img src="/image/facture/trash.png" alt=""  onClick={() => {
                      Swal.fire({
                        title: "Êtes - vous sûr ?",
                        text: "",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Oui, supprimez-le!",
                      }).then((result) => {
                        if (result.value) {
                            deletedCommande(com._id);
                        }
                      });
                    }}
                     />
     
        </div>
    </ul>

     ))}   
    
 
   

</div> : <div></div>}


      </div>
    </div>
  );
};

export default Commande;
