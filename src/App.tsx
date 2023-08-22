import React from 'react';
import logo from './logo.svg';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Using tutorial: 
// https://www.youtube.com/watch?v=d4Y2DkKbxM0

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
