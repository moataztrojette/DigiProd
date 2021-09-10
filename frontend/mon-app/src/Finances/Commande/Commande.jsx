import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";
const Commande = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});

  const [commande, setCommande] = useState([]);

  const [client, setClient] = useState([]);
  const [dateCommande, setDateCommande] = useState([]);

  const [commandeEntrant,setCommandeEntrant] = useState([])
  const [commandeSortant,setCommandeSortant] = useState([])




  useEffect(() => {
    const data = axios
      .get("http://localhost:4000/api/commande/findall")
      .then((com) => {
        setCommande(com.data);

        axios
          .get("http://localhost:4000/api/commande/finddate")
          .then((date) => {
            setDateCommande(date.data);
          });

        axios.get("http://localhost:4000/api/client/findall").then((cl) => {
          if (cl.data[0]) {
            let cli = cl.data[0]._id;

            setValues({
              client: cli,
              etatCommande: "entrant",
            });
          }
          setClient(cl.data);
        });
      });

      axios.get("http://localhost:4000/api/commande/count/entrant").then((count)=>{
        setCommandeEntrant(count.data)
      })
    
      axios.get("http://localhost:4000/api/commande/count/sortant").then((countCommande)=>{
        setCommandeSortant(countCommande.data)
      })


  }, []);

 



  const deletedCommande = async (id) => {
    await axios
      .delete("http://localhost:4000/api/commande/delete/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = commande;
          const newState = preventStatu.filter((com) => com._id != id);
          setCommande(newState);
          Swal.fire("Commande", "Commande a été supprimé", "success");
        }
      });
  };

  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/commande/findall").then((res) => {
        setCommande(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/commande/filter/" + event.target.value
      );
      setCommande(filter.data);
    }
  };

  const FilteritemsEtatCommande = async (event) => {
    const filter = await axios.get(
      "http://localhost:4000/api/commande/filter/etatcommande/" +
        event.target.value
    );
    setCommande(filter.data);
  };

  return (
    <div>
   
   {modalIsOpen ==true ? (<ModalAdd client={client} setClient={setClient} commande={commande } setCommande={setCommande} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} valuesInput={valuesInput} setValues={setValues} />) : (<div></div>)  }      

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Finances</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>bon de commande</h3>
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
            onClick={FilteritemsEtatCommande}
          >
            Commande entrants {commandeEntrant}
          </button>
          <button
            className="btn_filter"
            value="sortant"
            onClick={FilteritemsEtatCommande}
          >
            Commande sortants {commandeSortant}
          </button>
        </div>
      </div>
      <div className="image_facture">
        <img src="/image/facture/Groupe939.png" className="image_fac"></img>
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
            {dateCommande.map((commDate) => (
              <option value={commDate}>{commDate}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-color_inv"
          >
            Nouveau bon +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {commande.length > 0 ? (
          <div className="title_devis">
            <ul className="ul_fac">
              <li>Société (de)</li>
              <li>produit / service</li>
              <li>Date</li>
              <li></li>
            </ul>

            {commande.map((com) => (
              <ul class="content_devis" key={commande._id}>
                <li>{com.client.nomSociete}</li>
                <li>{com.description}</li>
                <li>{com.date}</li>
                <div style={{ marginBottom: 15, marginRight: 15 }}>
                  <a
                    href={"http://localhost:4000/api/commande/file/" + com._id}
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
                          deletedCommande(com._id);
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

export default Commande;
