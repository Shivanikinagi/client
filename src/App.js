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
import LoginForm from "./components/LoginForm";

function UserHome() {
  return <h1>Welcome to User Home!</h1>;
}

function ArchitectHome() {
  return <h1>Welcome to Architect Home!</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/architect-home" element={<ArchitectHome />} />
      </Routes>
    </Router>
  );
}

export default App;
