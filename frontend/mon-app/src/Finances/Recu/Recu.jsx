import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';


import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";
const Recu = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [recu,setRecu] = useState([])
  const[dateRecu,setDateRecu] = useState([])
  const [client,setClient] = useState([])
  const [depot,setDepot] = useState([])
  const [recuEntrant,setRecuEntrant] = useState([])
  const [recuSortant,setRecuSortant] = useState([])



  
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

  axios.get("http://localhost:4000/api/recu/count/entrant").then((count)=>{
    setRecuEntrant(count.data)
  })

  axios.get("http://localhost:4000/api/recu/count/sortant").then((countRecu)=>{
    setRecuSortant(countRecu.data)
  })


  





 


  

  return (
    <div>
                    
                  
                    {modalIsOpen ==true ? (<ModalAdd recu={recu} setRecu={setRecu} valuesInput={valuesInput} setValues={setValues} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} depot={depot} setDepot={setDepot} client={client} setClient={setClient} />) : (<div></div>)  }      

       

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

          <button className="btn_filter" value="entrant" onClick={FilteritemsEtatRecu} >Reçus entrants {recuEntrant}</button>
          <button className="btn_filter" value="sortant" onClick={FilteritemsEtatRecu}>Reçus sortants {recuSortant}</button>

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
