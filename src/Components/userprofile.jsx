import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './userprofile.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BsFillSendFill } from 'react-icons/bs' 
import { AiFillLike } from 'react-icons/ai'


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
    const [isEditing, setIsEditing] = useState(false);  

    const [formabout, setFormabout] = useState
    ({  about: ""
    });
    const [about, setabout] = useState
    ({  about: ""
    });

    const handleChange = e => {
      setFormabout({
          ...formabout,
          [e.target.name]: e.target.value
      })
      console.log(formabout)
    };  

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
    //--------------------------------------------------------------



    const [postData, setpostData] = useState([{}])
    console.log(postData)
    useEffect ( () => { 
      fetch(`http://localhost:5000/getPostProfile/${(id)}`, {
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
    

    const [commentData, setcomentData] = useState([{
    }])

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

    const [likedPosts, setLikedPosts] = useState({});

    const handleSubmitabout = () => {
      const formeditabout = 
          {  
              about: formabout.about
          };

      const requestInit = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formeditabout),
      };
      fetch(`http://localhost:5000/edituserAbout/${id}`, requestInit)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error));
  };   
    
  useEffect ( () => { 
    fetch(`http://localhost:5000/getProfile/${(id)}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      }).then(
          response => response.json()
      ).then((data) => {
        console.log(data)
        
        setabout({
          about: data.about
        });
        
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    });
        
    
}, [id]) 


    return(
    <div className='profile'>
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
           <br/> <br/>
           
            <Tabs
              defaultActiveKey="timeline"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="timeline" title="Timeline" >
              {postData.map((post) => (
                    <div className="card" >
                        <div className="card-header">
                        <img
                                src={URL.createObjectURL(new Blob([new Uint8Array(post.user?.imgPhoto.data)]))}
                                alt="User Profile"
                                className="foto-nav"
                              />   
                        <h2 className="card-subtitle mb-2 text-muted customcard">{post.user?.name}</h2>
                        <h6 className="card-subtitle mb-2 text-muted">{post.formattedDate}</h6>
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
                                    </div>   
                                    );
                                } else {
                                  return null;
                                }
                               
                            })}
                            
                        </div>
                        
                    </div>
                ))}
              </Tab>
              <Tab eventKey="About" title="About" >
                <br/>
                <h1>{about.about}</h1>
              {isEditing && (
                                                    <form  onSubmit={() => handleSubmitabout(id)}>
                                                        <div className="div-comment-edit">
                                                            <input
                                                            className="form-control custom-comment-edit"
                                                            placeholder="Edit text..." name="about"
                                                            onChange={handleChange}
                                                            />
                                                            <button type="submit" className="custom-icon-comment" ><BsFillSendFill/></button>   
                                                        </div>
                                                    </form>
               )}
               <bottom type="submit" className="btn btn-secondary"  onClick={() => setIsEditing(!isEditing)}>Edit</bottom>
              </Tab>
              <Tab eventKey="Photos" title="Photos" >
              <br/>
              <div className="instagram-container" >
              {postData.map((post, index) => (
                    <div key={index} className="photo-container" >
                            {post.image_data && (
                                <img
                                    src={URL.createObjectURL(new Blob([new Uint8Array(post.image_data.data)]))}
                                    alt={`Post ${index + 1}`}
                                    className="img-profile"
                                />
                            )}                      
                    </div>
                ))}
              </div>
              </Tab>
            </Tabs>   

        {/* <p className="d-inline-flex gap-1">
        <button className="button5 button5 me-md-5">Timeline</button>
        <button className="button5 button5 me-md-5">About</button>
       
        <button className="button5 button5 me-md-5">Photos</button>

       
      
        </p>


        </div>
        <div className="linea"></div>
        <br></br>  */}

      </div>        

    </div>
        
)

}



export default Userprofile