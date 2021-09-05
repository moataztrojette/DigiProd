import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
const Facture = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [facture, setFacture] = useState([]);
  const [client, setClient] = useState([]);
  const [dateFacture, setDateFacture] = useState([]);

  useEffect(() => {
    const data = axios
      .get("http://localhost:4000/api/facture/findall")
      .then((fact) => {
        setFacture(fact.data);

        axios.get("http://localhost:4000/api/facture/finddate").then((date) => {
          setDateFacture(date.data);
        });

        axios.get("http://localhost:4000/api/client/findall").then((cl) => {
          if (cl.data[0]) {
            let cli = cl.data[0]._id;

            setValues({
              client: cli,
              etatfacture: "entrant",
            });
          }
          setClient(cl.data);
        });
      });
  }, []);

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
    formData.append("client", valuesInput.client);
    formData.append("description", valuesInput.description);
    formData.append("date", valuesInput.date);
    formData.append("prix", valuesInput.prix);
    formData.append("etatfacture", valuesInput.etatfacture);
    formData.append("fichier", valuesInput.fichier);

    const data = await axios.post(
      "http://localhost:4000/api/facture/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Facture a été ajouter avec success ", {
      type: "success",
    });
    const preventState = facture;
    preventState.push(data.data);
    setFacture(preventState);
  };

  const deletedFacture = async (id) => {
    await axios
      .delete("http://localhost:4000/api/facture/delete/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = facture;
          const newState = preventStatu.filter((fact) => fact._id != id);
          setFacture(newState);
          Swal.fire("Facture", "Facture a été supprimé", "success");
        }
      });
  };

  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/facture/findall").then((res) => {
        setFacture(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/facture/filter/" + event.target.value
      );
      setFacture(filter.data);
    }
  };

  const FilteritemsEtatRecu = async (event) => {
    const filter = await axios.get(
      "http://localhost:4000/api/facture/filter/etatfacture/" +
        event.target.value
    );
    setFacture(filter.data);
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
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Ajouter un Nouvelle Facture</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black"> Selectionner client</h5>
              <select
                className="select_categorie"
                name="client"
                onChange={MyValueInput}
              >
                {client.map((cl) => (
                  <option value={cl._id}>{cl.nomSociete}</option>
                ))}
              </select>
            </div>
            <h5 className="auth-link text-black">
              Description du produit /service{" "}
            </h5>

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

            <div className="form-group">
              <h5 className="auth-link text-black"> Prix</h5>
              <input
                type="number"
                className="form-control"
                id="exampleInputUsername2"
                name="prix"
                required
                placeholder="Prix"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">État Facture </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="etatfacture"
                onChange={MyValueInput}
              >
                <option value="entrant">entrant</option>
                <option value="sortant">sortant </option>
              </select>
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black"> Facture</h5>
              <input
                type="file"
                className="form-control"
                id="exampleInputUsername2"
                name="fichier"
                required
                placeholder="File"
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
            <h3>Factures</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <button
            className="btn_filter"
            value="entrant"
            onClick={FilteritemsEtatRecu}
          >
            Factures entrants
          </button>
          <button
            className="btn_filter"
            value="sortant"
            onClick={FilteritemsEtatRecu}
          >
            Factures sortants
          </button>
        </div>
      </div>
      <div className="image_facture">
        <img src="/image/facture/Groupe934.png" className="image_fac"></img>
      </div>

      <div
        className="serhceInput"
        style={{
          marginTop: 15,
        }}
      >
        <div
          className="select"
          style={{
            marginLeft: "70%",
          }}
        >
          <select
            style={{
              marginRight: 10,
            }}
            className="form-select_Art"
            aria-label="Default select example"
            name="date"
            onChange={Filteritems}
          >
            <option value="all">Date</option>
            {dateFacture.map((factDate) => (
              <option value={factDate}>{factDate}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-color_inv"
          >
            Nouvelle Facture +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {facture.length > 0 ? (
          <div className="title_facture">
            <ul className="ul_fac">
              <li>Client (pour)</li>
              <li>Description du produit / service</li>
              <li>Prix</li>
              <li>Date d'échéance</li>
              <li></li>
            </ul>

            {facture.map((fact) => (
              <ul class="content_Facture" key={fact._id}>
                <li>{fact.client.nomSociete}</li>
                <li>{fact.description}</li>
                <li>{fact.prix}DT</li>
                <li>{fact.date}</li>
                <div style={{ marginBottom: 15, marginRight: 15 }}>
                  <a
                    href={"http://localhost:4000/api/facture/file/" + fact._id}
                    download
                    target="_blank"
                  >
                    <img
                      src="/image/facture/down-arrow.png"
                      style={{
                        marginRight: 12,
                      }}
                      alt=""
                    />
                  </a>

                  <img
                    src="/image/facture/trash.png"
                    alt=""
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
                          deletedFacture(fact._id);
                        }
                      });
                    }}
                  />
                </div>
              </ul>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Facture;
