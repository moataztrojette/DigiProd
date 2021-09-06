import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "react-toastify/dist/ReactToastify.css";
const Bibliotheque = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenEmp, setModalIsOpenEmp] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [equipe, setEquipe] = useState([]);
  const [membre , setMembre] = useState([])
  const [specialite,setSpecialite]=useState([])
  const [projet,setProjet]=useState([])





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

    axios.get("http://localhost:4000/api/membre/specialite").then((spec)=>{
      setSpecialite(spec.data)
    })

    axios.get("http://localhost:4000/api/membre/projet").then((proj)=>{
      setProjet(proj.data)
    })




    
  }, []);

  const uploadToState = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.files[0];
    setValues(res);
  };

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
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomEquipe", valuesInput.nomEquipe);
    formData.append("imageEquipe", valuesInput.imageEquipe);

    const data = await axios.post(
      "http://localhost:4000/api/equipe/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Equipe a été ajouter avec success ", {
      type: "success",
    });
    const prevState = equipe;
    prevState.push(data.data);
    setEquipe(prevState);
  };




  const handleFormSubmit_Membre = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomIndividu", valuesInput.nomIndividu);
    formData.append("specialite", valuesInput.specialite);
    formData.append("email", valuesInput.email);
    formData.append("tel", valuesInput.tel);
    formData.append("projet", valuesInput.projet);
    formData.append("image", valuesInput.image);



    const data = await axios.post(
      "http://localhost:4000/api/membre/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Membre a été ajouter avec success ", {
      type: "success",
    });
    const prevState = membre;
    prevState.push(data.data);
    setMembre(prevState);
  };





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

  const deletedMembre  = async (id) => {
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
    if (event.target.value === "") {
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


  const handleFormSubmitUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomIndividu", valuesInput.nomIndividu);
    formData.append("specialite", valuesInput.specialite);
    formData.append("email", valuesInput.email);
    formData.append("tel", valuesInput.tel);
    formData.append("projet", valuesInput.projet);
    formData.append("image", valuesInput.image);


    const datatMembre = await axios.put(
      "http://localhost:4000/api/membre/update/" + valuesInput_update._id,
      valuesInput_update
    );

    toast("Membre a été Modifiér avec success ", {
      type: "success",
    });

    const resFind = membre.find(
      (element) => element._id === valuesInput_update._id
    );
    const newState = membre;
    const index = membre.indexOf(resFind);
    newState[index] = datatMembre.data;
    setMembre(newState);
  };


  
  const allMembre = async(event)=>{
    await axios.get("http://localhost:4000/api/membre/findall").then((res) => {
        setMembre(res.data);
      });
  }
  
  const FilterSpecialite = async (event) => {
    if (event.target.value === "all") {
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
    if (event.target.value === "all") {
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
            overlay : {
              backgroundColor:"rgba(206, 239, 248,0.8)",
            }

          }}
        >
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Ajouter un Equipe</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de L'equipe</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomEquipe"
                  required
                  placeholder="Nom de l’article"
                  onChange={MyValueInput}
                />
              </div>
          
         
            

         

              <div className="form-group">
                <h5 className="auth-link text-black">Image </h5>

                <input
                  type="file"
                  className="form-control"
                  name="imageEquipe"
                  id="exampleInputMobile"
                  required
                  placeholder="image"
                  onChange={uploadToState}
                />
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


        <Modal
          isOpen={modalIsOpenEmp}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => modalIsOpenEmp(false)}
          style={{
            content: {
              top: "50%",
              left: "55%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              
            },
            overlay : {
              backgroundColor:"rgba(206, 239, 248,0.8)",
            }
          }}
        >
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Ajouter un nouveau membre</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmit_Membre}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de l'individu</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomIndividu"
                  required
                  placeholder="Nom de l'individu"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Spécialité</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="specialite"
                  required
                  placeholder="Spécialité"
                  onChange={MyValueInput}
                />
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black"> Adresse email</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="email"
                  required
                  placeholder="Adresse email"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Téléphone </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="tel"
                  required
                  placeholder="Téléphone"
                  onChange={MyValueInput}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Projets en cours </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="projet"
                  required
                  placeholder="Projets en cours"
                  onChange={MyValueInput}
                />
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black">Image </h5>

                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="exampleInputMobile"
                  required
                  placeholder="image"
                  onChange={uploadToState}
                />
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
                  onClick={() => setModalIsOpenEmp(false)}
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
              left: "55%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              
            },
            overlay : {
              backgroundColor:"rgba(206, 239, 248,0.8)",
            }
          }}
        >
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Modifier un  membre</h3>
            <br />
            <form
              className="pt-3"
              onSubmit={handleFormSubmitUpdate}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de l'individu</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomIndividu"
                  required
                  placeholder="Nom de l'individu"
                  value={valuesInput_update.nomIndividu}
                  onChange={MyValueInput_update}
                  />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Spécialité</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="specialite"
                  required
                  placeholder="Spécialité"
                  value={valuesInput_update.specialite}
                  onChange={MyValueInput_update}
                />
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black"> Adresse email</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="email"
                  required
                  placeholder="Adresse email"
                  value={valuesInput_update.email}
                  onChange={MyValueInput_update}
                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Téléphone </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="tel"
                  required
                  placeholder="Téléphone"
                  value={valuesInput_update.tel}
                  onChange={MyValueInput_update}                />
              </div>


              <div className="form-group">
                <h5 className="auth-link text-black"> Projets en cours </h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="projet"
                  required
                  placeholder="Projets en cours"
                  value={valuesInput_update.projet}
                  onChange={MyValueInput_update}    
                />
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



      <ToastContainer></ToastContainer>

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Equipe</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Catégories</h3>
            <img
              src="./image/icons/Ellipse206.png"
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
            Nouveau Equipe +{" "}
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
                  <img
                  src={"http://localhost:4000/api/article/getImage/" + eq._id}

                />                  </div>
                  <div class="equipe">
                    <div className="content_slider_equipe">
                      <h4>{eq.nomEquipe}</h4>
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
                      <img src="/image/Equipe/imageEquipe.png" alt="" />
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
          marginBottom : "2%"
        }}
      >
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <strong>Individus</strong>
          </div>
        </div>
        <div className="serhceInput">
          <button className="btn_filter" onClick={allMembre} value="sortant">
            Tous les individus  {membre.length}
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
            <th>Nom prénom et specialité</th>
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
                <div className="equipe_first_cercle" style={{backgroundImage: `url(${"http://localhost:4000/api/membre/getImage/" + mb._id})`, backgroundSize: 'cover'}}>
                </div>
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
              <img src="/image/icons/delete_icons.png"       onClick={() => {
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
                        }} alt="" srcset="" />
            </td>
            <td><img src="/image/icons/update_icons.png"     onClick={() => {
                      setModalUpdateIsOpen({
                        open: true,
                        info: mb,
                      });
                      setValues_update(mb);
                    }} alt="" /></td>
          </tr>

          <br />
        </tbody>

))}
      </table>

      
    </div>
  );
};

export default Bibliotheque;
