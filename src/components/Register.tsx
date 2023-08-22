import React, {SyntheticEvent, useState} from 'react';
import * as domainName from "../config.json"

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitFunc = async (e: SyntheticEvent) => {
        e.preventDefault();
        // console.log({email, username, password});

        const resp = await fetch("http://localhost:8000" + "/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const content = await resp.json();
        console.log(content);
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
        </div>
    );
};

export default Register;