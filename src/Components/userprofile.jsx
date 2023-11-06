import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './userprofile.css';


export const Userprofile = () =>{
    const { id } = useParams();
    // const { name, imgPhoto } = userdata.data.user;
    const navigate = useNavigate();
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
            imgCover: data.imgCover
          });
          
        })
        .catch((error) => {
          console.error('Fetch error:', error);
      });
          
      
  }, [id]) 



  const handleImageChange = (event) => {
  const selectedImage = event.target.files[0];
  console.log('Selected Image:', selectedImage);

  if (selectedImage) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    console.log('Image Size:', selectedImage.size);

    if (selectedImage.size > maxSizeInBytes) {
      alert('Image size is too large. Please select a smaller image.');
    } else {

            const formData = new FormData();
            formData.append('imgPhoto', selectedImage);

            const requestInit = {
              method: 'PUT',
              body: formData,
            };

            fetch(`http://localhost:5000/editUserPhoto/${id}`, requestInit)
            .then((response) => response.json())
            .then((res) => {
              window.location.reload();
            })
            .catch((error) => console.error(error));
    
        }
      }
    };
  
    const handleImageUpload = () => {
    const fileInput = document.getElementById('fileInput');
    const chooseButton = document.getElementById('chooseButton');

      chooseButton.addEventListener('click', () => {
        fileInput.click();
      });
    };

    const handleCoverChange = (event) => {
      const selectedImage = event.target.files[0];
      console.log('Selected Image:', selectedImage);
    
      if (selectedImage) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        console.log('Image Size:', selectedImage.size);
    
        if (selectedImage.size > maxSizeInBytes) {
          alert('Image size is too large. Please select a smaller image.');
        } else {
    
                const formData = new FormData();
                formData.append('imgCover', selectedImage);
    
                const requestInit = {
                  method: 'PUT',
                  body: formData,
                };
    
                fetch(`http://localhost:5000/editUserCover/${id}`, requestInit)
                .then((response) => response.json())
                .then((res) => {
                  window.location.reload();
                })
                .catch((error) => console.error(error));
        
        }
      }
    };

    const handleCoverUpload = () => {
      const fileInput = document.getElementById('fileInput1');
      const chooseButton = document.getElementById('chooseButton1');
  
        chooseButton.addEventListener('click', () => {
          fileInput.click();
        });
      };

    return(
    <div>
        <div className='fotoportada'>

        <img src={URL.createObjectURL(new Blob([new Uint8Array(formProfileData.
              imgCover.data)]))} id="foto" className="fotopor"/>
            <input type="file" id="fileInput1" onChange={handleCoverChange} className="btnp btn btn-dark btnfoto" />
            <button className="button3 button3" onClick={handleCoverUpload} id="chooseButton1">Background</button>

            <div className='cambiarpor'>  
              {/* <img src={URL.createObjectURL(new Blob([new Uint8Array(imgPhoto.data)]))} id="foto" className="fotow"></img>*/}
            <img src={URL.createObjectURL(new Blob([new Uint8Array(formProfileData.imgPhoto.data)]))} alt="User Profile" className="fotow" />

            <input type="file" id="fileInput" className="btnp btn btn-dark btnfoto" onChange={handleImageChange} />
            <button className="button button2"  onClick={handleImageUpload} id="chooseButton">Edit</button>
            </div>
            
            <h2 className="letra1"> {formProfileData.name}  </h2>
            <Link to="./edit-user" className="button4" id="edituser">Edit User</Link>
           <br/>
            <p className="d-inline-flex gap-1">
            
      
        <button className="button5 button5 me-md-5">Timeline</button>
        <button className="button5 button5 me-md-5">About</button>
       
        <button className="button5 button5 me-md-5">Photos</button>

       
      
        </p>


        </div>
        <div className="linea"></div>
        <br></br> 
        <div className="debajo">
      


      
        </div>
                

    </div>
        
)

}



export default Userprofile