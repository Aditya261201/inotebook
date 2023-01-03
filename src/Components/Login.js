import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const host = "http://localhost:5000"

    const [credentials, setcredentials] = useState({email:"", password:""})
    const navigate = useNavigate();   // useNavigate hook

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            //save the authtoken and redirect 
            localStorage.setItem('token',json.authtoken)
            navigate("/");
        }
        else{
            // not login
        }
    }


    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }



    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
