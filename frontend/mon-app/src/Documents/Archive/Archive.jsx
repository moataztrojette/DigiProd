import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";


const Archive = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [archive, setArchive] = useState([]);
  const [dateArchive, setDateArchive] = useState([]);
  
  const color = ["#FFE8E3","#D7F6FE","#E1E3E8","#F9F6DC"]

  
  useEffect(() => {
    axios.get("http://localhost:4000/api/archive/findall").then((arch) => {
      setArchive(arch.data);
    });

    axios
      .get("http://localhost:4000/api/archive/finddate")
      .then((date) => {
        setDateArchive(date.data);
      });
  }, []);

 
  

  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios
        .get("http://localhost:4000/api/archive/findall")
        .then((res) => {
          setArchive(res.data);
        });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/archive/filter/" + event.target.value
      );
      setArchive(filter.data);
    }
  };

  const rechercheDoc = async (event)=>{
    if (event.target.value === "") {
      axios.get("http://localhost:4000/api/archive/findall").then((res) => {
        setArchive(res.data);
      });
    } else {
      let serche = await  axios.get(
        "http://localhost:4000/api/archive/serhce/" + event.target.value
      );
      setArchive(serche.data);
    }
  }

  const deletedArchive = async (id) => {
    await axios
      .delete("http://localhost:4000/api/archive/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevState = archive;
          const newState = prevState.filter((arch) => arch._id !== id);
          setArchive(newState);
          Swal.fire("Archive!", "Documents a été supprimé", "success");
        }
      });
  };



  return (
    <div>
       {modalIsOpen ==true ? (<ModalAdd archive={archive} setArchive={setArchive} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />) : (<div></div>)  }      


      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Documents</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Archive</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
        <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div>
                <i className="input-group-text border-0 mdi mdi-magnify" />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="chercher Document"
                name="serche"
                onChange={rechercheDoc}

                
              />
            </div>
          </form>

          <button
            type="button"
            className="btn btn-primary-color_inv"
            onClick={() => setModalIsOpen(true)}
          >
            Nouvel archive +{" "}
          </button>
        </div>
      </div>

      <div className="row">
      

      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row" style={{
            width:"100%",
            height:"100%"
        }}>
                  {archive.map((arch) => (

          <div className="col-md-3 mt-2" key={arch._id}>
            <div className="card" >
              <div className="card-body">
                <div className="card-img-actions" style={{
                  backgroundColor:color[Math.floor(Math.random() * color.length)]
                }}> 
                <a
                    href={"http://localhost:4000/api/archive/file/" + arch._id}
                    download
                    target="_blank"
                  >
                 <img src="/image/documents/doc.png" className="image_archive"/></a>

                </div>
              </div>
              <div className="card-body bg-light text-center">
              
                <div className="mb-3" style={{
                  fontWeight:"bold",
                  fontSize:17,
                  color:"black",
                }}>{arch.description}</div>
                <i className="mdi mdi-delete-sweep"     onClick={() => {
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
                          deletedArchive(arch._id);
                        }
                      });
                    }}></i>

              </div>
            </div>
          </div>
          ))}



  


    
     

        

        </div>





      </div>

      





    </div>
    </div>
  );
};

export default Archive;
