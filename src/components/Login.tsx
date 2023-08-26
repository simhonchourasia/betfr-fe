import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';

import config from "../config.json"

const Login = (props: {setName: (name: string) => void}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submitFunc = async (e: SyntheticEvent) => {
        e.preventDefault();

        const endpoint = config.domainName + "/users/login";
        console.log("endpoint: %s", endpoint);
        const resp = await fetch(endpoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (resp.ok) {
            setRedirect(true);
        } else {
            console.log("error when login with status ", resp.status);
        }

        const content = await resp.json();
        props.setName(content['username']);        
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <form onSubmit = {submitFunc}>
                <h1 className="h3 mb-3 fw-normal">Login to Betfr</h1>

                <div className="form-floating">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput"
                        placeholder="name@example.com" 
                        required autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        required
                        onChange={e => setPassword(e.target.value)}
                     />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;