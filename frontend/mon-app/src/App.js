import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Singup/Login.jsx";
import Singup from "./Singup/Singup.jsx";
import Singup_2 from "./Singup/Singup_2.jsx";
import NotFound from "./Singup/NotFound.jsx";
import Home from "./Home/Home.jsx";
import article from "./Magazin/Article/Article.jsx";
import Dashbored from "./Home/Dashbored.jsx";
import Categorie from "./Magazin/Categorie/Categorie.jsx";
import Inventaire from "./Magazin/Inventaire/Inventaire.jsx";
import DepotArticle from "./Magazin/Inventaire/DepotArticle.jsx";
import Service from "./Projet/Service/Service.jsx";
import Client from "./Projet/Client/Client.jsx";
import Calendrier from "./Projet/Calendrier/Calendrier.jsx";
import Recu from"./Finances/Recu/Recu"
import Facture from "./Finances/Facture/Facture.jsx";
import Devis from "./Finances/Devis/Devis.jsx";
import Commande from "./Finances/Commande/Commande.jsx";
import Bibliotheque from "./Documents/Bibliotheque/Bibliotheque.jsx";
import Digitalisation from "./Documents/Digitalisation/Digitalisation.jsx";
import Archive from "./Documents/Archive/Archive.jsx";


function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>

        <Switch>

          <Route path="/singup_2" component={Singup_2} />
          <Route path="/singup" component={Singup} />
          <Route path="/login" component={Login} />

          <Home setUser={setUser}>
          <Route path="/serche/:id" component={DepotArticle} />


            <Route path="/article" component={article} />

            <Route path="/categorie" component={Categorie} />

            <Route path="/depot" component={Inventaire} />
            <Route path="/service" component={Service} />
            
            <Route path="/client" component={Client} />
            <Route path="/calendrier" component={Calendrier} />
            <Route path="/recu" component={Recu}/>
            <Route path="/facture" component={Facture}/>
            <Route path="/devis" component={Devis}/>
            <Route path="/commande" component={Commande}/>
            <Route path="/bibliotheque" component={Bibliotheque}/>
            <Route path="/digitalisation" component={Digitalisation}/>
            <Route path="/archive" component={Archive}/>

            








           
            
            
            
            




            <Route exact path="/" component={Dashbored} />
          </Home>
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
