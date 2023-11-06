import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';
import './offcanvas.css'
import Offcanvas from 'react-bootstrap/Offcanvas';



export const HeaderPs = ({userdata, setUserdata, setToken}) => {
  const { id, name, imgPhoto } = userdata.data.user;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    setUserdata({ data: { user: { 
      email: '', 
      id: '', 
      name: '', 
      password: '' }}});
      setToken('');
      localStorage.removeItem('token');
  };

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

        return (
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link aria-current="page" to="./" className="nav-link active custom-ps">Ps</Link>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="./">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link"  to="#">Link</Link>
                </li>
              </ul>
              <form className="d-flex">
                    {name ? (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <div className="foto-div"> 
                            <img
                                src={URL.createObjectURL(new Blob([new Uint8Array(formProfileData.imgPhoto.data)]))}
                                alt="User Profile"
                                onClick={handleShow} 
                                className="foto-nav"
                              />

                            </div>
                        </ul>
                        
                      ) : (  
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" aria-current="page" to="./sign-in" >SingIn</Link>
                        </li>
                        <li className="nav-item">
                                
                                  </li>
                         <li className="nav-item container-fluid">    
                          <Link className="nav-link" aria-current="page" to="./log-in">LogIn</Link>
                        </li> 
                      </ul>
                      )}          
              </form>
              <OffcanvasComponent show={show} handleClose={handleClose} handleLogout={handleLogout} name={name} id={id}/>    
            </div>       
          </nav>
      );
      
};

const OffcanvasComponent = ({ show, handleClose, handleLogout, name, id}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' className="Offcanvas-backgorund">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Welcome {name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        <Link className="nav-link" aria-current="page" to={`./user-profile/${id}`}>Profile</Link>
        <Link className="nav-link" aria-current="page" onClick={() =>{ 
            handleLogout();
            handleClose();}} to="./">LogOut</Link> 
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HeaderPs
