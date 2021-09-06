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
  const [valuesInput, setValues] = useState({});
  const [bibliotheque, setBibliotheque] = useState([]);
  const [dateBibliotheque, setDateBibliotheque] = useState([]);


  const color = ["#FFE8E3","#D7F6FE","#E1E3E8","#F9F6DC"]



  useEffect(() => {
     axios
    .get("http://localhost:4000/api/bibliotheque/findall")
    .then((bib) => {
      setBibliotheque(bib.data);
    });

    axios
    .get("http://localhost:4000/api/bibliotheque/finddate")
    .then((date) => {
      setDateBibliotheque(date.data);
    });





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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", valuesInput.description);
    formData.append("date", valuesInput.date);
    formData.append("fichier", valuesInput.fichier);

    const data = await axios.post(
      "http://localhost:4000/api/bibliotheque/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast("Documents  a été ajouter avec success ", {
      type: "success",
    });
    const preventState = bibliotheque;
    preventState.push(data.data);
    setBibliotheque(preventState);
  };

  
  const Filteritems = async (event) => {
    if (event.target.value === "all") {
      axios.get("http://localhost:4000/api/bibliotheque/findall").then((res) => {
        setBibliotheque(res.data);
      });
    } else {
      const filter = await axios.get(
        "http://localhost:4000/api/bibliotheque/filter/" + event.target.value
      );
      setBibliotheque(filter.data);
    }
  };


  const rechercheDoc = async (event)=>{
    if (event.target.value === "") {
      axios.get("http://localhost:4000/api/bibliotheque/findall").then((res) => {
        setBibliotheque(res.data);
      });
    } else {
      let serche = await  axios.get(
        "http://localhost:4000/api/bibliotheque/serche/" + event.target.value
      );
      setBibliotheque(serche.data);
    }
  }

  const deletedBibliotheque = async (id) => {
    await axios
      .delete("http://localhost:4000/api/bibliotheque/deleted/" + id)
      .then((res) => {
        if (res.status !== 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "error");
        } else {
          const prevState = bibliotheque;
          const newState = prevState.filter((bib) => bib._id !== id);
          setBibliotheque(newState);
          Swal.fire("Bibliotheque!", "Documents a été supprimé", "success");
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
          marginRight:20,

          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
          <h3 className="font-weight-light">Stocker vos Documents</h3>
          <br />
          <form className="pt-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <h5 className="auth-link text-black"> Documents</h5>
              <input
                type="file"
                className="form-control"
                id="exampleInputUsername2"
                name="fichier"
                required
                placeholder="File"
                onChange={uploadToState}
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
                placeholder="Description"
                onChange={MyValueInput}
              />
            </div>

            <div className="form-group">
              <h5 className="auth-link text-black"> Date</h5>
              <input
                type="date"
                className="form-control"
                id="exampleInputUsername2"
                name="date"
                required
                placeholder="Date"
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
            <h3>Documents</h3>
            <i class="mdi mdi-chevron-right"></i>
            <h3>Bibliothèque</h3>
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
                placeholder="chercher Document"
                name="serche"
                onChange={rechercheDoc}

                
              />
            </div>
          </form>

          <div className="select">
            <select
              className="form-select_Art"
              aria-label="Default select example"
              name="date"
              onChange={Filteritems}

            >
              <option value="all">Date</option>
              {dateBibliotheque.map((bib) => (
              <option value={bib}>{bib}</option>
            ))}
            </select>
          </div>
        </div>
      </div>

      <div className="document">
        <div className="document_title">
          <h3>Stocker vos Documents les plus pertinents(Contrats, Attestations, Scénarios..)</h3>
          <label for="text">Charger un fichier (parcourir) </label>
          <input type="text" id="text" onClick={() => setModalIsOpen(true)}/>

        </div>
        <div className="document_image">
            <img src="/image/documents/doc1.png" alt="" />
            <img src="/image/documents/doc2.png" alt="" />
            <img src="/image/documents/doc3.png" alt="" />

        </div>
      </div>

      <div className="row">
      <div >
        <Slider {...settings}>

        {bibliotheque.map((bib) => (

          <div className="sliderBib" key={bib._id}>
          <div className="slider_bib">
            <div className="image_silder" style={{
               backgroundColor:color[Math.floor(Math.random() * color.length)]
            }}>
            <a
                    href={"http://localhost:4000/api/bibliotheque/file/" + bib._id}
                    download
                    target="_blank"
                  >
                  <img src="/image/documents/doc.png" alt="" >
            </img>
            </a>
           

            </div>
          <div className="content_slider">
            <h4>{bib.description}</h4>
            <i className="mdi mdi-delete-sweep" onClick={() => {
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
                          deletedBibliotheque(bib._id);
                        }
                      });
                    }}></i>

          </div>
          </div>
          </div>


))}



       

      

          

          

          
          
  
        
        </Slider>
      </div>


      </div>
    </div>
  );
};

export default Bibliotheque;
