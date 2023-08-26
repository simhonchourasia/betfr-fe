import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import logo from './logo.svg';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Friends from './components/Friends';
import Bets from './components/Bets';

import './App.css';
import config from "./config.json"

// Using tutorial: 
// https://www.youtube.com/watch?v=d4Y2DkKbxM0

function App() {

  const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const endpoint = config.domainName + "/users/get";
                const resp = await fetch(endpoint, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                    
                const content= await resp.json();
                console.log("set username to ", content.username);
                setName(content.username);
            }
        )()
    });

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar name={name} setName={setName}/>
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" Component={() => <Home name={name}/>} />
            <Route path="/login" Component={() => <Login setName={setName} />} />
            <Route path="/register" Component={Register} />
            <Route path="/friends" Component={Friends} />
            <Route path="/bets" Component={Bets} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
