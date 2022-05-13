import React from 'react'
import './Navbar.css'
import navImage from '../../navBarImage.png';

const Navbar = () => {
  return (
    <div className="Navbar">
        <a href="/"><img className="navImage" src={navImage} alt="navImage" /></a>
      <div className="tabs">
        <a href='/' class="nav">Home</a>
        <a href='/graph' class="nav">Graph</a>
      </div>
    </div>
  )
}

export default Navbar