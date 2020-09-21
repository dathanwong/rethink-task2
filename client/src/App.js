import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Views/Home';
import {Router} from '@reach/router';
import Create from './Views/Create';
import Axios from 'axios';
import Pirate from './Views/Pirate';


function App() {

  const [pirates, setPirates] = useState([]);

    useEffect(() =>{
        Axios.get('http://localhost:8000/api/pirates')
            .then(pirates =>{
                setPirates(pirates.data);
            })
            .catch(err =>{
                console.log(err);
            })
    }, [])

  return (
    <div className="App">
      <Router>
        <Home path="/pirates" pirates={pirates} setPirates={setPirates}/>
        <Create path="/pirates/new" pirates={pirates} setPirates={setPirates}/>
        <Pirate path="pirates/:id"/>
      </Router>
      
    </div>
  );
}

export default App;
