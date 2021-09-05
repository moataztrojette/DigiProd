import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
const Inventaire = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [depot, setDepot] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/depot/findall").then((depot) => {
      setDepot(depot.data);
    });
  }, []);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const uploadToState = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.files[0];
    setValues(res);
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("nomDepot", valuesInput.nomDepot);
      formData.append("localisation", valuesInput.localisation);
      formData.append("responsable", valuesInput.responsable);
      formData.append("imageDepot", valuesInput.imageDepot);

      const dep = await axios.post(
        "http://localhost:4000/api/depot/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Dépot a été ajouter avec success ", {
        type: "success",
      });

      const preventDepot = depot;
      preventDepot.push(dep.data);
      setDepot(preventDepot);
    } catch (error) {
      if (error.response.data) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  };

  const deletedDepotWithId = async (id) => {
    await axios
      .delete("http://localhost:4000/api/depot/deleted/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
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
        <div className="auth-form-light text-left p-5">
          <h3 className="font-weight-light">Ajouter un nouveau Depot</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <h5 className="auth-link text-black">Nom dépot</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomDepot"
                required
                placeholder="Nom dépot"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">localisation </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="localisation"
                required
                placeholder="localisation"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Responsable </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="responsable"
                required
                placeholder="Responsable"
                onChange={MyValueInput}
              />
            </div>
            <ToastContainer></ToastContainer>

            <div className="form-group">
              <h5 className="auth-link text-black">Image </h5>

              <input
                type="file"
                className="form-control"
                name="imageDepot"
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
      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Magazin</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Inventaire</h3>
            <img
              src="./image/icons/Ellipse206.png"
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
            Nouveau depot +{" "}
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
                />

                <div className="titleArticle" style={{
                  padding:15
                }}>
                  <div className="location">
                    
                    <LocationOnOutlinedIcon  ></LocationOnOutlinedIcon>
                    <Link to={"/serche/" + res._id}>
                      <h5>Depot {res.nomDepot}</h5>
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
