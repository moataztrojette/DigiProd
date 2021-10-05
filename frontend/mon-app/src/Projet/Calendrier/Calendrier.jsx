import React, { useEffect, useState } from "react";

import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ModalAdd from "./components/ModalAdd";


const Calendrier = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
      console.log(modalIsOpen)    
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




  return (
    <div>
          {modalIsOpen ==true ? (<ModalAdd calendar={calendar} setCalendar={setCalendar} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />) : (<div></div>)  }      
      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Projet</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Calendrier</h3>
            <img
              src="./image/icons/Ellipse206.png"
              alt="erreur"
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
