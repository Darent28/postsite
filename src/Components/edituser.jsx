import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './edituser.css';


export const Edituser = () =>{
    const { id } = useParams();
    const [formProfileData, setFormProfileData] = useState
    ({  name: "",
        email: ""
    });

    useEffect ( () => { 
        fetch(`http://localhost:5000/getProfile/${(id)}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          }).then(
              response => response.json()
          ).then((data) => {
            console.log(data)
            
            setFormProfileData({
              name: data.name,
              email: data.email
            });
            
          })
          .catch((error) => {
            console.error('Fetch error:', error);
        });
            
        
    }, [id]) 

    const handleChange = e => {
        setFormProfileData({
            ...formProfileData,
            [e.target.name]: e.target.value
        })
        console.log(formProfileData)
    };


    const handleSubmit = () => {
        const formeditprofile = 
            {  
                name: formProfileData.name,
                email: formProfileData.email
            };

            console.log(formeditprofile)

        const requestInit = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formeditprofile),
        };
        fetch(`http://localhost:5000/editUser/${id}`, requestInit)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => console.log(error));
    };   


    return(
        <div className='top'>
                 
            <h1 align="center" class="titulo">Edit User</h1>
            <p align="center">This Is Edit User site</p>
           
            <form align="center" className= "edituser" onSubmit={() => handleSubmit(id)}>
                <div className="form-group">
                        Username:
                        <input //value={name} 
                        type="text"
                        className="form-control custom-input"
                        value={formProfileData.name}
                        onChange={handleChange}
                        name="name"
                        />
                </div>
                <div className="form-group ">
                        Email:
                        
                        <input //value={email} 
                        type="email"
                        className="form-control custom-input"
                        name="email"
                        value={formProfileData.email}
                        onChange={handleChange}
                        />
                </div>

                <button type="submit" className="btn btn-secondary form-control" value="Submit">Edit</button>
            </form>
            <form align="center" className= "edituser">
            Want to change your password?
            <div className="form-group ">
                        Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password"
                        required/>
                </div>
                <div className="form-group ">
                        Confirm Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password_confirm"
                        required/>
                </div>
                <button type="submit" className="btn btn-secondary form-control" value="Submit">Edit Password</button>
                </form>

                <a className="btn btn-secondary" value="Submit" href={`../${id}`}>Go back</a>
        </div>
    )

}



export default Edituser