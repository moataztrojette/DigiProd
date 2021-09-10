import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import ModalAdd from "./Components/ModalAdd";


const Categorie = (props) => {
  Modal.setAppElement("#root");

  const [categorie, setCategorie] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


 

  
  const deletedCategorieWithId = async (id) => {
    await axios
      .delete("http://localhost:4000/api/categorie/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevCategorie = categorie;
          const newCategorie = prevCategorie.filter(
            (categorie) => categorie._id !== id
          );
          setCategorie(newCategorie);
          Swal.fire("Catégorie!", "Catégorie a été supprimé", "success");
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/categorie/findall").then((res) => {
      //console.log(res.data)
      setCategorie(res.data);
    });
  }, []);
  return (
    <div>
            {modalIsOpen ==true ? (<ModalAdd categorie={categorie} setCategorie={setCategorie}     modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />) : (<div></div>)  }      


      <div className="content_Article">
        <div className="categorie_article">
          <div className="categorie_liste">
            <div className="title_categorie_icons">
              <h3>Magazin</h3>
              <i class="mdi mdi-chevron-right"></i>
              <h3>Catégorie</h3>
              <img
                src="./image/icons/Ellipse206.png"
                style={{ width: "15px", height: "15px" }}
              ></img>
            </div>
          </div>
        </div>
        <div className="serhceInput">
          <button
            onClick={() => setModalIsOpen(true)}
            type="button"
            className="btn btn-primary-color_inv"
          >
            Nouveau Catégorie +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {categorie.map((cat) => (
          <div
            className="col-lg-3 grid-margin stretch-card"
            style={{ height: "15em" }}
          >
            <div className="card" key={cat._id}>
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
                          deletedCategorieWithId(cat._id);
                        }
                      });
                    }}
                  ></img>
                </div>
                <img
                  src={
                    "http://localhost:4000/api/categorie/getImage/" + cat._id
                  }
                  id="barChart"
                  className="imageDim"
                />
                <div className="titleArticle" style={{
                  padding:15
                }}>
                  <div className="location">
                    <h5>{cat.nomCategorie}</h5>
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

export default Categorie;
