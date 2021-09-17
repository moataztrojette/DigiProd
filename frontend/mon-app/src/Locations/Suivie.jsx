import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
const Suivie = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [selectArticle, setSelectArticle] = useState([]);
  const [stateArticle,setArticle] = useState([])

  const color = ["#FFE8E3", "#D7F6FE", "#E1E3E8", "#F9F6DC"];

  useEffect(() => {
    axios.get("http://localhost:4000/api/location/findall").then((Allarticle)=>{
      setArticle(Allarticle.data)
      console.log(Allarticle)
    });

    axios
      .get("http://localhost:4000/api/location/find/article/location")
      .then((art) => {

        if (art.data[0]) {
          let arti = art.data[0]._id;

          setValues({article: arti});
          setSelectArticle(art.data);
        }
      });
  }, []);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("article", valuesInput.article);
    formData.append("empreinteur", valuesInput.empreinteur);
    formData.append("contact", valuesInput.contact);


    const data = await axios.post(
      "http://localhost:4000/api/location/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("location a été ajouter avec success ", {
      type: "success",
    });
    const prevStateArt = stateArticle;
    prevStateArt.push(data.data);
    setArticle(prevStateArt);
    console.log(valuesInput)
  };

  const rechercheArticle = async (event) => {
    if (event.target.value === "") {
      axios.get("http://localhost:4000/api/location/findall").then((res) => {
        setArticle(res.data);
      });
    } else {
      let sercheArt = await axios.get(
        "http://localhost:4000/api/location/serche/" + event.target.value
      );
      setArticle(sercheArt.data);
    }
  };
  const deletedLocation=  async (id) => {
    await axios
      .delete("http://localhost:4000/api/location/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevState = stateArticle;
          const new_state = prevState.filter((art) => art._id !== id);
          setArticle(new_state);
          Swal.fire("location!", "Membre a été supprimé", "success");
        }
      });
  };

  const ArticlesLoués = async (event) => {
    const filter = await axios.get(
      "http://localhost:4000/api/facture/filter/etatfacture/" +
        event.target.value
    );
    setArticle(filter.data);
  };

  const Articlespropres = ()=>{

  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "55%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
          overlay: {
            backgroundColor: "rgba(206, 239, 248,0.8)",
          },
        }}
      >
        <div className="auth-form-light text-left p-4">
          <h3 className="font-weight-light">Ajouter Location</h3>
          <br />
          <form
            className="pt-3"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <h5 className="auth-link text-black">Article </h5>

            <div className="form-group">
              <select
                className="select_categorie"
                name="article"
                onChange={MyValueInput}
              >
                {selectArticle.map((art) => (
                  <option value={art._id}>{art.nomArticle}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black"> Empreinteur</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="empreinteur"
                placeholder="empreinteur"
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black">Contact</h5>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername2"
                name="contact"
                placeholder="Contact"
                onChange={MyValueInput}
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
      <ToastContainer></ToastContainer>

      <div className="content_Article">
        <div className="categorie_article">
          <div className="title_categorie_icons">
            <h3>Finances</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Factures</h3>
            <img
              src="./image/icons/Ellipse206.png"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
        </div>
        <div className="serhceInput">
          <button className="btn_filter" value="entrant"  onClick={Articlespropres}>
            Articles propres 
          </button>
          <button className="btn_filter" value="sortant" onClick={ArticlesLoués} >
            Articles Loués
          </button>
        </div>
      </div>
      <div className="image_facture">
        <img src="/image/Location/Groupe934.png" className="image_fac"></img>
      </div>

      <div className="serhceInput" style={{ marginLeft: "64%" }}>
        <form className="d-flex align-items-center h-100" action="#">
          <div className="input-group">
            <div>
              <i className="input-group-text border-0 mdi mdi-magnify" />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="chercher article"
              name="serche"
              onChange={rechercheArticle}
            />
          </div>
        </form>

        <div className="select">
          <button
            type="button"
            className="btn btn-primary-color_inv"
            onClick={() => setModalIsOpen(true)}
          >
            Nouvelle Location +{" "}
          </button>
        </div>
      </div>

      <div className="row">
      {stateArticle.length > 0 ? (

        <table className="table_equipe">
          <tbody>
            <tr className="table_tr">
              <th>Nom et photo de l'article</th>
              <th>Etat</th>
              <th>Envers</th>
              <th>Contact</th>
              <th></th>
              <th />
            </tr>
          </tbody>

          {stateArticle.map((art) => (
            <tbody className="tbody_equipe">
              <tr className="equipe_body" style={{ textAlign: "center" }}>
                <div
                  className="equipe_first"
                  style={{ justifyContent: "start" }}
                >
                  <td>
                    <div
                      className="location_first_cercle"
                      style={{
                        backgroundColor:
                          color[Math.floor(Math.random() * color.length)],
                        backgroundImage: `url(${
                          "http://localhost:4000/api/article/getImage/" + art.article._id
                        })`,
                        backgroundSize: "35px 37px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </td>
                  <td>
                    <div className="equipe_first_info">
                    <h3 >{art.article.nomArticle}</h3>

                    </div>
                  </td>
                </div>
                <td>
                  <div className="equipe_second" style={{ fontWeight: "bold" }}>
                    {art.article.statut == "reservé" ? (
                      <div>
                        <span>Loué</span>
                      </div>
                    ) : (
                      <div>
                        <span>Non Loué</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="equipe_third">

                  <td>{art.empreinteur =="undefined" ? <div>---</div> : <div> {art.empreinteur}</div>  }</td>
                  </div>
                </td>
                <td>{art.contact =="undefined" ? <div>---</div> : <div> {art.contact}</div>  }</td>
              <td>  <img
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
                          deletedLocation(art._id);
                        }
                      });
                    }}
                  />     </td>
              </tr>

              <br />
            </tbody>
          ))}
        </table>
              ) : (<div></div>)}

      </div>
    </div>
  );
};

export default Suivie;
