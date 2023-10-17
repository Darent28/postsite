import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';
import './offcanvas.css'
import Offcanvas from 'react-bootstrap/Offcanvas';



export const HeaderPs = ({userdata, setUserdata, setToken}) => {
  const { name } = userdata.data.user;
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
              <form className="d-flex ">
                    {name ? (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                {/* <p className="nav-link active">Welcome {name}</p> */}
                                <Link className="nav-link active" aria-current="page" to="./edit-user" >Welcome {name}</Link>
                             
                              </li>
                              <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" onClick={handleLogout} to="./">LogOut</Link>
                              </li>
                              <li className="nav-item">
                                    <Link variant="primary" onClick={handleShow} className="nav-link" aria-current="page">profile</Link>
                              </li>

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
              <OffcanvasComponent show={show} handleClose={handleClose} />
            </div>           
          </nav>
      );
      
};

const OffcanvasComponent = ({ show, handleClose, handleLogout}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' className="Offcanvas-backgorund">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" onClick={handleLogout} to="./">LogOut</Link>
      </li>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HeaderPs
