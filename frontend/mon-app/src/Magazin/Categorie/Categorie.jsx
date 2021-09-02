import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Categorie = (props) => {
  Modal.setAppElement("#root");

  const [categorie, setCategorie] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [valuesInput, setValues] = useState({ typeCategorie: "materiels" });

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
      formData.append("miniature", valuesInput.miniature);
      formData.append("nomCategorie", valuesInput.nomCategorie);
      formData.append("typeCategorie", valuesInput.typeCategorie);

      const data = await axios.post(
        "http://localhost:4000/api/categorie/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Catégorie a été ajouter avec success ", {
        type: "success",
      });

      const prevStateCat = categorie;
      prevStateCat.push(data.data);
      setCategorie(prevStateCat);
    } catch (error) {
      toast(error.response.data, {
        type: "error",
      });
    }
  };
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
        <div className="auth-form-light text-left p-5">
          <h3 className="font-weight-light">Ajouter un nouveau Catégorie</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <h5 className="auth-link text-black">Nom Catégorie</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomCategorie"
                required
                placeholder="Nom de la catégorie"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Type Catégorie </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="typeCategorie"
                onChange={MyValueInput}
              >
                <option value="materiels">Materiels </option>
                <option value="services">Services</option>
              </select>
            </div>
            <ToastContainer></ToastContainer>

            <div className="form-group">
              <h5 className="auth-link text-black">Miniature </h5>

              <input
                type="file"
                className="form-control"
                name="miniature"
                id="exampleInputMobile"
                required
                placeholder="Miniature"
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
