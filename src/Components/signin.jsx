import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './signin.css';




export const SignIn = ({ user, setUser }) => {

    const handleClick = e => {

        setUser({
          ...user,
          [e.target.name]: e.target.value
        })

    }



    let {name, email, password, password_confirm} = user

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        //data validation
        if ( name === '' || email === '' || password === '' || password_confirm === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        if ( password !== password_confirm ) {
            alert('Check confirm password')
            return
        }

        //fetch
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        }

        fetch('http://localhost:5000/register', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res)
        })

        //reload state
        setUser({
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        })

        navigate('/log-in');
    }

    return(
        <div className='top'>

            <h1 align="center">Sign In</h1>
            <p align="center">This Is Sign In site</p>
            <form onSubmit={ handleSubmit } align="center" className= "signin">
                <div className="form-group">
                        Username:
                        <input
                        type="text"
                        className="form-control custom-input"
                        name="name"
                        onChange={handleClick}
                        required/>
                </div>
                <div className="form-group ">
                        Email:
                        <input type="email"
                        className="form-control custom-input"
                        name="email"
                        onChange={handleClick}
                        required/>
                </div>
                <div className="form-group ">
                        Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password"
                        onChange={handleClick}
                        required/>
                </div>
                <div className="form-group ">
                        Confirm Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password_confirm"
                        onChange={handleClick}
                        required/>
                </div>
                <button type="submit" className="btn btn-secondary form-control" value="Submit">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn

  // useEffect(() => {
  //   const postUser = () => {
  //     fetch('http://localhost:5000/register')
  //     .then (res => res.json())
  //     .then (res => console.log(res))
  //   }
  //   postUser()
  // }, [])