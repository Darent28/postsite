import HeaderPs from './Components/header';
import Home from './Components/home';
import LogIn from './Components/login';
import SignIn from './Components/signin';
import Edit from './Components/publish-edit';
import Footer from './Components/footer';
import Edituser from './Components/edituser';
import Userprofile from './Components/userprofile';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [ user, setUser ] = useState({
     name: '',
     email: '',
     password: '',
     passwordConfirm: '' 
  });

  const [token, setToken] = useState('');
  const [userdata, setUserdata] = useState({data:{user:{
    email: '',
    id: '',
    name: '',
    password: ''
  }}});

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);

    useEffect(() => {

      const requestInit = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token },
        body: JSON.stringify()
      }
      fetch('http://localhost:5000/home', requestInit)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la solicitud');
        }
        return res.json();
      })
      .then((data) => { 
        setUserdata(data);
        console.log(data);

      })
    .catch((error) => {

      console.error(error);
    });
    localStorage.setItem('token', token);
    }, [token]);

    
  return (
    <div>
        <HeaderPs  userdata={userdata} setUserdata={setUserdata}  setToken={setToken}/>
          <Routes>
              <Route path='/' element={  <Home userdata={ userdata } />  } />
              <Route path='/log-in' element={ <LogIn user={user} setUser={setUser} setToken={setToken} />  } />
              <Route path='/sign-in' element={ <SignIn user={user} setUser={setUser}/>  }/> 
              <Route path='/edit-user' element={ <Edituser user={user} setUser={setUser}/>  }/> 
              <Route path='/user-profile' element={ <Userprofile user={user} setUser={setUser}/>  }/> 

              <Route path='/publish/edit/:id_post' element={ <Edit />  }/>         
          </Routes>
          <Footer/>
    </div>
  );
}

export default App;
