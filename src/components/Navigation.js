import React from "react";
import { NavLink } from 'react-router-dom'; 
import Image from 'react-bootstrap/Image';
import '../index.css';
import logo from './recepista.png';

const Navigation = () => {
  return (
    <div className="nav-bar">
    <div className="nav-logo">
      <Image src={logo} fluid />
    </div>
      <div className="nav-links">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      </div>
    </div>
  );
};

export default Navigation;