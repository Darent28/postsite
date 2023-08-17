import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css'
import './home.css'
import './modal.css'
import { Link } from 'react-router-dom';
import { BsFillSendFill } from 'react-icons/bs'


export const Home = ({ userdata }) => {
    const [isOpen, setIsOpen] = useState(false);
   
    const handleClick = () => {
      setIsOpen(true);
    };

    
  
    const closeModal = () => {
        setIsOpen(false);
    };

    const [post, setPost] = useState({
        tittle: '',
        text: ''
    });

    const handleText = e => {
       
        setPost({
          ...post,
          [e.target.name]: e.target.value
        })
        
        console.log(post)
    }

    const [comment, setComment] = useState({
        comment: ''
    });

    const handleTextComment = e => {

        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })

        console.log(comment)
    }


    const [image, setImage] = useState(null);

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



    let {tittle, text, id_user} = post

    id_user = userdata.data.user.id

    const handleSubmit = (event) => {
        event.preventDefault();
        //data validation
        if ( tittle === '' || text === '' || id_user === '' || !image) {
            alert('Todos los campos son obligatorios')
            return
        }

        const formData = new FormData();
        formData.append('tittle', tittle);
        formData.append('text', text);
        formData.append('id_user', id_user);
        formData.append('image_data', image);

      
        const requestInit = {
            method: 'POST',
            body: formData
        }

        fetch('http://localhost:5000/post', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
            window.location.reload(); 
        })
        .catch(err => { 
            console.error(err)
        })

        setPost({
            tittle: '',
            text: ''
        })
        
        document.getElementById('fileinput').value = null;

        console.log(formData);
        setIsOpen(false);
        setImage(null);
    }

    const [postData, setpostData] = useState([{}])
    
    useEffect ( () => { 
      fetch('http://localhost:5000/getpost', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }).then(
            response => response.json()
        ).then((data) => {
            if (Array.isArray(data)) {
                const formattedData = data.map((row) => {
                    const date = new Date(row._date);
                    const formattedDate = date.toLocaleString("es-ES", {
                      dateStyle: "short",
                      timeStyle: "short"
                    });
                    return {
                      ...row,
                      formattedDate
                    };
                   
                });
                
                setpostData(formattedData);
            } else {
              console.log('Invalid data format:', data);
            }
        }).catch((error) => {
          console.error('Fetch error:', error);
        });
          
      
    }, []) 

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/deletePost/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then((res) => res.json())
        .then((data) => {
            
          console.log('Element deleted:', data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting element:', error);
        });
    };

    return(
        <div className='Home'>
            <h1 className='custom-h1-post' align="center">PostSite</h1>
            <p align="center">My website using React and Nodejs, by David Elizondo Ramos.</p>
            {userdata.data.user.id && (
                <div>
                    <input
                        className="form-control custom-publish"
                        placeholder="¿Something new today?"
                        onClick={handleClick}
                    />
                </div>
            )}

                {postData.map((rows) => (
                    <div className="card" key={rows.id}>
                        <div className="card-header">
                            
                        <h2 className="card-subtitle mb-2 text-muted customcard">{rows.name}</h2>
                        <h6 className="card-subtitle mb-2 text-muted">{rows.formattedDate}</h6>
                        { rows.id_user === userdata.data.user.id && (
                        <Dropdown className='custom-dropdown'>
                            <Dropdown.Toggle className='custom-toggle' variant="secondary"  id="dropdown-button-drop-end">
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className='custom-item'><Link to={`./publish/edit/${rows.id_post}`} style={{ textDecoration: 'none', color: 'white' }} >Edit</Link></Dropdown.Item>
                                <Dropdown.Item className='custom-item' onClick={() => handleDelete(rows.id_post)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        )}     
                        </div>
                        
                        <div className="card-body">
                            <br />
                            <h2 className="card-title">{rows.tittle}</h2>
                            <p className="card-text">{rows._text}</p>
                            {rows.image_data && (
                                <img
                                    src={URL.createObjectURL(new Blob([new Uint8Array(rows.image_data.data)]))}
                                    alt="Postimage"
                                    className="card-img"
                                />
                            )}
                            <br/>
                            <br/>
                            <h4 className="card-title"> Comments </h4>
                            <hr/>
                            {userdata.data.user.id && (
                                <div className="div-comment">
                                    <input
                                        className="form-control custom-comment"
                                        placeholder="Type..." name="comment" onChange={ handleTextComment }
                                    />
                                    <BsFillSendFill type="submit" className="custom-icon-comment" />
                                </div>
                            )}
                            
                        </div>
                        
                    </div>
                ))}

        {isOpen && (
         <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                                Tittle: 
                                <input type="text" className="form-control custom-input" name="tittle" 
                                onChange={handleText} required/>
                    </div>
                    <div className="form-group">
                                Text: 
                                <textarea type="text" className="form-control custom-input" name="text" 
                                onChange={handleText} required/>
                    </div>
                    <div className="form-group">
                                Load image: 
                                <input type="file" className="form-control custom-input" accept="image/*" 
                                onChange={handleImageChange} id='fileinput' required/>
                    </div>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <button type="submit" className="btn btn-secondary">Publish</button>
                        <button type="submit" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </form>
            </div>
          </div>
        )}
        </div> 
    )
}



export default Home


// const [backendData, setBackendData] = useState([{}])

// useEffect ( () => { 
//   fetch("/api").then(
//     response => response.json()
//   ).then(
//     data => { 
//       setBackendData(data)
//     }
//   )
// }, []) 

// return(

//     <div>
//         {
//         (typeof backendData.user === 'undefined') ? (
//         <p>No connection 0_0</p>
//         ): (
//         backendData.user.map((user, i) => (
//             <p key={i}>{user}</p>
            

//         ))
//         ) }
//     </div>
// )