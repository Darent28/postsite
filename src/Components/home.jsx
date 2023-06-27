import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css'
import './home.css'
import './modal.css'
import { Link } from 'react-router-dom';

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
    }


    let {tittle, text, id_user} = post

    id_user = userdata.data.user.id

    const handleSubmit = (event) => {
        event.preventDefault();
        //data validation
        if ( tittle === '' || text === '' || id_user === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        const fullpost = {
            tittle,
            text,
            id_user 
        }
    
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fullpost),
        }

        fetch('http://localhost:5000/post', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
            window.location.reload(); 
        })

        setPost({
            tittle: '',
            text: ''
        })
    
        console.log(fullpost)
        setIsOpen(false);
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
                        
                        </div>
                        <div className="card-body">
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
                            <br />
                            <h5 className="card-title">{rows.tittle}</h5>
                            <p className="card-text">{rows._text}</p>
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