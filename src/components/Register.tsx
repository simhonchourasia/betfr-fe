import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';

import config from "../config.json"

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submitFunc = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("body: ");
        console.log(JSON.stringify({
            username,
            email,
            password,
        }));
        
        const endpoint = config.domainName + "/users/signup";
        console.log("endpoint: %s", endpoint);
        const resp = await fetch(endpoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        try {
            const content = await resp.json();
            console.log("content: ", content);

            if (resp.ok) {
                console.log("yeahhhh");
                setErrorMessage("");
                setRedirect(true);
            } else {
                setErrorMessage(content['error']);
            }
            
            
        } catch (error) {
            console.log("error: ", error);
            if (error instanceof Error) {
                setErrorMessage(error.toString());
            }
        }
        
    };

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <form onSubmit={submitFunc}>
                <h1 className="h3 mb-3 fw-normal">Register for Betfr</h1>

                <div className="form-floating">
                    <input
                        type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control" id="floatingInput" placeholder="Username" required
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-floating">
                    <input
                        type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
            <div>
                <p style={{color: 'red'}}>
                    {errorMessage}
                </p>
            </div>
        </div>
    );
};

export default Register;