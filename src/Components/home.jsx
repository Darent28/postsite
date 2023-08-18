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

    const [post, setPost] = useState({
        tittle: '',
        text: ''
    });


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

   

   
    const handleText = e => {
       
        setPost({
          ...post,
          [e.target.name]: e.target.value
        })
        
        console.log(post)
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
        })
        .catch((error) => {
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

    const [commentdata, setComment] = useState({
        comment: ''
    });

    
    const handleTextComment = e => {

        setComment({
            ...commentdata,
            [e.target.name]: e.target.value
        })

        console.log(commentdata)
    }

    let { comment } = commentdata


    const handleSubmitComment = (event, id_post) => {
        event.preventDefault();
        //data validation
        if ( comment === '' || id_user === '') {
            alert('Please write a comment')
            return
        }

        const commentgetdata = { comment, id_post, id_user };
      
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentgetdata)
        }

        fetch('http://localhost:5000/postComment', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
            window.location.reload(); 
        })
        .catch(err => { 
            console.error(err)
        })

        setComment({
            comment: ''
        })

    }

    const [commentData, setcomentData] = useState([{}])

    useEffect ( () => { 

        fetch('http://localhost:5000/getComment', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
          }).then(
              response => response.json()
          ).then((data) => {
              if (Array.isArray(data)) {
                  const formattedData = data.map((row) => {
                      const date = new Date(row.c_date);
                      const formattedDate = date.toLocaleString("es-ES", {
                        dateStyle: "short",
                        timeStyle: "short"
                      });
                      return {
                        ...row,
                        formattedDate
                      };
                     
                  });
                  setcomentData(formattedData);
              } else {
                console.log('Invalid data format:', data);
              }
          })
          .catch((error) => {
            console.error('Fetch error:', error);
        });
            
        
    }, []) 



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

                {postData.map((post) => (
                    <div className="card" key={post.id}>
                        <div className="card-header">
                            
                        <h2 className="card-subtitle mb-2 text-muted customcard">{post.name}</h2>
                        <h6 className="card-subtitle mb-2 text-muted">{post.formattedDate}</h6>
                        { post.id_user === userdata.data.user.id && (
                        <Dropdown className='custom-dropdown'>
                            <Dropdown.Toggle className='custom-toggle' variant="secondary"  id="dropdown-button-drop-end">
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className='custom-item'><Link to={`./publish/edit/${post.id_post}`} style={{ textDecoration: 'none', color: 'white' }} >Edit</Link></Dropdown.Item>
                                <Dropdown.Item className='custom-item' onClick={() => handleDelete(post.id_post)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        )}     
                        </div>
                        <div className="card-body">
                            <br />
                            <h2 className="card-title">{post.tittle}</h2>
                            <p className="card-text">{post._text}</p>
                            {post.image_data && (
                                <img
                                    src={URL.createObjectURL(new Blob([new Uint8Array(post.image_data.data)]))}
                                    alt="Postimage"
                                    className="card-img"
                                />
                            )}
                            <br/>
                            <br/>
                            <h4 className="card-title"> Comments </h4>
                            <hr/>
                            {commentData.map((comment) => {
                                if (comment.id_post === post.id_post) {
                                    return (
                                      <div className="comment-side" key={comment.id}>
                                        <div className="comment-name">
                                          <h5>{comment.name}</h5>
                                          <h5>{comment.formattedDate}</h5>
                                        </div>
                                        <p>{comment._comment}</p>
                                      </div>
                                    );
                                } else {
                                  return null; // No mostrar el comentario si no corresponde al post actual
                                }
                            })}
                            {userdata.data.user.id && (
                                    <form onSubmit={(event) => handleSubmitComment(event, post.id_post)}>
                                         <div className="div-comment">
                                            <input
                                                className="form-control custom-comment"
                                                placeholder="Type..." name="comment" onChange={ handleTextComment }
                                            />
                                            <button type="submit" className="custom-icon-comment" ><BsFillSendFill/></button>
                                         </div>
                                    </form>

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