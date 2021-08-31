import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
const Devis = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [devis, setDevis] = useState([]);
  const [client, setClient] = useState([]);
  const [dateDevis, setDateDevis] = useState([]);

  const uploadToState = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.files[0];
    setValues(res);
  };

  useEffect(() => {
    const data = axios
      .get("http://localhost:4000/api/devis/findall")
      .then((devis) => {
        setDevis(devis.data);

        axios.get("http://localhost:4000/api/devis/finddate").then((date) => {
          setDateDevis(date.data);
        });

        axios.get("http://localhost:4000/api/client/findall").then((cl) => {
          if (cl.data[0]) {
            let cli = cl.data[0]._id;

            setValues({
              client: cli,
              etatDevis: "entrant",
            });
          }
          setClient(cl.data);
        });
      });
  }, []);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fichier", valuesInput.fichier);
    formData.append("client", valuesInput.client);
    formData.append("description", valuesInput.description);
    formData.append("date", valuesInput.date);
    formData.append("etatDevis", valuesInput.etatDevis);

    const data = await axios.post(
      "http://localhost:4000/api/devis/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Devis a été ajouter avec success ", {
      type: "success",
    });
    const preventState = devis;
    preventState.push(data.data);
    setDevis(preventState);
  };

  const deletedDevis = async (id) => {
    await axios
      .delete("http://localhost:4000/api/devis/delete/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = devis;
          const newState = preventStatu.filter((dev) => dev._id != id);
          setDevis(newState);
          Swal.fire("Devis", "Devis a été supprimé", "success");
        }
      });
  };

  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/devis/findall").then((res) => {
        setDevis(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/devis/filter/" + event.target.value
      );
      setDevis(filter.data);
    }
  };

  const FilteritemsEtatDevis = async (event) => {
    const filter = await axios.get(
      "http://localhost:4000/api/devis/filter/etatdevis/" + event.target.value
    );
    setDevis(filter.data);
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
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Ajouter un Devis</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black"> Société</h5>
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
            <h5 className="auth-link text-black">produit/service </h5>

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

            <h5 className="auth-link text-black">État Devis </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="etatDevis"
                onChange={MyValueInput}
              >
                <option value="entrant">entrant</option>
                <option value="sortant">sortant </option>
              </select>
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black"> Devis</h5>
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
            <h3>Devis</h3>
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
            onClick={FilteritemsEtatDevis}
          >
            Devis entrants
          </button>
          <button
            className="btn_filter"
            value="sortant"
            onClick={FilteritemsEtatDevis}
          >
            Devis sortants
          </button>
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
            {dateDevis.map((DevisDate) => (
              <option value={DevisDate}>{DevisDate}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-color_inv"
          >
            Nouveau devis +{" "}
          </button>
        </div>
      </div>

      <div
        className="serhceInput"
        style={{
          marginTop: 15,
        }}
      ></div>

      <div className="row">
        {devis.length > 0 ? (
          <div className="title_devis">
            <ul className="ul_fac">
              <li>Societé</li>
              <li>produit/service</li>
              <li>Date</li>
              <li></li>
            </ul>

            {devis.map((dev) => (
              <ul class="content_devis" key={devis._id}>
                <li>{dev.client.nomSociete}</li>
                <li>{dev.description}</li>
                <li>{dev.date}</li>
                <div style={{ marginBottom: 15, marginRight: 15 }}>
                  <a
                    href={"http://localhost:4000/api/devis/file/" + dev._id}
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
                          deletedDevis(dev._id);
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

export default Devis;
