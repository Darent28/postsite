import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';


export const HeaderPs = ({userdata, setUserdata, setToken}) => {
  const { name } = userdata.data.user;

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
                                <p className="nav-link active">Welcome {name}</p>
                              </li>
                              <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" onClick={handleLogout} to="./">LogOut</Link>
                              </li>
                        </ul>
                      ) : (  
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" aria-current="page" to="./sign-in" >SingIn</Link>
                        </li>
                        <li className="nav-item container-fluid">
                          <Link className="nav-link" aria-current="page" to="./log-in">LogIn</Link>
                        </li>
                      </ul>
                      )}
                    
              </form>
            </div>
          </nav>
      )
}

export default HeaderPs
