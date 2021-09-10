import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import ModalAdd from "./Components/ModalAdd";
import ModalUpdate from "./Components/ModalUpdate";


const Client = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState({
    open: false,
    info: {},
  });
  const [client, setClient] = useState([]);



  const [valuesInput_update, setValues_update] = useState({});

  const MyValueInput_update = (event) => {
      let res = valuesInput_update;
      setValues_update({ ...res, [event.target.name]: event.target.value });
    };


  useEffect(() => {

    console.log(modalIsOpen)
    console.log(modalUpdateIsOpen)
    const data = axios
      .get("http://localhost:4000/api/client/findall")
      .then((client) => {
        setClient(client.data);
      });
  }, []);

  



  const deletedClient = async (id) => {
    await axios
      .delete("http://localhost:4000/api/client/deleted/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = client;
          const newState = preventStatu.filter((client) => client._id != id);
          setClient(newState);
          Swal.fire("Client", "Client a été supprimé", "success");
        }
      });
  };



  return (
    <div>
  {modalIsOpen ==true ? (<ModalAdd client={client} setClient={setClient} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />) : (<div></div>)  }      
  {modalUpdateIsOpen.open ==true ? (<ModalUpdate MyValueInput_update={MyValueInput_update} valuesInput_update={valuesInput_update} setValues_update={setValues_update} client={client} setClient={setClient} modalUpdateIsOpen={modalUpdateIsOpen} setModalUpdateIsOpen={setModalUpdateIsOpen} />) : (<div></div>)  }  

 
      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Projet</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Clients</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <button
            type="button"
            className="btn btn-primary-color_inv"
            onClick={() => setModalIsOpen(true)}
          >
            Nouveau Client +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {client.length > 0 ? (
          <div className="title_Client">
            <ul>
              <li>Nom de la société</li>
              <li>Adresse Email</li>
              <li>Téléphone</li>
              <li></li>
            </ul>

            {client.map((ser) => (
              <ul class="content_client" key={ser._id}>
                <li>{ser.nomSociete}</li>
                <li>{ser.adresseEmail}</li>
                <li>{ser.telephone}</li>
                <div style={{ marginBottom: 15, marginRight: 15 }}>
                  <img
                    src="/image/icons/delete_icons.png"
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
                          deletedClient(ser._id);
                        }
                      });
                    }}
                  />
                  <img
                    src="/image/icons/update_icons.png"
                    onClick={() => {
                      setModalUpdateIsOpen({
                        open: true,
                        info: ser,
                      });
                      setValues_update(ser);
                    }}
                    alt=""
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

export default Client;
