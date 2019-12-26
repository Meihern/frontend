import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExercicesList from "./components/exercices-list.component";
import EditExercice from "./components/edit-exercice.component";
import CreateExercice from "./components/create-exercice.component";
import CreateUser from "./components/create-user-component";

function App(){
  return (
      <Router>
          <div className="container">
              <Navbar />
              <br/>
              <Route path="/" exact component={ExercicesList} />
              <Route path="/edit/:id" component={EditExercice} />
              <Route path="/create" component={CreateExercice} />
              <Route path="/user" component={CreateUser} />
          </div>
      </Router>
  );
}

export default App;
