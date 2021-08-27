import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./Singup/Login.jsx";
import Singup from "./Singup/Singup.jsx";
import Singup_2 from "./Singup/Singup_2.jsx";
import NotFound from "./Singup/NotFound.jsx";
import Home from "./Home/Home.jsx";
import article from "./Magazin/Article/Article.jsx";
import Dashbored from "./Home/Dashbored.jsx";
import AddDepot from "./Magazin/Inventaire/Formulaire/AddDepot.jsx";
import Categorie from "./Magazin/Categorie/Categorie.jsx";
import Inventaire from "./Magazin/Inventaire/Inventaire.jsx";

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
            <Route path="/article" component={article} />

            <Route path="/categorie" component={Categorie} />

            <Route path="/depot" component={Inventaire} />
            <Route path="/adddepot" component={AddDepot} />

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
