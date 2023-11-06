import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./publish-edit.css"

export const Edit = () => {
    const { id_post } = useParams();
   const [formData, setFormData] = useState({ tittle: "", text: "" });
   const [image, setImage] = useState(null);
   console.log(image)
   useEffect ( () => { 
    fetch(`http://localhost:5000/getpost/${(id_post)}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      }).then(
          response => response.json()
      ).then((data) => {
        console.log(data)
        setFormData({
            tittle: data.tittle,
            text: data.text
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    });
        
    
}, [id_post]) 




    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const navigate = useNavigate();

    let {tittle, text} = formData

    const handleSubmit = () => {

       const formData = new FormData();
       formData.append('tittle', tittle);
       formData.append('text', text);
       formData.append('image_data', image);

        const requestInit = {
            method: "PUT",
            body: formData,
        };
        fetch(`http://localhost:5000/editPost/${(id_post)}`, requestInit)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => console.log(error));
    };

    

    const handleImageChange = (event) => {
        const selectedImage = setImage(event.target.files[0]);

        if (selectedImage) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (selectedImage.size > maxSizeInBytes) {
                alert('Image size is too large. Please select a smaller image.');
                event.target.value = null; // Clear the input
                setImage(null); // Clear the state
            } else {
                setImage(selectedImage);
            }
        }
    };
    
    
    
    return(
        <div className="custom-edit">
            <h1 align="center">Edit publish</h1>
            <p align="center">Edit your post</p>

            <form  align="center" className= "publish" onSubmit={() => handleSubmit(id_post)}>
                <div className="form-group">
                        Tittle:
                        <input
                        type="text"
                        className="form-control custom-input"
                        name="tittle"
                        value={formData.tittle}
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group ">
                        Text:
                        <textarea type="text"
                        className="form-control custom-input"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group">
                                Load image: 
                                <input type="file" className="form-control custom-input" accept="image/*" 
                                onChange={handleImageChange} id='fileinput'/>
                </div>
                <button type="submit" className="btn btn-secondary form-control" value="Submit">Edit</button>
            </form>

        </div>
    )
}

export default Edit