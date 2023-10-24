import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './edituser.css';


export const Edituser = () =>{

    const handleClick = e => {
        //correct?
        // getUser({
        //   ...user,
        //   [e.target.name]: e.target.value
        // })

    }
    

    const navigate = useNavigate();

   
  function fotoi(){
    const fileInput = document.getElementById('fileInput');
    const chooseButton = document.getElementById('chooseButton');
    const foto = document.getElementById('foto');
    
    chooseButton.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                foto.src = e.target.result;
            };
            
            reader.readAsDataURL(selectedFile);
        }
    });
    
  }
                                                                //obtener datos
    // const [userData, setuserData] = useState([{}])

    // useEffect ( () => { 
    //   fetch('http://localhost:5000/edituser', {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'}
    //     }).then(
    //         response => response.json()
    //     ).then((data) => {
    //         if (Array.isArray(data)) {
    //             const formattedData = data.map((row) => {
    //                 const date = new Date(row._date);
    //                 const formattedDate = date.toLocaleString("es-ES", {
    //                   dateStyle: "short",
    //                   timeStyle: "short"
    //                 });
    //                 return {
    //                   ...row,
    //                   formattedDate
    //                 };
                   
    //             });

    //             const initialusered = {};

    //             formattedData.forEach((row) => {
    //                 const isuser = localStorage.getItem(`user_${row.id}`);
    //                 if (isuser === 'true') {
    //                     initialusered[row.id] = true;
    //                 } else {
    //                     initialusered[row.id] = false;
    //                 }
    //             });
        
    //             setusered(initialusered);
    //             setpostData(formattedData);
    //         } else {
    //           console.log('Invalid data format:', data);
    //         }

           
    //     })
    //     .catch((error) => {
    //       console.error('Fetch error:', error);
    //     });
          
      
    // }, []) 

    

    return(
        <div className='top'>
                 
            <h1 align="center" class="titulo">Edit User</h1>
            <p align="center">This Is Edit User site</p>
            <form align="center" className= "signin">

               
            
                <div className="form-group">
                        Image 
                        <div class="box" >
                        <img src="perro.jpg" id="foto" class="fotow"></img>
                        <br></br><br></br>
                        <input  type="file" id="fileInput" className=" btnp btn btn-dark btnfoto"/>
                        <button onClick={fotoi} class="button button2" id="chooseButton">choose photo</button>
                        </div>
                </div>  
                <br></br><br></br>
                
               
                <br></br>

                
                <br></br><br></br>
                <div className="form-group">
                        Username:
                        <input //value={name} 
                        type="text"
                        minlength="3"
                        maxlength="20"
                        className="form-control custom-input"
                        name="name"

                        required/>
                </div>
                <div className="form-group ">
                        Email:
                        
                        <input //value={email} 
                        type="email"
                        className="form-control custom-input"
                        name="email"
                        pattern="(\W|^)[\w.\-]{0,25}@(outlook|yahoo|hotmail|gmail)\.com(\W|$)"
   
                        required/>
                </div>
                <div className="form-group ">
                        Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password"
                        minlength="1"
                        maxlength="20"

                        required/>
                </div>
                <div className="form-group ">
                        Confirm Password:
                        <input
                        type="password"
                        className="form-control custom-input"
                        name="password_confirm"
                        minlength="1"
                        maxlength="20"

                        required/>
                </div>
                <button type="submit" className="btn btn-secondary form-control" value="Submit">Sign in</button>
            </form>
        </div>
    )

}



export default Edituser