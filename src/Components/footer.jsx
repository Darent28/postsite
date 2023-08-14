import React from "react";
import './footer.css';
import { RiInstagramFill } from 'react-icons/ri'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { AiFillMail } from 'react-icons/ai'
import { Link } from "react-router-dom";

export const Footer = () => {

    return(
        <div className="custom-footer">
            <div className="custom-allicons">
                <Link to="https://www.instagram.com/web_minds_oficial/" className="custom-icon"><RiInstagramFill /></Link> 
                <Link to="https://www.linkedin.com/in/david-elizondo-574728260/" className="custom-icon"><BsLinkedin /></Link> 
                <Link to="https://github.com/Darent28" className="custom-icon"><BsGithub /></Link> 
                <Link className="custom-text"> <AiFillMail/> davidantonioelizondoramos@gmail.com</Link>
            </div>
        </div>
    );

}

export default Footer