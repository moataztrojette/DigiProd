import React, { useEffect, useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";

const TabFreelancer = (props) => {
    
    
    return (<div>
              <Modal
          isOpen={props.modalIsOpenListe}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => props.modalIsOpenListe(false)}
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
            {props.listeFreelancer.map((li) => (
                
            <tbody className="tbody_equipe">
          <tr className="equipe_body">
            <td>
              <div className="equipe_first">
                <div className="equipe_first_cercle" style={{backgroundImage: `url(${"http://localhost:4000/api/equipe/getImage/" + li._id})`, backgroundSize: 'cover'}}>
                </div>
                <div className="equipe_first_info">
                  <h4>{li.nomIndividu}</h4>
                </div>
              </div>
            </td>
            <td>
              <div className="equipe_second">
                <span>{li.specialite}</span>       
              </div>
            </td>
         
     
          </tr>

          <br />
        </tbody>
                    ))}

            <br />

            <Link to={"/equipe"}>   <button
                type="button"
                onClick={() => props.setModalIsOpenListe(false)}
                className="btn btn-block btn-facebook auth-form-btn"
              >
                <i className="mdi mr-2" />
                Retour{" "}
              </button>
              </Link>
          </div>
        </Modal>
        <ToastContainer></ToastContainer>






    </div>  );
}
 
export default TabFreelancer;