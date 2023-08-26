import React from 'react';
import {Link} from 'react-router-dom'

import config from "../config.json"


const Navbar = (props: {name: string, setName: (name: string) => void}) => {
    const logoutFunc = async () => {
        const endpoint = config.domainName + "/users/logout";
        await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName("");
    }

    let menu;
    if (props.name == null || props.name === "") {
        menu = (
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        );
    } else {
        menu = (
            <ul className="navbar-nav ms-auto mb-4 mb-md-0">
                <li className="nav-item">
                    <Link to="/bets" className="nav-link">Bets</Link>
                </li>
                <li className="nav-item">
                    <Link to="/friends" className="nav-link">Friends</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={logoutFunc}>Logout</Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 px-20">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Betfr</Link>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;