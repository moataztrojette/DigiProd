import axios from 'axios';
import React, { useEffect } from 'react';
import './css/Home.css'
import {withRouter} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
const Home = (props) => {

    const logout = async ()=>{
        try{
         await axios.post('http://localhost:4000/api/user/logout')
         props.history.replace('/login')
        }
        catch(error){
 
        }
     }
  
    useEffect(()=>{
        console.log(props)
        axios.get("http://localhost:4000/api/user/verif").then((res)=>{
            console.log("welcome")
            props.setUser(res.data)
        }).catch((error)=>{
            if(error.response.status == 403){
                props.history && props.history.replace('/login')
                props.setUser(null)
            }
        } )
    },[])
    return (
        <div>
<div className="container-scroller">
                <Navbar logout ={logout} ></Navbar>    
<div className="container-fluid page-body-wrapper">
        <Sidebar></Sidebar>
  <div className="main-panel">
    <div className="content-wrapper">
   
      <div className="row">

      {props.children}

   
      </div>
    </div>
  </div>
</div>
</div>




</div>
);
}
 
export default withRouter(Home);


