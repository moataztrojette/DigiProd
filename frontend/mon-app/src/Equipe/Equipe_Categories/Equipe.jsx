import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "react-toastify/dist/ReactToastify.css";
import AddEquipe from "./Components/AddEquipe";
import AddMembre from "./Components/AddMembre";
import AffecterMembre from "./Components/AffecterMembre";
import TabFreelancer from "./Components/TabFreelancer";
import ModifierMembre from "./Components/ModifierMembre";

const Bibliotheque = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenEquipe, setModalIsOpenEquipe] = useState(false);

  const [modalIsOpenEmp, setModalIsOpenEmp] = useState(false);
  const [modalIsOpenListe, setModalIsOpenListe] = useState(false);

  const [valuesInput, setValues] = useState({});
  const [equipe, setEquipe] = useState([]);
  const [membre, setMembre] = useState([]);
  const [specialite, setSpecialite] = useState([]);
  const [projet, setProjet] = useState([]);

  const [stateUser, setUser] = useState([]);
  const [stateUserId, setStateUserId] = useState({});

  const [listeFreelancer, setListeFreelancer] = useState([]);

  const [valuesInput_update, setValues_update] = useState({});
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState({
    open: false,
    info: {},
  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/equipe/findall").then((eq) => {
      setEquipe(eq.data);
    });

    axios.get("http://localhost:4000/api/membre/findall").then((me) => {
      setMembre(me.data);
    });

    axios.get("http://localhost:4000/api/membre/specialite").then((spec) => {
      setSpecialite(spec.data);
    });

    axios.get("http://localhost:4000/api/membre/projet").then((proj) => {
      setProjet(proj.data);
    });
  }, []);

  const deletedEquipe = async (id) => {
    await axios
      .delete("http://localhost:4000/api/equipe/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevState_equipe = equipe;
          const new_state = prevState_equipe.filter((eq) => eq._id !== id);
          setEquipe(new_state);
          Swal.fire("Equipe!", "Equipe a été supprimé", "success");
        }
      });
  };

  const deletedMembre = async (id) => {
    await axios
      .delete("http://localhost:4000/api/membre/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevState_membre = membre;
          const new_state = prevState_membre.filter((memb) => memb._id !== id);
          setMembre(new_state);
          Swal.fire("Membre!", "Membre a été supprimé", "success");
        }
      });
  };

  const rechercheEquipe = async (event) => {
    if (event.target.value == "") {
      axios.get("http://localhost:4000/api/equipe/findall").then((res) => {
        setEquipe(res.data);
      });
    } else {
      let sercheEquipe = await axios.get(
        "http://localhost:4000/api/equipe/serhce/" + event.target.value
      );
      setEquipe(sercheEquipe.data);
    }
  };

  const allMembre = async (event) => {
    await axios.get("http://localhost:4000/api/membre/findall").then((res) => {
      setMembre(res.data);
    });
  };

  const FilterSpecialite = async (event) => {
    if (event.target.value == "all") {
      axios.get("http://localhost:4000/api/membre/findall").then((res) => {
        setMembre(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/membre/filter/" + event.target.value
      );
      setMembre(filter.data);
    }
  };

  const FilterProjet = async (event) => {
    if (event.target.value =="all") {
      axios.get("http://localhost:4000/api/membre/findall").then((res) => {
        setMembre(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/membre/filterprojet/" + event.target.value
      );
      setMembre(filter.data);
    }
  };

  const listeFreelancerAff = (id) => {
    axios
      .get("http://localhost:4000/api/equipe/finduser/" + id)
      .then((listeFr) => {
        setListeFreelancer(listeFr.data.listeFreelancer);
        console.log(listeFr.data.listeFreelancer);
        if (listeFr.data.listeFreelancer.length > 0) {
          setModalIsOpenListe(true);
        }
      });
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          marginRight: 20,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {modalIsOpen == true ? (
        <AddEquipe
          equipe={equipe}
          setEquipe={setEquipe}
          valuesInput={valuesInput}
          setValues={setValues}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        />
      ) : (
        <div></div>
      )}
      {modalIsOpenEmp == true ? (
        <AddMembre
          membre={membre}
          setMembre={setMembre}
          valuesInput={valuesInput}
          setValues={setValues}
          setModalIsOpenEmp={setModalIsOpenEmp}
          modalIsOpenEmp={modalIsOpenEmp}
        />
      ) : (
        <div></div>
      )}
      {modalIsOpenEquipe == true ? (
        <AffecterMembre
          stateUser={stateUser}
          setUser={setUser}
          equipe={equipe}
          setEquipe={setEquipe}
          membre={membre}
          setMembre={setMembre}
          valuesInput={valuesInput}
          setValues={setValues}
          setModalIsOpenEquipe={setModalIsOpenEquipe}
          modalIsOpenEquipe={modalIsOpenEquipe}
          stateUserId={stateUserId}
          setStateUserId={setStateUserId}
        />
      ) : (
        <div></div>
      )}
      {modalIsOpenListe == true ? (
        <TabFreelancer
          listeFreelancer={listeFreelancer}
          setListeFreelancer={setListeFreelancer}
          setModalIsOpenListe={setModalIsOpenListe}
          modalIsOpenListe={modalIsOpenListe}
        />
      ) : (
        <div></div>
      )}

      {modalUpdateIsOpen.open == true ? (
        <ModifierMembre
          listeFreelancer={listeFreelancer}
          setListeFreelancer={setListeFreelancer}
          valuesInput_update={valuesInput_update}
          valuesInput={valuesInput}
          setValues={setValues}
          setValues_update={setValues_update}
          membre={membre}
          setMembre={setMembre}
          setModalUpdateIsOpen={setModalUpdateIsOpen}
          modalUpdateIsOpen={modalUpdateIsOpen}
        />
      ) : (
        <div></div>
      )}

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Equipe</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Catégories</h3>
            <img
              src="./image/icons/Ellipse206.png" alt="erreur"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div>
                <i className="input-group-text border-0 mdi mdi-magnify" />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="chercher Equipe"
                name="serche"
                onChange={rechercheEquipe}
              />
            </div>
          </form>

          <button
            type="button"
            className="btn btn-primary-color_inv"
            onClick={() => setModalIsOpen(true)}
          >
            Nouvelle Equipe +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        <div>
          <Slider {...settings}>
            {equipe.map((eq) => (
              <div className="sliderBib" key={eq._id}>
                <div className="slider_Equipe">
                  <div className="image_silder_equipe">
                    <div>
                      <img 
                        src={
                          "http://localhost:4000/api/equipe/getImage/" + eq._id
                        }
                        alt="erreur"
                        onClick={() => listeFreelancerAff(eq._id)}
                      />
                    </div>
                  </div>
                  <div class="equipe">
                    <div className="content_slider_equipe">
                      <h4 onClick={() => listeFreelancerAff(eq._id)}>
                        {eq.nomEquipe}
                      </h4>
                      <i
                        className="mdi mdi-delete-sweep"
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
                              deletedEquipe(eq._id);
                            }
                          });
                        }}
                      ></i>
                    </div>
                    <div className="equipe_liste">
                      <img
                        src="/image/Equipe/imageEquipe.png"
                        onClick={() => listeFreelancerAff(eq._id)}
                        alt=""
                      />

                      <div
                        className="equipe_nb"
                        onClick={() => listeFreelancerAff(eq._id)}
                        style={{
                          marginLeft: "5%",
                        }}
                      >
                        {" "}
                        + {eq.listeFreelancer.length}
                      </div>
                      <AddCircleOutlineIcon
                        style={{
                          marginLeft: "10%",
                        }}
                        onClick={() => {
                          setModalIsOpenEquipe(true);
                          setStateUserId(eq);
                        }}
                      ></AddCircleOutlineIcon>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div
        className="content_Article"
        style={{
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <strong>Individus</strong>
          </div>
        </div>
        <div className="serhceInput">
          <button className="btn_filter" onClick={allMembre} value="sortant">
            Tous les individus {membre.length}
          </button>

          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="specialite"
              onChange={FilterSpecialite}
            >
              <option value="all">specialite</option>
              {specialite.map((spec) => (
                <option value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="projet"
              onChange={FilterProjet}
            >
              <option value="all">Projets</option>
              {projet.map((proj) => (
                <option value={proj}>{proj}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setModalIsOpenEmp(true)}
            className="btn btn-primary-color_inv"
          >
            Nouveau membre +{" "}
          </button>
        </div>
      </div>

      <table className="table_equipe">
        <tbody>
          <tr className="table_tr">
            <th>Nom prénom et spécialité</th>
            <th>Projets actuels</th>
            <th>Téléphone et email</th>
            <th />
          </tr>
        </tbody>
        {membre.map((mb) => (
          <tbody className="tbody_equipe">
            <tr className="equipe_body">
              <td>
                <div className="equipe_first">
                  <div
                    className="equipe_first_cercle"
                    style={{
                      backgroundImage: `url(${
                        "http://localhost:4000/api/membre/getImage/" + mb._id
                      })`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="equipe_first_info">
                    <h4>{mb.nomIndividu}</h4>
                    <span>{mb.specialite}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="equipe_second">
                  <span>{mb.projet}</span>
                </div>
              </td>
              <td>
                <div className="equipe_third">
                  <span>{mb.tel}</span>
                  <span>{mb.email}</span>
                </div>
              </td>
              <td>
                <img
                  src="/image/icons/delete_icons.png"
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
                        deletedMembre(mb._id);
                      }
                    });
                  }}
                  alt=""
                  srcset=""
                />
              </td>
              <td>
                <img
                  src="/image/icons/update_icons.png"
                  onClick={() => {
                    setModalUpdateIsOpen({
                      open: true,
                      info: mb,
                    });
                    setValues_update(mb);
                  }}
                  alt=""
                />
              </td>
            </tr>

            <br />
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Bibliotheque;
