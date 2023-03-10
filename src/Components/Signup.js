import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// var localStorage = require('localStorage')


const Signup = (props) => {
    const host = "http://localhost:5000"

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();   // useNavigate hook


    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, cpassword: credentials.cpassword })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the authtoken and redirect 
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("invalid credentials", "danger")
        }
    }


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
        <h2 className="mb-3">Signup to iNotebook</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
                </div>
                <button disabled={credentials.cpassword !== credentials.password} type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
