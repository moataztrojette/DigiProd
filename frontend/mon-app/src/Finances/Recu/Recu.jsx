import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';


import "react-toastify/dist/ReactToastify.css";
const Recu = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [recu,setRecu] = useState([])
  const[dateRecu,setDateRecu] = useState([])
  const [client,setClient] = useState([])
  const [depot,setDepot] = useState([])



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
    event.preventDefault();
    const formData = new FormData();
    formData.append("fichier", valuesInput.fichier);
    formData.append("nomAgence", valuesInput.nomAgence);
    formData.append("total", valuesInput.total);
    formData.append("date", valuesInput.date);
    formData.append("receveur", valuesInput.receveur);
    formData.append("etatRecu", valuesInput.etatRecu);

  

    const data =await axios.post("http://localhost:4000/api/recu/post",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

            toast("Reçu a été ajouter avec success ", {
                type: "success",
              });
              const preventState = recu
              preventState.push(data.data)
              setRecu(preventState)
  };

  useEffect(() => {  

        axios.get("http://localhost:4000/api/recu/findall").then((res)=>{
          
                setRecu(res.data)
            
        axios.get("http://localhost:4000/api/recu/finddate").then((res2)=>{
            setDateRecu(res2.data)

              axios.get("http://localhost:4000/api/depot/findall").then((dep)=>{
                if(dep.data[0]){
                  let  rec = dep.data[0]._id
                
                                
            axios.get("http://localhost:4000/api/client/findall").then((cl)=>{

              if(cl.data[0]){
                let  cli = cl.data[0]._id
  
                setValues({
                  nomAgence : cli,
                  etatRecu : "entrant",
                  receveur : rec
                })
              }
              setClient(cl.data)
              setDepot(dep.data)
  
  
            })
        }})

        })            
            })

  }, []);

  
  const deletedRecu = async (id)=>{

    await axios.delete("http://localhost:4000/api/recu/delete/" + id)
    .then((verife)=>{
      if(verife.status !== 200){
        Swal.fire("Deleted!", "Your file has been deleted.", "error");
      }
      else{
        const preventStatu = recu
        const newState = preventStatu.filter((recu)=> recu._id !=  id)
        setRecu(newState)
        Swal.fire("Reçu", "Reçu a été supprimé", "success");
      }
    })
  }


  const Filteritems = async (event)=>{
    if(event.target.value === 'all'){
      axios.get("http://localhost:4000/api/recu/findall").then((res) => {
        setRecu(res.data);
    });
    }
    else{
      const filter = await axios.get("http://localhost:4000/api/recu/filter/"+ event.target.value)
        setRecu(filter.data)
    }
   
  }

  const FilteritemsEtatRecu = async (event)=>{
      const filter = await axios.get("http://localhost:4000/api/recu/filter/etatrecu/"+ event.target.value)
        setRecu(filter.data)
   
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
            <h3 className="font-weight-light">Ajouter un nouveau reçu</h3>
            <br />
            <form className="pt-3" onSubmit={handleFormSubmit} 
>
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de l'agence</h5>
                <select
                  className="select_categorie"
                  name="nomAgence"
                  onChange={MyValueInput}
                >
                  {client.map((cl)=>(
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
                  {depot.map((dep)=>(
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
<h3>reçu</h3>
    <img src="./image/icons/Ellipse206.png" style={{width:"15px",height:"15px"}}></img>
    </div>
  </div>
  <div className="serhceInput">

          <button className="btn_filter" value="entrant" onClick={FilteritemsEtatRecu} >Reçus entrants</button>
          <button className="btn_filter" value="sortant" onClick={FilteritemsEtatRecu}>Reçus sortants</button>

  <div className="select">
          <select
                     className="form-select_Art"
                     aria-label="Default select example"
                    name="date"
                   onChange={Filteritems}
                >
                  <option value="all">Date</option>
                {dateRecu.map((recuDate)=>(
                 <option value={recuDate}>{recuDate}</option>
                ))}  
                       </select>


           


          </div>

    <button type="button" onClick={() => setModalIsOpen(true)}
 className="btn btn-primary-color_inv">Nouveau reçu + </button>
  </div>
</div>
         

      <div className="row">

      {recu.map((recu) => (


          <div
            className="col-lg-3 grid-margin stretch-card"
            style={{ height: "20em"}}
          >

            <div className="card">
              <div className="card-body">
                <div class="image__overlay2 image__overlay--primary">
                  <img
                    src="./image/icons/Group944.png"
                    onClick={() => {
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
                          deletedRecu(recu._id);
                        }
                      });
                    }}
                  ></img>
                </div>
              
                <div className="title_Article">
                  <h3>{recu.nomAgence.nomSociete}</h3>
                </div>
                <div className="agence">
                  <div className="agence_item">
                    <h4>Total </h4>
                    <h4>{recu.total}  DT</h4>
                  </div>
                  
                  <div className="agence_item">
                    <h4>Date</h4>
                    <h4>{recu.date}  </h4>
                  </div>

                  <div className="agence_item">
                    <h4>Receveur </h4>
                    <h4>{recu.receveur.nomDepot}</h4>
                  </div>

                    <div className="pdf">
                       <a href={"http://localhost:4000/api/recu/file/"+recu._id} download target="_blank" ><h5>Télécharger PDF</h5></a>
                    </div>
                   
                </div>
              </div>

            </div>

          </div>
        
        ))}

      </div>
    </div>
  );
};

export default Recu;
