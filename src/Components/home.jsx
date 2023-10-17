import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css'
import './home.css'
import './modal.css'
import { Link } from 'react-router-dom';
import { BsFillSendFill } from 'react-icons/bs' 
import { AiFillLike } from 'react-icons/ai'



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
        if ( tittle === '' || text === '' || id_user === '') {
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
                const formattedData = data.map((posts) => {
                    const date = new Date(posts.createdPo);
                    const formattedDate = date.toLocaleString("es-ES", {
                      dateStyle: "short",
                      timeStyle: "short"
                    });
                    return {
                      ...posts,
                      formattedDate
                    };
                   
                });
                console.log(data)
                const initialLikedPosts = {};

                formattedData.forEach((posts) => {
                    const isLiked = localStorage.getItem(`liked_${posts.id_post}`);
                    if (isLiked === 'true') {
                        initialLikedPosts[posts.id_post] = true;
                    } else {
                        initialLikedPosts[posts.id_post] = false;
                    }
                });
                
                setLikedPosts(initialLikedPosts);
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
                      const date = new Date(row.createdCo);
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

    const [commentedit, setCommentedit] = useState({
        _comment: ''
    });

    
    const handleTextCommentEdit = e => {

        setCommentedit({
            ...commentedit,
            [e.target.name]: e.target.value
        })

        console.log(commentedit)
    }

 

    const handleSubmitCommentEdit = (event, id_comment) => {


        const requestInit = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentedit),
        };
        fetch(`http://localhost:5000/editComment/${(id_comment)}`, requestInit)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error));
    };

    const handleDeleteComment = (id_comment) => {
        fetch(`http://localhost:5000/deleteComment/${id_comment}`, {
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

    const [likedPosts, setLikedPosts] = useState({});

    const handleSubmitReaction = (event, id_post) => {
        const reactiongetdata = { id_post, id_user };
        
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reactiongetdata)
        }

        fetch('http://localhost:5000/postReaction', requestInit)
        .then ((res) => res.json())
        .then ((res) => {

            
            if (res.exists) {
                const updateData = { id_post, id_user };

                const updateRequestInit = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updateData)
                }
    
                fetch('http://localhost:5000/updateReaction', updateRequestInit)
                    .then((updateRes) => updateRes.json())
                    .then((updateRes) => {
                        console.log(updateRes);
                    if (updateRes === 1) {
                        setLikedPosts(prevState => ({ ...prevState, [id_post]: true }));
                        localStorage.setItem(`liked_${id_post}`, 'true');
                    }else if (updateRes === 0){
                        setLikedPosts(prevState => ({ ...prevState, [id_post]: false }));
                        localStorage.setItem(`liked_${id_post}`, 'false'); 
                    }
                    })
                    .catch((updateErr) => {
                        console.error(updateErr);
                    });
            } else {
                setLikedPosts(prevState => ({ ...prevState, [id_post]: true }));
                localStorage.setItem(`liked_${id_post}`, 'true');
            }
        })
        .catch(err => { 
            console.error(err)
        })

       

    }


    const [isEditing, setIsEditing] = useState(false);

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
                            
                        <h2 className="card-subtitle mb-2 text-muted customcard">{post.user?.name}</h2>
                        <h6 className="card-subtitle mb-2 text-muted">{post.formattedDate}</h6>
                        
                        { post.id_user === userdata.data.user.id && (
                        <Dropdown className='custom-dropdown'>
                            <Dropdown.Toggle className='custom-toggle' variant="secondary"  id="dropdown-button-drop-end">
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className='custom-item'><Link to={`./publish/edit/${post.id_post}`} style={{ textDecoration: 'none', color: 'white' }}>Edit</Link></Dropdown.Item>
                                <Dropdown.Item className='custom-item' onClick={() => handleDelete(post.id_post)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        )}     
                        </div>
                        <div className="card-body">
                            <br />
                            <h2 className="card-title">{post.tittle}</h2>
                            <p className="card-text">{post.text}</p>
                            {post.image_data && (
                                <img
                                    src={URL.createObjectURL(new Blob([new Uint8Array(post.image_data.data)]))}
                                    alt="Postimage"
                                    className="card-img"
                                />
                            )}
                             {userdata.data.user.id && (
                                <button type="submit"   className={`like-icon ${likedPosts[post.id_post] ? 'liked' : ''}`}
                                onClick={(event) => handleSubmitReaction(event, post.id_post)}> <AiFillLike/> </button>
                             )}
                            <br/>
                            <h4> Comments </h4>
                            <hr/>
                            {commentData.map((comment) => {
                                if (comment.id_post === post.id_post) {
                                    return (
                                    <div className="comment-outside">
                                        <div className="comment-side" key={comment.id}>
                                            <div className="comment-name">
                                                <h5>{comment.user?.name}</h5>
                                                <h5>{comment.formattedDate}</h5>
                                            </div>
                                            <p>{comment.comment}</p>
                                        </div>
                                        {comment.id_user === userdata.data.user.id && (
                                            <div>
                                                <div className="comment-edit">
                                                    <button type="submit"
                                                    onClick={() => setIsEditing(!isEditing)}>Edit</button>
                                                    <button type="submit"
                                                    onClick={() => handleDeleteComment(comment.id_comment)}>Delete</button>
                                                </div>
                                                {isEditing && (
                                                    <form  onSubmit={(event) => handleSubmitCommentEdit(event, comment.id_comment)}>
                                                        <div className="div-comment-edit">
                                                            <input
                                                            className="form-control custom-comment-edit"
                                                            placeholder="Edit text..." name="_comment" onChange={ handleTextCommentEdit }
                                                            />
                                                            <button type="submit" className="custom-icon-comment" ><BsFillSendFill/></button>   
                                                        </div>
                                                    </form>
                                                )}
                                            <hr/>
                                            </div>
                                        )}
                                    </div>   
                                    );
                                } else {
                                  return null;
                                }
                               
                            })}
                             
                            {userdata.data.user.id && (
                                <form onSubmit={(event) => handleSubmitComment(event, post.id_post)}>
                                    <div className="div-comment">
                                        <input
                                        className="form-control custom-comment"
                                        placeholder="Type..." name="comment" onChange={ handleTextComment }
                                        />
                                        <button type="submit" className="custom-icon-comment"><BsFillSendFill/></button>
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
                                onChange={handleImageChange} id='fileinput'/>
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