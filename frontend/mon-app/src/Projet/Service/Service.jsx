import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

const Service = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState({
    open: false,
    info: {},
  });

  const [valuesInput, setValues] = useState({});

  const [valuesInput_update, setValues_update] = useState({});

  const [service, setService] = useState([]);

  useEffect(() => {
    const data = axios
      .get("http://localhost:4000/api/service/findall")
      .then((service) => {
        setService(service.data);
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
        "http://localhost:4000/api/service/post",
        valuesInput
      );

      toast("Service a été ajouter avec success ", {
        type: "success",
      });
      const preventState = service;
      preventState.push(data.data);
      setService(preventState);
    } catch (error) {
      if (error.response.data) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  };

  const deletedService = async (id) => {
    await axios
      .delete("http://localhost:4000/api/service/deleted/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = service;
          const newState = preventStatu.filter((service) => service._id != id);
          setService(newState);
          Swal.fire("Service", "Service a été supprimé", "success");
        }
      });
  };

  const handleFormSubmitUpdate = async (event) => {
    event.preventDefault();
    const datatService = await axios.put(
      "http://localhost:4000/api/service/update/" + valuesInput_update._id,
      valuesInput_update
    );

    toast("Service a été Modifiér avec success ", {
      type: "success",
    });

    const resFind = service.find(
      (element) => element._id === valuesInput_update._id
    );
    const newState = service;
    const index = service.indexOf(resFind);
    newState[index] = datatService.data;
    setService(newState);
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
          <h3 className="font-weight-light">Ajouter un nouveau service</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom Service</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomService"
                required
                placeholder="nom Service"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Description </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="description"
                required
                placeholder="description"
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Contact (adresse email) </h5>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputUsername2"
                name="contact"
                required
                placeholder="contact"
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
          <h3 className="font-weight-light">Modifier service</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmitUpdate}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom Service</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="nomService"
                required
                value={valuesInput_update.nomService}
                placeholder="nom Service"
                onChange={MyValueInput_update}
              />
            </div>
            <h5 className="auth-link text-black">Description </h5>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="description"
                required
                value={valuesInput_update.description}
                placeholder="description"
                onChange={MyValueInput_update}
              />
            </div>

            <h5 className="auth-link text-black">Contact (adresse email) </h5>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputUsername2"
                name="contact"
                disabled
                required
                value={valuesInput_update.contact}
                placeholder="contact"
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
            <h3>Service</h3>
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
            Nouveau Service +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {service.length > 0 ? (
          <div className="title_Service">
            <ul>
              <li>Nom Service</li>
              <li>Description</li>
              <li>Contact</li>
              <li></li>
            </ul>

            {service.map((ser) => (
              <ul class="content_service" key={ser._id}>
                <li>{ser.nomService}</li>
                <li>{ser.description}</li>
                <li>{ser.contact}</li>
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
                          deletedService(ser._id);
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

export default Service;
