import axios from "axios";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";
const Devis = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [devis, setDevis] = useState([]);
  const [client, setClient] = useState([]);
  const [dateDevis, setDateDevis] = useState([]);

  const [devisEntrant,setDevisEntrant] = useState([])
  const [devisSortant,setDevisSortant] = useState([])
  
  

  useEffect(() => {
    axios
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

      axios.get("http://localhost:4000/api/devis/count/entrant").then((count)=>{
        setDevisEntrant(count.data)
      })
    
      axios.get("http://localhost:4000/api/devis/count/sortant").then((countDevis)=>{
        setDevisSortant(countDevis.data)
      })

  }, []);



  const deletedDevis = async (id) => {
    await axios
      .delete("http://localhost:4000/api/devis/delete/" + id)
      .then((verife) => {
        if (verife.status != 200) {
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
     
   {modalIsOpen === true ? (<ModalAdd client={client} setClient={setClient} devis={devis} setDevis={setDevis} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} valuesInput={valuesInput} setValues={setValues} />) : (<div></div>)  }      

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Finances</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Devis</h3>
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
            onClick={FilteritemsEtatDevis}
          >
            Devis entrants {devisEntrant}
          </button>
          <button
            className="btn_filter"
            value="sortant"
            onClick={FilteritemsEtatDevis}
          >
            Devis sortants {devisSortant}
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
