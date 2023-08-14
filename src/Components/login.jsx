import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';


export const LogIn = ({ user, setUser, setToken }) => {
    
    const handleClick = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user)
    }

    let { name, password } = user

    const navigate = useNavigate();

    const handleSubmit = e => { 

        e.preventDefault();

        if ( name === '' || password === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const user = { name, password };
        
         //fetch
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        }

        fetch('http://localhost:5000/login', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            if (res.token) {
                setToken(res.token);
                navigate('/');
                

                setUser({
                    name: '',
                    password: ''
                });

            } else {
                console.log('Login failed!'); 

                alert('User doesnt exists')
         
            }
             
        })

       
    }

    return(
        <div className='top'>
            <h1 align="center">Ps</h1>
            <p align="center">Log in to PostSite</p>
            <form onSubmit={ handleSubmit }  align="center" className= "login">
         
                <div className="form-group">
                        Username:
                        <input type="text" className="form-control custom-input" name="name" 
                        onChange={handleClick} aria-describedby="name" required/>
                </div>
                <div className="form-group">
                          Password: 
                        <input type="password" className="form-control custom-input" name="password" 
                        onChange={handleClick}
                        aria-describedby="password" required/>

                </div>
                <button type="submit" className="btn btn-secondary form-control" value="Submit">Log in</button>
            </form>
            <p className="account">New to PostSite? <Link className="forgot" to="../sign-in">Create account</Link>.</p>
        </div> 
    )
}

export default LogIn