import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
const Article = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesInput, setValues] = useState({
  });
  const [depot,setDepot] = useState([])

  const [allArticle, setArticle] = useState([]);
  const[categorie,setCategorie] = useState([]);

  const MyValueInput = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.value;
    setValues(res);
  };

  const uploadToState = (event) => {
    let res = valuesInput;
    res[event.target.name] = event.target.files[0];
    setValues(res);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nomArticle", valuesInput.nomArticle);
    formData.append("categorieArticle", valuesInput.categorieArticle);
    formData.append("quantite", valuesInput.quantite);
    formData.append("localisation", valuesInput.localisation);
    formData.append("statut", valuesInput.statut);
    formData.append("imageArticle", valuesInput.imageArticle);


    const data = await axios.post(
      "http://localhost:4000/api/article/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Article a été ajouter avec success ", {
      type: "success",
    });
    const prevStateArt = allArticle;
    prevStateArt.push(data.data);
    setArticle(prevStateArt);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/article/findall").then((Art) => {
      setArticle(Art.data);
    });

    axios.get("http://localhost:4000/api/categorie/findall").then((cat)=>{
      if(cat.data[0]){
        let  cate = cat.data[0]._id
      
      axios.get("http://localhost:4000/api/depot/findall").then((depo)=>{
        if(depo.data[0]){
            let loca = depo.data[0]._id
            
        setValues({
          localisation : loca,
          categorieArticle : cate,
          statut : "enlocation"
        })
        setDepot(depo.data)

      setCategorie(cat.data)

      }});

    }});
  

    
    
  
  }, []);




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
   
    if(event.target.value ===''){
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
      });
    }
    else{
      let sercheArt = await axios.get(
        "http://localhost:4000/api/article/serhce/" + event.target.value
      );
      setArticle(sercheArt.data);
    }
    
   
  };


  const Filteritems = async (event)=>{
    if(event.target.value === 'all'){
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
    });
    }
    else{
      const filter = await axios.get("http://localhost:4000/api/article/filter/"+ event.target.value)
      setArticle(filter.data)
    }
   
  }



  const FilteritemsDepot = async (event)=>{
    if(event.target.value === 'all'){
      axios.get("http://localhost:4000/api/article/findall").then((res) => {
        setArticle(res.data);
    });
    }
    else{
      const filterDep = await axios.get("http://localhost:4000/api/article/filterdepot/"+ event.target.value)
      setArticle(filterDep.data)
    }
   
  }



  

  return (
    <div>
                    
                  

      <div className="content_Article">
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
          <div className="auth-form-light text-left p-4">
            <h3 className="font-weight-light">Ajouter un nouveau Article</h3>
            <br />
            <form className="pt-3" onSubmit={handleFormSubmit} encType="multipart/form-data"
>
              <div className="form-group">
                <h5 className="auth-link text-black"> Nom de l’article</h5>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="nomArticle"
                  required
                  placeholder="Nom de l’article"
                  onChange={MyValueInput}
                />
              </div>
              <h5 className="auth-link text-black">Catégorie </h5>

              <div className="form-group">
                <select
                  className="select_categorie"
                  name="categorieArticle"
                  onChange={MyValueInput}
                >
                  {categorie.map((cat)=>(
                    <option value={cat._id}>{cat.nomCategorie}</option>
                  ))}
                  </select>
              </div>

              <div className="form-group">
                <h5 className="auth-link text-black"> Quantité</h5>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputUsername2"
                  name="quantite"
                  required
                  placeholder="quantite"
                  onChange={MyValueInput}
                />
              </div>
              <h5 className="auth-link text-black">Localisation </h5>

              <div className="form-group">
                <select
                  className="select_categorie"
                  name="localisation"
                  onChange={MyValueInput}
                >
                       {depot.map((dep)=>(
                    <option value={dep._id}>{dep.nomDepot}</option>
                  ))}
                
                </select>
              </div>

              <h5 className="auth-link text-black">Statut </h5>

              <div className="form-group">
                <select
                  className="select_categorie"
                  name="statut"
                  onChange={MyValueInput}
                >
                  <option value="enlocation">en location</option>
                  <option value="dansdepot">dans dépot </option>
                  <option value="reservé">reservé</option>
                </select>
              </div>

              <div className="form-group">
              <h5 className="auth-link text-black">Image </h5>

              <input
                type="file"
                className="form-control"
                name="imageArticle"
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
        <ToastContainer></ToastContainer>

        <div className="categorie_article" style={{
          marginLeft:"-12%"
        }}>
          <div className="title_categorie_icons">
            <h3>Magazin</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Article</h3>
            <img
              src="./image/icons/Ellipse206.png"
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
                  <option value="all"  >Tous les catégories</option>

                  {categorie.map((cat)=>(
                 
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
                  <option value="all" >Tous les Dépots</option>

                  {depot.map((depot)=>(
                 
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
            style={{ height: "18em" }}
          >

            <div className="card" key={art._id}>
              <div className="card-body">
                <div class="image__overlay image__overlay--primary">
                  <img
                    src="./image/icons/Group944.png"
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
                
                src={
                  "http://localhost:4000/api/article/getImage/" + art._id
                }
                  className="imageDimCat"
                />
                <div className="title_Article">
                  <h5>{art.nomArticle}</h5>
                </div>
                <div className="location">
                  <img src="./image/icons/iconPostion.PNG" alt="" srcSet />
                  <h6>{art.localisation.nomDepot}</h6>
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
