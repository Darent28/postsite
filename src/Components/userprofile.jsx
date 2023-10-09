import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './userprofile.css';





export const Userprofile = ({ user, getUser }) =>{

    const handleClick = e => {
        

    }
    

    

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
       
       
        const requestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        }
                         //?????

         fetch('http://localhost:5000/Userprofile', requestInit)
         .then ((res) => res.json())
         .then ((res) => {
             console.log(res)
        })

      


        navigate('/log-in');
    }
  
    

    return(
        <><div class='fotoportada'>
            <img src="fondo.jpg" id="foto" class="fotopor"></img>
            <button class="button3 button3" id="chooseButton1">Update photo</button>

            <div class='cambiarpor'>  {/* aqui la foto de perfil */}
            <img src="perro.jpg" id="foto" class="fotow"></img>
            <button class="button button2" id="chooseButton">Edit</button>
            
            </div>
            
            <h2 class="letra1" >Anna Perez </h2>
            <button class="button4 button4" id="edituser">Edit User</button>
           <br></br>
            <p class="d-inline-flex gap-1">
            
      
        <button class="button5 button5 me-md-5">Timeline</button>
        <button class="button5 button5 me-md-5">About</button>
       
        <button class="button5 button5 me-md-5">Photos</button>
        <button class="button5 button5 me-md-5">Friends</button>
       
      
        </p>


        </div>
        <div class="linea"></div>
        <br></br> 
         <div class="debajo">
       {/*      <div class="list-group">
         <div class="d-flex position-relative ">
           
  <img src="logo512.png" class="flex-shrink-0 me-3" height="80px" width="80px"></img>
  
  <div>
    <h5 class="mt-0">Friend 1</h5>
     <a href="#" class="stretched-link"></a>
  </div>
</div>


      
</div> */}
            
        </div> </>

        
    )

}



export default Userprofile