import axios from "axios";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import "react-toastify/dist/ReactToastify.css";
import ModalAdd from "./Components/ModalAdd";


const Article = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({});
  const [depot, setDepot] = useState([]);

  const [allArticle, setArticle] = useState([]);
  const [categorie, setCategorie] = useState([]);


  const backImage = ["/image/Article/back1.png","/image/Article/back2.png","/image/Article/back3.png"]
 

  



 

  useEffect(() => {
    axios.get("http://localhost:4000/api/article/findall").then((Art) => {
      setArticle(Art.data);
    });

   
   


    axios.get("http://localhost:4000/api/categorie/findall").then((cat) => {
      if (cat.data[0]) {
        let cate = cat.data[0]._id;

        axios.get("http://localhost:4000/api/depot/findall").then((depo) => {
          if (depo.data[0]) {
            let loca = depo.data[0]._id;

            setValues({
              localisation: loca,
              categorieArticle: cate,
              statut: "enlocation",
            });
            setDepot(depo.data);

            setCategorie(cat.data);
          }
        });
      }
    });
  }, []);

  

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };






  const deletedArticleWithId = async (id) => {
    await axios
      .delete("http://localhost:4000/api/article/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevArticle = allArticle;
          const newArticle = prevArticle.filter((art) => art._id !== id);
          setArticle(newArticle);
          Swal.fire("Article!", "Article a été supprimé", "success");
        }
      });
  };

  const rechercheUsers = async (event) => {
    if (event.target.value === "") {
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
      });
    } else {
      let sercheArt = await axios.get(
        "http://localhost:4000/api/article/serhce/" + event.target.value
      );
      setArticle(sercheArt.data);
    }
  };

  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/article/filter/" + event.target.value
      );
      setArticle(filter.data);
    }
  };

  const FilteritemsDepot = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
      });
    } else {
      const filterDep = await axios.get(
        "http://localhost:4000/api/article/filterdepot/" + event.target.value
      );
      setArticle(filterDep.data);
    }
  };

  return (
    <div>
      <div className="content_Article">

      {modalIsOpen ==true ? (<ModalAdd depot={depot} setDepot={setDepot} allArticle={allArticle} setArticle={setArticle} categorie={categorie} valuesInput={valuesInput} setValues={setValues}   modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} MyValueInput={MyValueInput} />) : (<div></div>)  }      

        <div
          className="categorie_article"
          style={{
            marginLeft: "-12%",
          }}
        >
          <div className="title_categorie_icons">
            <h3>Magasin</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Article</h3>
            <img
              src="./image/icons/Ellipse206.png"
              alt="erreur"
              style={{ width: "15px", height: "15px" }}
            ></img>
          </div>
          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="categorieArticle"
              onChange={Filteritems}
            >
              <option value="all">Toutes les catégories</option>

              {categorie.map((cat) => (
                <option value={cat._id}>{cat.nomCategorie}</option>
              ))}
            </select>
          </div>
          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="localisation"
              onChange={FilteritemsDepot}
            >
              <option value="all">Tous les Dépots</option>

              {depot.map((depot) => (
                <option value={depot._id}>{depot.nomDepot}</option>
              ))}
            </select>
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
                placeholder="chercher un article"
                name="serche"
                onChange={rechercheUsers}
              />
            </div>
          </form>

          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-color"
          >
            Créer un nouveau article +{" "}
          </button>
        </div>
      </div>

      <div className="row">
        {allArticle.map((art) => (
          <div
            className="col-lg-3 grid-margin stretch-card"
            style={{ height: "18em" , width:50 }}
          >

            <div className="card" key={art._id}>
              <div className="card-body" style={{
                backgroundImage :`url(${backImage[Math.floor(Math.random() * backImage.length)] 
                })`,
                backgroundRepeat:'no-repeat',
                backgroundSize: "cover"

               
                }}>
                <div class="image__overlay image__overlay--primary">
                  <img
                    src="./image/icons/Group944.png"
                    alt="erreur"
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
                          deletedArticleWithId(art._id);
                        }
                      });
                    }}
                  ></img>
                </div>
                <img
                  src={"http://localhost:4000/api/article/getImage/" + art._id}
                  className="imageDimCat"
                />
                <div className="title_Article">
                  <h5 style={{
                    fontWeight:"bold"
                  }}>{art.nomArticle}</h5>
                </div>
                <div className="location">
                <LocationOnOutlinedIcon ></LocationOnOutlinedIcon>
                  <h6 >{art.localisation.nomDepot}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
