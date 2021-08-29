import React, {useState } from 'react'
import './Singup.css';
import { Link } from 'react-router-dom';
import Validation from './Validation';
import axios from 'axios'

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Singup = (props) => {
     


    const [valuesInput , setValues] = useState({})
      
    
    

    
      

      const MyValueInput = (event)=>{
          let res = valuesInput
          res[event.target.name] = event.target.value
          setValues(res)
      }

      const handleFormSubmit =  async (event) =>{
        event.preventDefault()
        

        const errorUser = Validation(valuesInput)
if(errorUser){
  Object.keys(errorUser).forEach((user,i)=>{
    toast(Object.values(errorUser)[i],{
      type:'error'
    })
})

}
        try{
          await axios.post('http://localhost:4000/api/user/verifemail',valuesInput)          
          //setErrors(Validation(valuesInput))
        }
        catch(error){
           toast(error.response.data,{
            type:'error'
          }) 
        }
       

        if (valuesInput.email &&  valuesInput.password  && valuesInput.confipassword === valuesInput.password  ) {
          props.history.push("/singup_2",valuesInput)
        }
      
      }

    return (

        
      
      <div>

      <div class="d-lg-flex half">
  
      <div className="bg order-1 order-md-1" ></div>
    
      <div class="contents order-2 order-md-2">
  
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <div class="log_title">
                <div class="logo">
                <img src="./image/logo/logo_partie1.png" alt="error"/>
              </div>
              <br />
                <h6 class="mb-4">Inscrivez-vous avec</h6>
  
                <div class="facebook_google">
                  <a href="#" class="login100-social-item" >
                    <i class="fa fa-facebook-f"></i>
                  </a>
        
         
                  <a href="#" class="login100-social-item">
                    <img src="https://colorlib.com/etc/lf/Login_v9/images/icons/icon-google.png" alt="GOOGLE"/>
                  </a>

                </div>      
                    </div>
              <form class="form" onSubmit={handleFormSubmit}> 
  
                <h6>Ou inscrivez avec votre email
                </h6>

                <div class="form-group first success">
                  <input type="email" class="form-control"  id="email"  name="email" placeholder="SkanderAmor@gmail.com"  onChange={MyValueInput} />
                </div>

                <br></br>
  
                
                <h6>Mot de passe
                </h6>
              
                <div class="form-group first mb-3  success" >
                  <input type="password" class="form-control" id="password"   name="password" placeholder="***************" onChange={MyValueInput} />
                  
                </div>


                <h6>Confirmer mot de passe
                </h6>

                <div class="form-group first mb-3 success" >
                  <input type="password" class="form-control" id="password"   name="confipassword" placeholder="***************" onChange={MyValueInput} />
                
                </div>

                <ToastContainer></ToastContainer>


                
               
                <div class="form-group last mb-3">

              <input type="submit" class="form-control" id="button" value="Continuer"/>

                </div>
                </form>

             <h6>Vous avez déja un compte? <Link to ="/login">Connectez-vous</Link></h6>
  
                <div class="radio">
                  <div class="radio_postion">
                  <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" checked />
                  <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" disabled />
                </div>
                </div>



  
            
            </div>
          </div>
        </div>
      </div>
      
    </div>

    </div>

        
     );
}
 
export default Singup;