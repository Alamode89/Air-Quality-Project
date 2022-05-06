import React from 'react'
import "./Footer.css"
import logo from '../../favicon.png';

const Footer = () => {
    return (
        <div className='footer'>
            <p>Made by yours truly, Yahallo Inc.<img className="logo" src={logo} alt="logo" /></p>
        </div>
    )
}

export default Footer