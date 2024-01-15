import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Friends from './components/Friends';
import Bets from './components/Bets';

import config from "./config.json"
import UserData, { defaultUserData } from './types/userdata';

// import "bootstrap/dist/css/bootstrap.min.css";

// Using tutorial: 
// https://www.youtube.com/watch?v=d4Y2DkKbxM0

function App() {

  const [userData, setUserData] = useState(defaultUserData);
  const [updateRequested, setUpdateRequested] = useState(false);

    // note that this will run twice when mounting due to strict mode in tsconfig.json
    useEffect(() => {
        (
            async () => {
                const endpoint = config.domainName + "/users/get";
                const resp = await fetch(endpoint, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                    
                const content = await resp.json();
                console.log("got user: ", content);
                console.log("set username to ", content["Username"]);
                setUserData(content as UserData);
                if (updateRequested) {
                    setUpdateRequested(false);
                }
            }
        )()
    }, [updateRequested]);

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar userData={userData} setUserData={setUserData}/>
        <main className="form-signin">
          <Routes>
            <Route path="/" Component={() => <Home userData={userData}/>} />
            <Route path="/login" Component={() => <Login setUserData={setUserData} />} />
            <Route path="/register" Component={Register} />
            <Route path="/friends" Component={() => <Friends userData={userData} />} />
            <Route path="/bets" Component={() => <Bets userData={userData} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
