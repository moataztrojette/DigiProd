import React from 'react'
import { Link } from 'react-router-dom';
const Inventaire = () => {
    return (
        <div>
        <div className="content_Article">
    <div className="categorie_article">
    <div className="title_categorie_icons">
    <h3>Magazin</h3>
    <i class="mdi mdi-chevron-right"></i>
<h3>Inventaire</h3>
    <img src="./image/icons/Ellipse206.png" style={{width:"15px",height:"15px"}}></img>
    </div>
  </div>
  <div className="serhceInput">
   
    <Link to="/adddepot"><button type="button" className="btn btn-primary-color_inv">Nouveau depot + </button></Link>
  </div>
</div>

<div className="row">

<div className="col-lg-4 grid-margin stretch-card" style={{height: '18em'}}>

<div className="card">
<div className="card-body">
<img src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/6/5/2/652a7adb1b_98148_01-intro-773.jpg" id="barChart" className="imageDimCat" />
<div className="titleArticle">
<div className="location">
<img src="./image/icons/iconPostion.PNG" alt="" srcSet />
<h5>depot la Mannouba</h5>
</div>
</div>
</div>
</div>
</div>






</div> 


</div>

      );
}
 
export default Inventaire;