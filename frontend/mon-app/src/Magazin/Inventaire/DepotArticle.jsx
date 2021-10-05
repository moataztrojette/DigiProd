import axios from "axios";
import React, { useState, useEffect } from "react";
import { KeyboardArrowLeft } from "@material-ui/icons";
import Swal from "sweetalert2";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const DepotArticle = (props) => {
const [allArticle, setArticle] = useState([]);
const backImage = ["/image/Article/back1.png","/image/Article/back2.png","/image/Article/back3.png"]

  useEffect(() => {
    if (props.match.params.id) {
      axios
        .get(
          "http://localhost:4000/api/article/serchearticle/depot/" +
            props.match.params.id
        )
        .then((res) => {
          setArticle(res.data);
        });
    }
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

  return (
    <div>
      <div className="content_Article">
        <div className="categorie_article">
          <Link to="/article">
            <div className="title_categorie_icons">
              <KeyboardArrowLeft
                style={{
                  color: "#FC8163",
                  marginBottom: 5,
                }}
              />
              <h4>Retour</h4>
            </div>
          </Link>
        </div>
      </div>

      <div className="row">
        {allArticle.map((art) => (
          <div
            className="col-lg-3 grid-margin stretch-card"
            style={{ height: "18em" }}
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
                    src={"/image/icons/Group944.png"}
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
                  alt="erreur"
                />
                <div className="title_Article">
                  <h5 style={{
                    fontWeight:"bold"
                  }}>{art.nomArticle}</h5>
                </div>
                <div className="location">
                <LocationOnOutlinedIcon ></LocationOnOutlinedIcon>
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

export default DepotArticle;
