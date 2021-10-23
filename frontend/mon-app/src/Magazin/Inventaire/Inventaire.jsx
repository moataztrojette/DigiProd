import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import axios from "axios";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ModalAdd from "./Components/ModalAdd";


const Inventaire = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [depot, setDepot] = useState([]);
  const [membre, setMembre] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/depot/findall").then((depot) => {
      setDepot(depot.data);
    });

    axios.get("http://localhost:4000/api/membre/findall").then((mem) => {
      if (mem.data[0]) {
        let membreFirst = mem.data[0]._id;

        setValues({
          responsable: membreFirst,
        });

        setMembre(mem.data);
      }
    });
  }, []);

 



  const deletedDepotWithId = async (id) => {
    await axios
      .delete("http://localhost:4000/api/depot/deleted/" + id)
      .then((verife) => {
        if (verife.status != 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = depot;
          const newState = preventStatu.filter((depot) => depot._id != id);
          setDepot(newState);
          Swal.fire("Dépot", "Dépot a été supprimé", "success");
        }
      });
  };

  return (
    <div>
       {modalIsOpen === true ? (<ModalAdd depot={depot} setDepot={setDepot} membre={membre} setMembre={setMembre} valuesInput={valuesInput} setValues={setValues}   modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />) : (<div></div>)  }      

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Magasin</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Inventaire</h3>
            <img
              src="./image/icons/Ellipse206.png"
              alt="erreur"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-color_inv"
          >
            Nouveau dépôt +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {depot.map((res) => (
          <div
            className="col-lg-4 grid-margin stretch-card"
            style={{ height: "18em" }}
          >
            <div className="card">
              <div className="card-body">
                <div class="image__overlay2 image__overlay--primary">
                  <img
                    src="./image/icons/Group944.png"
                    alt="erreur"
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
                          deletedDepotWithId(res._id);
                        }
                      });
                    }}
                  ></img>
                </div>
                <img
                  src={"http://localhost:4000/api/depot/getImage/" + res._id}
                  id="barChart"
                  className="imageDimCat2"
                  alt="erreur"
                />

                <div
                  className="titleArticle"
                  style={{
                    padding: 15,
                  }}
                >
                  <div className="location">
                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                    <Link to={"/serche/" + res._id}>
                      <h5>Dépôt {res.nomDepot}</h5>
                    </Link>
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

export default Inventaire;
