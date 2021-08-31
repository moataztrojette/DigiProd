import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

const Client = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState({
    open: false,
    info: {},
  });

  const [valuesInput, setValues] = useState({});

  const [valuesInput_update, setValues_update] = useState({});

  const [client, setClient] = useState([]);

  useEffect(() => {
    const data = axios
      .get("http://localhost:4000/api/client/findall")
      .then((client) => {
        setClient(client.data);
      });
  }, []);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const MyValueInput_update = (event) => {
    let res = valuesInput_update;
    setValues_update({ ...res, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await axios.post(
        "http://localhost:4000/api/client/post",
        valuesInput
      );

      toast("Client a été ajouter avec success ", {
        type: "success",
      });
      const preventState = client;
      preventState.push(data.data);
      setClient(preventState);
    } catch (error) {
      if (error.response.data) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  };

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

  const handleFormSubmitUpdate = async (event) => {
    try {
      event.preventDefault();
      const dataClient = await axios.put(
        "http://localhost:4000/api/client/update/" + valuesInput_update._id,
        valuesInput_update
      );

      toast("Client a été Modifiér avec success ", {
        type: "success",
      });

      const resFind = client.find(
        (element) => element._id === valuesInput_update._id
      );
      const newState = client;
      const index = client.indexOf(resFind);
      newState[index] = dataClient.data;
      setClient(newState);
    } catch (error) {
      toast(error.response.data, {
        type: "error",
      });
    }
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
        <div className="auth-form-light text-left p-5">
          <h3 className="font-weight-light">Ajouter un nouveau Client</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la société</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomSociete"
                required
                placeholder="Nom Société"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Adresse email </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="adresseEmail"
                required
                placeholder="adresse Email"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Téléphone </h5>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputUsername2"
                name="telephone"
                required
                placeholder="Téléphone"
                onChange={MyValueInput}
              />
            </div>
            <ToastContainer></ToastContainer>

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

      <Modal
        isOpen={modalUpdateIsOpen.open}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setModalUpdateIsOpen({
            open: false,
            info: {},
          });
          setValues_update({});
        }}
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
          <h3 className="font-weight-light">Modifier Client</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmitUpdate}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la Société</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomSociete"
                required
                value={valuesInput_update.nomSociete}
                placeholder="nom Societe"
                onChange={MyValueInput_update}
              />
            </div>
            <h5 className="auth-link text-black">Adresse Email </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="adresseEmail"
                required
                disabled
                value={valuesInput_update.adresseEmail}
                placeholder="adresse Email"
              />
            </div>

            <h5 className="auth-link text-black">Téléphone</h5>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputUsername2"
                name="telephone"
                required
                value={valuesInput_update.telephone}
                placeholder="Téléphone"
                onChange={MyValueInput_update}
              />
            </div>
            <ToastContainer></ToastContainer>

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
                onClick={() =>
                  setModalUpdateIsOpen({
                    open: false,
                    info: {},
                  })
                }
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
