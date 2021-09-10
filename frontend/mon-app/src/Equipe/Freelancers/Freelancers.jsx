import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";


const Freelancers = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [freelancer, setFreelnacer] = useState([]);
  const [specialite, setSpecialite] = useState([]);


  const color = ["#FFE8E3", "#D7F6FE", "#E1E3E8", "#F9F6DC"];

  useEffect(() => {
    //console.log(tabSpecialite)

    axios.get("http://localhost:4000/api/freelancer/findall").then((free) => {
      setFreelnacer(free.data);

      axios
        .get("http://localhost:4000/api/freelancer/findspecialite")
        .then((spec) => {
          setSpecialite(spec.data);
        });
    });
  }, []);



  const deletedFreelancer = async (id) => {
    await axios
      .delete("http://localhost:4000/api/freelancer/delete/" + id)
      .then((verife) => {
        if (verife.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const preventStatu = freelancer;
          const newState = preventStatu.filter((free) => free._id != id);
          setFreelnacer(newState);
          Swal.fire("Freelancer", "Freelancer a été supprimé", "success");
        }
      });
  };

  const Filter = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/freelancer/findall").then((res) => {
        setFreelnacer(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/freelancer/filter/" + event.target.value
      );
      setFreelnacer(filter.data);
    }
  };

  const recherche = async (event) => {
    if (event.target.value === "") {
      axios.get("http://localhost:4000/api/freelancer/findall").then((res) => {
        setFreelnacer(res.data);
      });
    } else {
      let serche = await axios.get(
        "http://localhost:4000/api/freelancer/serche/" + event.target.value
      );
      setFreelnacer(serche.data);
    }
  };

 
  return (
    <div>
           {modalIsOpen ==true ? (<ModalAdd freelancer={freelancer} setFreelnacer={setFreelnacer} specialite={specialite} setSpecialite={setSpecialite} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}  />) : (<div></div>)  }      

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Equipe</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Freelancers</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <button className="btn_filter" value="sortant">
            Tous les individus {freelancer.length}
          </button>
          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="specialite"
              onChange={Filter}
            >
              <option value="all">specialite</option>
              {specialite.map((spec) => (
                <option value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div>
                <i className="input-group-text border-0 mdi mdi-magnify" />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="chercher Freelancers"
                name="serche"
                onChange={recherche}
              />
            </div>
          </form>

          <button
            type="button"
            className="btn btn-primary-color_inv"
            onClick={() => setModalIsOpen(true)}
          >
            Nouveau Freelancers +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {freelancer.map((free) => (
          <div
            className="col-lg-3 grid-margin stretch-card"
            style={{
              height: "18em",
            }}
          >
            <div
              className="card"
              style={{
                marginRight: "2em",
              }}
            >
              <div
                className="card-body"
                style={{
                  marginTop: "12px",
                }}
              >
                <div className="title_Article">
                  <h3>{free.nom}</h3>
                </div>
                <div className="freelancer_specialite">
                  {free.specialite.map((key) => (
                    <h6
                      style={{
                        backgroundColor:
                          color[Math.floor(Math.random() * color.length)],
                      }}
                    >
                      {key}
                    </h6>
                  ))}
                </div>

                <div className="freelancer_cv">
                  <div className="freelancer_linkedin">
                    <img src="/image/freelancer/dribbble-icon-1.png" alt="" />
                    <img src="/image/freelancer/linkedin-icon.png" alt="" />
                    <img src="/image/freelancer/behance-2.png" alt="" />
                  </div>
                  <a
                    href={
                      "http://localhost:4000/api/freelancer/file/" + free._id
                    }
                    download
                    target="_blank"
                  >
                    Voir CV (PDF)
                  </a>
                </div>

                <div className="contact_end">
                  <a
                    href="https://mail.google.com"
                    className="btn_contacte_freelancer"
                    target="_blanck"
                  >
                    <button type="button">Contacter</button>
                  </a>
                  <img
                    src="/image/freelancer/delete.png"
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
                          deletedFreelancer(free._id);
                        }
                      });
                    }}
                    alt=""
                  />
                  <img src="/image/freelancer/Group945.png" alt="" />
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancers;
