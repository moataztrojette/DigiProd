import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
        <Link to={'/'}><li className="nav-item">
            <a className="nav-link" >
              <img src="/image/icons/icon9.PNG" alt="erreur" srcSet />
              <span className="menu-title">Dashbored</span>
            </a>
          </li></Link>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <img src="/image/icons/icon1.PNG" alt="" srcSet />
              <span className="menu-title">Magazin</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to={'/depot'} className="nav-link" href="#">Inventaire</Link></li>
                <li className="nav-item"> <Link to={'/article'} className="nav-link" >Articles</Link></li>
                <li className="nav-item"> <Link to={'/categorie'} className="nav-link" href="#">Catégories</Link></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic2">
              <img src="/image/icons/icon2.PNG" alt="" srcSet />
              <span className="menu-title">Projet</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic2">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to ={'/calendrier'} className="nav-link" href="#">Calendrier</Link></li>
                <li className="nav-item"> <Link to={'/service'} className="nav-link" href="#">Services</Link></li>
                <li className="nav-item"> <Link to={'/client'} className="nav-link" href="#">Clients</Link></li>
                <li className="nav-item"> <div className="nav-link" href="#">Rapport</div></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic3" aria-expanded="false" aria-controls="ui-basic3">
              <img src="/image/icons/icon3.PNG" alt="" srcSet />
              <span className="menu-title">Equipe</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic3">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to ={'/equipe'} className="nav-link" href="#">Equipe / catégories</Link></li>
                <li className="nav-item"> <Link to ={'/freelancers'} className="nav-link" href="#">Freelances</Link></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic4" aria-expanded="false" aria-controls="ui-basic4">
              <img src="/image/icons/icon4.PNG" alt="" srcSet />
              <span className="menu-title">Documents</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic4">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to={'/bibliotheque'} className="nav-link" href="#">Bibliothéque</Link></li>
                <li className="nav-item"> <Link to ={'/digitalisation'} className="nav-link" href="#">Digitalisation</Link></li>
                <li className="nav-item"> <Link to={'/archive'} className="nav-link" href="#">Archive</Link></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/tables/basic-table.html">
              <img src="/image/icons/icon5.PNG" alt="" srcSet />
              <span className="menu-title">Matiéres</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
              <img src="/image/icons/icon6.PNG" alt="" srcSet />
              <span className="menu-title">Finances</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="general-pages">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to={'/facture'} className="nav-link" href="#"> Factures </Link></li>
                <li className="nav-item"> <Link to={'/recu'} className="nav-link" href="#"> Recu </Link></li>
                <li className="nav-item"> <Link to ={'/devis'} className="nav-link" href="#"> Devis </Link></li>
                <li className="nav-item"> <Link to ={'/commande'} className="nav-link" href="#"> Bon de commande </Link></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic5" aria-expanded="false" aria-controls="ui-basic5">
              <img src="/image/icons/icon4.PNG" alt="" srcSet />
              <span className="menu-title">Locations</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic5">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link to={'/suivie'} className="nav-link" href="#">Suivie</Link></li>
                <li className="nav-item"> <div className="nav-link" href="#">Rapport</div></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href aria-expanded="false" aria-controls="general-pages2">
              <img src="/image/icons/icon8.PNG" alt="" srcSet />
              <span className="menu-title">Paramètres</span>
            </a>
          </li>
        </ul>
      </nav>
      );
}
 
export default Sidebar;