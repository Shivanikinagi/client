/*import React , {useState ,useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState([{}])

  useEffect(()=>{
  fetch("/members").then(
  res=> res.json()).then(
  data=>{
  setData(data)
  console.log(data)
  }
  )
  },[])

  return (
  <div>
    {(typeof data.members === 'undefined') ? (
      <p>loading...</p>
    ) : (
      data.members.map((member, i) => (
        <p key={i}>{member}</p>
      ))
    )}
  </div>
);



  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";  // Ensure this file exists and is exported correctly
import Home from "./components/Home";  // Ensure this file exists and is exported correctly
import ArchitectHome from "./components/ArchitectHome";  // Ensure this file exists and is exported correctly
import Register from "./components/Register";  // Ensure this file exists and is exported correctly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/architect-home" element={<ArchitectHome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
