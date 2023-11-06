import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './edituser.css';


export const Edituser = () =>{
    const { id } = useParams();
    
    const [formProfileData, setFormProfileData] = useState
    ({  name: "",
        email: "",
        imgPhoto: "",
        imgCover: ""
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
              email: data.email,
              imgPhoto: data.imgPhoto,
              imgCover: data.imgCover,
              password: data.password
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
    };

    const navigate = useNavigate();

   
  function fotoi(){
    const fileInput = document.getElementById('fileInput');
    const chooseButton = document.getElementById('chooseButton');
    const foto = document.getElementById('foto');
    
    chooseButton.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                foto.src = e.target.result;
            };
            
            reader.readAsDataURL(selectedFile);
        }
    });
  } 

    return(
        <div className='top'>
                 
            <h1 align="center" class="titulo">Edit User</h1>
            <p align="center">This Is Edit User site</p>
            <form align="center" className= "edituser">
                <div className="form-group">
                        Image 
                        <div class="box" >
                        <img src={URL.createObjectURL(new Blob([new Uint8Array(formProfileData.imgPhoto.data)]))} id="foto" class="fotow"></img>
                        <br></br><br></br>
                        <input  type="file" id="fileInput" className=" btnp btn btn-dark btnfoto"/>
                        <button onClick={fotoi} class="button button2" id="chooseButton">choose photo</button>
                        </div>
                </div>  

                <br/><br/><br/>
                <div className="form-group">
                        Username:
                        <input //value={name} 
                        type="text"
                        className="form-control custom-input"
                        value={formProfileData.name}
                        name="name"

                        required/>
                </div>
                <div className="form-group ">
                        Email:
                        
                        <input //value={email} 
                        type="email"
                        className="form-control custom-input"
                        name="email"
                        value={formProfileData.email}
                        pattern="(\W|^)[\w.\-]{0,25}@(outlook|yahoo|hotmail|gmail)\.com(\W|$)"
                        required/>
                </div>

                <button type="submit" className="btn btn-secondary form-control" value="Submit">Edit</button>
            </form>
            <form align="center" className= "edituser">
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
        </div>
    )

}



export default Edituser