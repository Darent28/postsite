import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './userprofile.css';





export const Userprofile = ({userdata}) =>{
    const { name } = userdata.data.user;

    const handleClick = e => {
        

    }
    

    

    const navigate = useNavigate();

  
    

    return(
    <div>
        <div class='fotoportada'>
            <img src="fondo.jpg" id="foto" class="fotopor"></img>
            <button class="button3 button3" id="chooseButton1">Update photo</button>

            <div class='cambiarpor'>  {/* aqui la foto de perfil */}
            <img src="perro.jpg" id="foto" class="fotow"></img>
            <button class="button button2" id="chooseButton">Edit</button>
            
            </div>
            
            <h2 class="letra1" > {name} </h2>
            <Link to="./edit-user" class="button4" id="edituser">Edit User</Link>
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
            
        </div> 
    </div>
        
    )

}



export default Userprofile