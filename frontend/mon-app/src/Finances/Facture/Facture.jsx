import axios from "axios";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";
const Facture = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [facture, setFacture] = useState([]);
  const [client, setClient] = useState([]);
  const [dateFacture, setDateFacture] = useState([]);
  const [countFactureEntrant,setCountFactureEntrant] = useState([])
  const [countFactureSortant,setCountFactureSortant] = useState([])



  useEffect(() => {
    axios
      .get("http://localhost:4000/api/facture/findall")
      .then((fact) => {
        setFacture(fact.data);
      });
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
 

      axios.get("http://localhost:4000/api/facture/count").then((count)=>{
        setCountFactureEntrant(count.data)
      })

      axios.get("http://localhost:4000/api/facture/count/facture/sortant").then((countfact)=>{
        setCountFactureSortant(countfact.data)
      })

  }, []);



  const deletedFacture = async (id) => {
    await axios
      .delete("http://localhost:4000/api/facture/delete/" + id)
      .then((verife) => {
        if (verife.status != 200) {
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
        {modalIsOpen ===true ? (<ModalAdd client={client} setClient={setClient} facture={facture} setFacture={setFacture} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} valuesInput={valuesInput} setValues={setValues} />) : (<div></div>)  }      
 

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Finances</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Factures</h3>
            <img
              src="./image/icons/Ellipse206.png" alt="erreur"
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
            Factures entrantes ({countFactureEntrant})
          </button>
          <button
            className="btn_filter"
            value="sortant"
            onClick={FilteritemsEtatRecu}
            

          >
            Factures sortantes ({countFactureSortant})
          </button>
        </div>
      </div>
      <div className="image_facture">
        <img src="/image/facture/Groupe934.png" alt="erreur" className="image_fac"></img>
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
              <li>Client</li>
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
