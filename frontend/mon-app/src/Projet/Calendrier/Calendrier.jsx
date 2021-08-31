import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Calendrier = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [valuesInput, setValues] = useState({});

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/calendar/findall").then((data) => {
      setCalendar(data.data);
    });
  }, []);

  const colorTache = (pourcentage) => {
    if (pourcentage > 0) {
      return "rgb(239, 187, 174)";
    }
    return "rgb(244, 234, 180)";
  };

  const eventsCalendar = () => {
    const res = calendar.map((event) => {
      return {
        title:
          event.title +
          " " +
          event.pourcentage +
          "%    " +
          event.heureDebut +
          "-" +
          event.heureFin,
        start: event.start,
        end: event.end,
        backgroundColor: colorTache(event.pourcentage),
        color: "black",
        textColor: "rgba(0, 0, 0, 1)",
        //onvrdisplaypresentchange : deletedTache(event._id)
      };
    });
    return res;
  };

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const deletedTache = async (id) => {
    await axios
      .delete("http://localhost:4000/api/calendar/delete/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = calendar;
          const newState = preventStatu.filter((cal) => cal._id != id);
          setCalendar(newState);
          Swal.fire("Tache", "Tache a été supprimé", "success");
        }
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post(
      "http://localhost:4000/api/calendar/post",
      valuesInput
    );

    toast(" Tâche  a été ajouter avec success ", {
      type: "success",
    });

    const preventState = calendar;
    preventState.push(data.data);
    setCalendar(preventState);
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
          <h3 className="font-weight-light">Ajouter un nouveau Tâche</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black">Nom de la Tâche</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="title"
                required
                placeholder="title"
                onChange={MyValueInput}
              />
            </div>
            <h5 className="auth-link text-black">Date de début </h5>

            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="start"
                required
                onChange={MyValueInput}
              />
            </div>

            <h5 className="auth-link text-black">Date de Fin </h5>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="end"
                required
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black">Pourcentage </h5>
              <input
                type="range"
                id="volume"
                name="pourcentage"
                min="0"
                max="100"
                onChange={MyValueInput}
              ></input>
            </div>

            <h5 className="auth-link text-black">Heure début </h5>
            <div className="form-group">
              <input
                type="time"
                id="appt"
                name="heureDebut"
                min="07:00"
                max="00:00"
                required
                onChange={MyValueInput}
              ></input>
            </div>

            <h5 className="auth-link text-black">Heure fin </h5>
            <div className="form-group">
              <input
                type="time"
                id="appt"
                name="heureFin"
                min="07:00"
                max="00:00"
                required
                onChange={MyValueInput}
              ></input>
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
            <h3>Projet</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Calendrier</h3>
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
            Nouvelle Tâche +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        <div
          id="calendar"
          style={{
            position: "relative",
            zIndex: 0,
          }}
        >
          <FullCalendar
            defaultView="dayGridMonth"
            height={650}
            aspectRatio={5}
            plugins={[dayGridPlugin]}
            themeSystem="bootstrap4"
            weekends={false}
            locale="fr"
            events={eventsCalendar()}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendrier;
